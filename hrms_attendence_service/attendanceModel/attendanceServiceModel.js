const {
  promisePool,
} = require("../../hrms_employee_services/config/DBConnection");

const createAttendance = (employee_id, status, date, time_in, time_out) => {
  return new Promise((resolve, reject) => {
    // First, check if there's already an entry for the given employee and date
    const checkQuery =
      "SELECT * FROM attendance_record WHERE employee_id = ? AND date = ?";
    const checkValues = [employee_id, date];

    promisePool.query(checkQuery, checkValues, (err, results) => {
      if (err) {
        return reject(new Error("Error checking existing attendance"));
      }

      if (results.length > 0) {
        return reject(new Error("Attendance already marked for this date."));
      } else {
        const insertQuery =
          "INSERT INTO attendance_record (employee_id, status, date, time_in, time_out) VALUES (?, ?, ?, ?, ?)";
        const insertValues = [employee_id, status, date, time_in, time_out];

        promisePool.query(insertQuery, insertValues, (err, result) => {
          if (err) {
            reject(new Error("Error inserting attendance record"));
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};
// get all attendance
const getAllEmployeeAttendance = () => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT a.employee_id, a.department_id, a.position_id,ad.date, u.name AS userName, u.email, e.father_name, d.name AS departmentName, p.title, ad.status
        FROM hrms_employeeservices.employment_details AS a
        JOIN hrms_employeeservices.employee_details AS e ON a.employee_id = e.employee_id
        JOIN hrms_userservices.user_profiles AS u ON u.user_id = e.user_id
        JOIN hrms_departmentservices.department_detail AS d ON a.department_id = d.department_id
        JOIN hrms_postionservices.position_details AS p ON a.position_id = p.position_id
        JOIN attendance_record AS ad ON a.employee_id = ad.employee_id`;
    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getAllAttendance = () => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT a.employee_id, a.department_id, a.position_id, u.name AS userName, u.email, e.father_name, d.name AS departmentName, p.title
        FROM hrms_employeeservices.employment_details AS a
        JOIN hrms_employeeservices.employee_details AS e ON a.employee_id = e.employee_id
        JOIN hrms_userservices.user_profiles AS u ON u.user_id = e.user_id
        JOIN hrms_departmentservices.department_detail AS d ON a.department_id = d.department_id
        JOIN hrms_postionservices.position_details AS p ON a.position_id = p.position_id`;

    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get ALL Atte

module.exports = {
  createAttendance,
  getAllEmployeeAttendance,
  getAllAttendance,
};
