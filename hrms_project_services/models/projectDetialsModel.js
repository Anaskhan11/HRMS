const db = require("../config/DBConnection");

// create project

const createProjectAndAssignEmployees = (
  project_name,
  project_description,
  start_date,
  end_date,
  status,
  manager_id,
  employee_ids, // This is now an array of employee IDs
  role
) => {
  return new Promise((resolve, reject) => {
    // Start Transaction
    db.beginTransaction((err) => {
      if (err) reject(err);

      // Insert Project
      const queryProject = `INSERT INTO project_details (project_name, project_description, start_date, end_date, status, manager_id) VALUES (?, ?, ?, ?, ?, ?)`;
      const valuesProject = [
        project_name,
        project_description,
        start_date,
        end_date,
        status,
        manager_id,
      ];

      db.query(queryProject, valuesProject, (err, projectResult) => {
        if (err) {
          return db.rollback(() => {
            reject(err);
          });
        }

        const projectId = projectResult.insertId;

        // Function to handle assignment insertion
        const assignProjectToEmployee = (index) => {
          if (index >= employee_ids.length) {
            // If all employees have been assigned, commit transaction
            return db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  reject(err);
                });
              }
              resolve("Project Created and All Assignments Successful");
            });
          }

          const employee_id = employee_ids[index];
          const queryAssignment = `INSERT INTO project_assignment (project_id, employee_id, role) VALUES (?, ?, ?)`;
          const valuesAssignment = [projectId, employee_id, role];

          db.query(queryAssignment, valuesAssignment, (err, result) => {
            if (err) {
              return db.rollback(() => {
                reject(err);
              });
            }
            // Proceed to next employee
            assignProjectToEmployee(index + 1);
          });
        };

        // Start the assignment process
        assignProjectToEmployee(0);
      });
    });
  });
};

const getProjects = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM project_details`;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// search employee
const searchEmployee = (name) => {
  return new Promise((resolve, reject) => {
    const query = `Select * from hrms_userservices.user_profiles WHERE name LIKE = '%${name}%'  `;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getProjectById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
        p.*, 
        u.name AS manager_name, 
        u.email AS manager_email, 
        pa.assignment_id,
        pa.role,
        ue.name AS employee_name, 
        ue.image,
        ue.email AS employee_email
    FROM 
        project_details AS p 
    JOIN 
        hrms_employeeservices.employee_details AS e ON p.manager_id = e.employee_id 
    JOIN 
        hrms_userservices.user_profiles AS u ON e.user_id = u.user_id 
    JOIN 
        hrms_projectservices.project_assignment AS pa ON p.project_id = pa.project_id 
    JOIN 
        hrms_employeeservices.employee_details AS ee ON pa.employee_id = ee.employee_id 
    JOIN 
        hrms_userservices.user_profiles AS ue ON ee.user_id = ue.user_id 
    WHERE 
        p.project_id = ${id};
    `;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// search employee by name department and position
const searchByName = (name, department, position) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT u.email, u.name, d.name AS department_name, p.title, e.employee_id
      FROM hrms_employeeservices.employee_details AS e
      JOIN hrms_userservices.user_profiles AS u ON e.user_id = u.user_id
      JOIN hrms_employeeservices.employment_details AS emp ON e.employee_id = emp.employee_id
      JOIN hrms_departmentservices.department_detail AS d ON emp.department_id = d.department_id
      JOIN hrms_postionservices.position_details AS p ON emp.position_id = p.position_id
      WHERE u.name LIKE '%${name}%' AND d.name LIKE '%${department}%' AND p.title LIKE '%${position}%';
    `;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getProjectsByManagerId = (manager_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT project_name, project_id FROM project_details WHERE manager_id = ?`;
    db.query(query, [manager_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createProjectAndAssignEmployees,
  getProjects,
  searchEmployee,
  getProjectById,
  searchByName,
  getProjectsByManagerId,
};
