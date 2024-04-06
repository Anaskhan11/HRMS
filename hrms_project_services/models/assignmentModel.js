const db = require("../config/DBConnection");

const createAssignment = (project_id, employee_id, role) => {
  console.log(project_id, employee_id, role, "data modellll");
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO project_assignment (project_id, employee_id, role) 
                   SELECT ?, ?, ? FROM DUAL 
                   WHERE NOT EXISTS (
                     SELECT * FROM project_assignment 
                     WHERE project_id = ? AND employee_id = ?
                   )`;
    const values = [project_id, employee_id, role, project_id, employee_id];

    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const searchEmployeesInAssignment = (project_id, searchTerm) => {
  console.log(project_id, searchTerm, "data modellll");
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
      pro.project_id, 
      pro.employee_id, 
      u.name, 
      u.email 
    FROM 
      project_assignment AS pro 
      JOIN hrms_employeeservices.employee_details AS e ON pro.employee_id = e.employee_id 
      JOIN hrms_userservices.user_profiles AS u ON e.user_id = u.user_id 
    WHERE 
      pro.project_id = ? AND u.name LIKE ?`;

    // Using '%' symbols around searchTerm to find matches that contain the searchTerm anywhere in the name field
    const values = [project_id, `%${searchTerm}%`];

    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { createAssignment, searchEmployeesInAssignment };
