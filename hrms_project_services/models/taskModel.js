const db = require("../config/DBConnection");

const createTask = (
  project_id,
  task_title,
  task_description,
  employee_id,
  start_date,
  end_date,
  status
) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO project_task ( project_id,task_title,task_description,employee_id,start_date,end_date,status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const value = [
      project_id,
      task_title,
      task_description,
      employee_id,
      start_date,
      end_date,
      status,
    ];
    //   console.log("model values...", value);
    db.query(query, value, (err, result) => {
      if (err) {
        console.log("error Model", err);
        reject(err);
      } else {
        console.log("result Model", result);
        resolve(result);
      }
    });
  });
};

const getProjectTasks = (project_id) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT t.*, u.image , u.name , u.email FROM project_task AS t JOIN hrms_employeeservices.employee_details AS e ON t.employee_id = e.employee_id JOIN hrms_userservices.user_profiles AS u ON e.user_id = u.user_id WHERE t.project_id = ?;";
    const value = [project_id];
    db.query(query, value, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateTaskStatus = (task_id, status) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE project_task SET status = ? WHERE task_id = ?";
    const value = [status, task_id];
    db.query(query, value, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { createTask, getProjectTasks, updateTaskStatus };
