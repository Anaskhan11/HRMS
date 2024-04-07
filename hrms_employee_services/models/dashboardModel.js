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

module.exports = {
  getDashboardData,
};
