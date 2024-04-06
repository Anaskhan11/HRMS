const db = require("../config/DBConnection");

// create salary model
const createpayroll = (
  employee_id,
  salary_id,
  pay_period_start,
  pay_period_end,
  total_allowances,
  total_deductions,
  net_pay
) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO payroll_details (employee_id,salary_id,pay_period_start ,pay_period_end ,total_allowances ,total_deductions ,net_pay) VALUES (?, ?,?,?,?,?,?)";
    const values = [
      employee_id,
      salary_id,
      pay_period_start,
      pay_period_end,
      total_allowances,
      total_deductions,
      net_pay,
    ];
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
const getPayroll = () => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT u.name AS user_name, e.employee_id, u.email, d.name AS department, p.title, pay.* FROM hrms_userservices.user_profiles AS u JOIN hrms_employeeservices.employee_details as e ON e.user_id = u.user_id JOIN hrms_employeeservices.employment_details AS em ON em.employee_id = e.employee_id JOIN hrms_departmentservices.department_detail AS d on d.department_id = em.department_id JOIN hrms_postionservices.position_details AS p ON p.position_id = em.position_id JOIN hrms_payrollservices.payroll_details AS pay ON pay.employee_id = e.employee_id;";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { createpayroll, getPayroll };
