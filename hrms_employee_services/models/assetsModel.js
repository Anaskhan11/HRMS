const { promisePool } = require("../config/DBConnection");

// create Assetes Model
const createAsset = async (asset_id, employee_id) => {
  return new Promise((resolve, reject) => {
    // First, check if the asset already exists for the employee
    const checkQuery =
      "SELECT * FROM assets_details WHERE asset_id = ? AND employee_id = ?";
    promisePool.query(checkQuery, [asset_id, employee_id], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length > 0) {
        // If the asset already exists for the employee, reject the promise
        reject(
          new Error("The asset has already been assigned to this employee.")
        );
      } else {
        // If the asset does not exist for the employee, insert it
        const insertQuery =
          "INSERT INTO assets_details (asset_id, employee_id) VALUES (?, ?)";
        promisePool.query(
          insertQuery,
          [asset_id, employee_id],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });
};

// get all assets
const getAllAssets = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM asset_information";
    promisePool.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get Assets by id
const getAssetsByEmployeeId = async (employee_id) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT ai.asset_name, ai.asset_value ,ad.employee_id FROM asset_information as ai JOIN assets_details as ad ON ai.asset_id = ad.asset_id WHERE employee_id = ?";
    promisePool.query(query, employee_id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// update Assets
const updateAssets = async (id, assetName, assetValue) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE assets_details SET asset_name = ?, asset_type = ? WHERE asset_id = ?";
    const assetValues = [assetName, assetValue, id];

    promisePool.query(query, assetValues, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// delete Assets
const deleteAssets = async (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM assets_details WHERE asset_id = ?";
    promisePool.query(query, id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  createAsset,
  getAllAssets,
  deleteAssets,
  getAssetsByEmployeeId,
  updateAssets,
};
