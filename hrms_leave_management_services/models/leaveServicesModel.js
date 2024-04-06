const db = require("../config/DBConnection");

const createLeave = (employee_id, start_date, end_date, leave_type, status) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO leave_request (employee_id, start_date, end_date,leave_type, status) VALUES (?,?,?,?,?)";
    const values = [employee_id, start_date, end_date, leave_type, status];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const getLeaves = () => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT l.leave_id ,u.name, u.email ,d.name AS department_name, p.title AS position_name , l.start_date, l.end_date, l.status, l.leave_type FROM hrms_userservices.user_profiles AS u JOIN hrms_employeeservices.employee_details AS e ON u.user_id = e.user_id JOIN hrms_employeeservices.employment_details AS emp ON e.employee_id = emp.employee_id JOIN hrms_departmentservices.department_detail AS d ON emp.department_id = d.department_id JOIN hrms_postionservices.position_details AS p ON emp.position_id = p.position_id JOIN hrms_leavemanagementservices.leave_request AS l ON e.employee_id = l.employee_id;";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const getLeavesByEmployeeId = (employee_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM leave_request WHERE employee_id = ?";
    const values = [employee_id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

const updateLeave = (id, status) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE leave_request SET status=? WHERE leave_id=?";
    const values = [status, id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  createLeave,
  getLeaves,
  updateLeave,
  getLeavesByEmployeeId,
};
