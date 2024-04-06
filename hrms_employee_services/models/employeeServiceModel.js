const { promisePool } = require("../config/DBConnection");

const createEmployee = (
  fatherName,
  gender,
  address,
  date_of_birth,
  religion,
  phoneNumber,
  emergencyContact,

  user_id
) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO employee_details (father_name, gender, address, date_of_birth,religion, phone_number, emergency_contact,user_id) VALUES ( ?, ?,?, ?, ?, ? , ?,?)";
    const employeeValues = [
      fatherName,
      gender,
      address,
      date_of_birth,
      religion,
      phoneNumber,
      emergencyContact,
      user_id,
    ];

    promisePool.query(query, employeeValues, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get all employees
const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT ed.*, up.name, up.email, up.role FROM hrms_employeeservices.employee_details AS ed JOIN hrms_userservices.user_profiles AS up ON ed.user_id = up.user_id";
    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get employee department and position details

const getEmployeeDepartmentAndPosition = (employee_id) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT ed.*, up.name, up.email, up.role, d.department_id,d.name AS department_name , p.position_id,p.title FROM hrms_employeeservices.employee_details AS ed JOIN hrms_employeeservices.employment_details AS emp ON ed.employee_id = emp.employee_id JOIN hrms_userservices.user_profiles AS up ON ed.user_id = up.user_id JOIN hrms_departmentservices.department_detail as d ON emp.department_id = d.department_id JOIN hrms_postionservices.position_details as p ON emp.position_id = p.position_id; ";
    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const searchEmployee = async (name, department, position) => {
  // "SELECT ed.employee_id, up.name, up.email, up.image, d.name AS department_name, p.title AS position_title, s.* FROM hrms_userservices.user_profiles AS up JOIN hrms_employeeservices.employee_details AS ed ON up.user_id = ed.user_id JOIN hrms_employeeservices.employment_details AS emp ON ed.employee_id = emp.employee_id JOIN hrms_departmentservices.department_detail AS d ON emp.department_id = d.department_id JOIN hrms_postionservices.position_details AS p ON emp.position_id = p.position_id JOIN hrms_payrollservices.salaries_services AS s ON ed.employee_id = s.employee_id ";

  return new Promise((resolve, reject) => {
    let query =
      "SELECT ed.employee_id, up.name, up.email, up.image, d.name AS department_name, p.title AS position_title FROM hrms_userservices.user_profiles AS up JOIN hrms_employeeservices.employee_details AS ed ON up.user_id = ed.user_id JOIN hrms_employeeservices.employment_details AS emp ON ed.employee_id = emp.employee_id JOIN hrms_departmentservices.department_detail AS d ON emp.department_id = d.department_id JOIN hrms_postionservices.position_details AS p ON emp.position_id = p.position_id ";
    const queryParams = [];

    if (name) {
      query += "WHERE up.name LIKE ?";
      queryParams.push(`%${name}%`);
    }

    if (department) {
      query += " WHERE d.name LIKE = ?";
      queryParams.push(`%${department}%`);
    }

    if (position) {
      query += " WHERE p.position_id LIKE = ?";
      queryParams.push(position);
    }

    promisePool.query(query, queryParams, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeDepartmentAndPosition,
  searchEmployee,
};
