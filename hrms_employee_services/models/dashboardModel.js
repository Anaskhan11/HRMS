const { promisePool } = require("../config/DBConnection");

// i want to get the total number of employees and admin in employee table and deparment and projects in one query
const getDashboardData = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 
            (SELECT COUNT(*) FROM hrms_employeeservices.employee_details) as totalEmployees,
            (SELECT COUNT(*) FROM hrms_userservices.user_profiles WHERE role='admin') as totalAdmins,
            (SELECT COUNT(*) FROM hrms_departmentservices.department_detail) as totalDepartments,
            (SELECT COUNT(*) FROM hrms_projectservices.project_details) as totalProjects`;
    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

const getEmployeeDashboardData = async (employee_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        p.title, 
        d.name, 
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('project_name', IFNULL(pd.project_name, 'NULL'), 'project_id', IFNULL(pd.project_id, 0), 'employee_id', emp.employee_id)), ']') AS projects,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('leave_id', l.leave_id, 'start_date',  l.start_date, 'end_date', l.end_date, 'leave_type', l.leave_type, 'status',l.status)), ']') AS leave_requests,
        CONCAT('[', GROUP_CONCAT(JSON_OBJECT('task_id', pt.task_id, 'task_title', pt.task_title, 'task_description', pt.task_description, 'start_date', pt.start_date, 'end_date', pt.end_date, 'status', pt.status)), ']') AS project_tasks
      FROM 
        hrms_employeeservices.employment_details AS emp 
        JOIN hrms_departmentservices.department_detail AS d ON d.department_id = emp.department_id AND emp.employee_id = ${employee_id} 
        JOIN hrms_postionservices.position_details AS p ON p.position_id = emp.position_id AND emp.employee_id = ${employee_id} 
        LEFT JOIN hrms_projectservices.project_assignment AS pa ON pa.employee_id = emp.employee_id 
        LEFT JOIN hrms_projectservices.project_details AS pd ON pa.project_id = pd.project_id
        LEFT JOIN hrms_leavemanagementservices.leave_request AS l ON l.employee_id = emp.employee_id
        LEFT JOIN hrms_projectservices.project_task AS pt ON pt.employee_id = emp.employee_id AND pt.project_id = pd.project_id
      WHERE
        emp.employee_id = ${employee_id}
      GROUP BY
        emp.employee_id, p.title, d.name;`;

    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // Parse projects array
        result.forEach((row) => {
          row.projects = JSON.parse(row.projects);
          // Parse leave_requests array
          row.leave_requests = JSON.parse(row.leave_requests);
          // Parse project_tasks array
          row.project_tasks = JSON.parse(row.project_tasks);
        });
        resolve(result[0]);
      }
    });
  });
};

const getAllAges = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT age FROM hrms_employeeservices.employee_details`;
    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getDashboardData,
  getEmployeeDashboardData,
  getAllAges,
};
