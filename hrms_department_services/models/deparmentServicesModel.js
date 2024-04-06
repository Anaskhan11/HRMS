const db = require("../config/DBConnection");

// create department service model
const createDepartmentService = (name, description) => {
  const query1 =
    "INSERT INTO department_detail (name, description) VALUES (?, ?)";
  const values1 = [name, description];
  db.query(query1, values1, (err, result) => {
    if (err) {
      return err;
    } else {
      return result;
    }
  });
};

// get all department service model
const getAllDepartmentService = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM department_detail";
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get department by id model
const getDepartmentByIdService = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM department_detail WHERE department_id = ?";
    const values = [id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// update department service model
const updateDepartmentService = (id, name, description) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE department_detail SET name = ?, description = ? WHERE department_id = ?";
    const values = [name, description, id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const updatedData = {
          id: id,
          name: name,
          description: description,
        };
        resolve(updatedData);
      }
    });
  });
};

// delete department service model
const deleteDepartmentService = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM department_detail WHERE department_id = ?";
    const values = [id];
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve("Department service deleted successfully");
      }
    });
  });
};

module.exports = {
  createDepartmentService,
  getAllDepartmentService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,
};
