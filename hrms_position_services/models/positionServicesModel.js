const db = require("../config/DBConnection");

// create postion services model
const createPosition = (title, responsibilities) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO position_details (title,responsibilities) VALUES (?,?)";
    db.query(sql, [title, responsibilities], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const data = {
        title: title,
        responsibilities: responsibilities,
      };
      resolve(data);
    });
  });
};

const getAllPositions = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM position_details";
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getPositionById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM position_details WHERE position_id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updatePosition = (id, title, responsibilities) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE position_details SET title=?, responsibilities=? WHERE position_id = ?";
    db.query(sql, [title, responsibilities, id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const deletePosition = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM position_details WHERE position_id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  createPosition,
  getAllPositions,
  getPositionById,
  updatePosition,
  deletePosition,
};
