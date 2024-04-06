const db = require("../config/DBConnection");

// create salary model
const createsalary = (employee_id, base_salary) => {
  return new Promise((resolve, reject) => {
    const checkQuery = "SELECT * FROM salaries_services WHERE employee_id = ?";
    const checkValues = [employee_id];
    db.query(checkQuery, checkValues, (checkErr, checkResult) => {
      if (checkErr) {
        reject(checkErr);
      } else {
        if (checkResult.length > 0) {
          reject("Salary record already exists for the employee.");
        } else {
          const insertQuery =
            "INSERT INTO salaries_services (employee_id, base_salary) VALUES (?, ?)";
          const insertValues = [employee_id, base_salary];
          db.query(insertQuery, insertValues, (insertErr, insertResult) => {
            if (insertErr) {
              reject(insertErr);
            } else {
              resolve(insertResult);
            }
          });
        }
      }
    });
  });
};

// get Salary
const getSalary = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM salaries_services ";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getSalaryById = (employee_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM salaries_services WHERE employee_id = ?";
    const values = [employee_id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { createsalary, getSalary, getSalaryById };
