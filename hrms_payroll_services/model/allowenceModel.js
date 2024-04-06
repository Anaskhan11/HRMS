const db = require("../config/DBConnection");

// create salary model
const createallowence = (employee_id, allowance_type, amount) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO allowances_details (employee_id,allowance_type,amount ) VALUES (?,?,?)";
    const values = [employee_id, allowance_type, amount];
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
const getallawonce = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM allowances_details ";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { createallowence, getallawonce };
