const { promisePool } = require("../config/DBConnection");

// i want to get the total number of employees and admin in employee table and deparment and projects in one query
const getDashboardData = async () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT 
            (SELECT COUNT(*) FROM employees) as totalEmployees,
            (SELECT COUNT(*) FROM employees WHERE role='admin') as totalAdmins,
            (SELECT COUNT(*) FROM departments) as totalDepartments,
            (SELECT COUNT(*) FROM projects) as totalProjects`;
    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getDashboardData,
};
