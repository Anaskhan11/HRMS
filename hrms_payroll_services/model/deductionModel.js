const db = require("../config/DBConnection");

// create salary model
const creatededuction = (employee_id, deduction_type, amount) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO deduction_details (employee_id,deduction_type,amount ) VALUES (?,?,?)";
    const values = [employee_id, deduction_type, amount];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get Salary
const getdeduction = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM deduction_details ";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { creatededuction, getdeduction };
