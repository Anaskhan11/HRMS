const db = require("../config/DBConnection");

const createEmployment = (employee_id, department_id, position_id) => {
  console.log("Employment Data:", employee_id, department_id, position_id);
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO employment_details (employee_id, department_id, position_id) VALUES ( ?, ?, ?)";
    const employeeValues = [employee_id, department_id, position_id];

    db.promisePool.query(query, employeeValues, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { createEmployment };
