const { promisePool } = require("../config/DBConnection");

// create Assetes Model
const createAsset = async (assetName, assetValue) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO assets_details (asset_name, asset_type) VALUES (  ?, ?)";
    const assetValues = [assetName, assetValue];

    promisePool.query(query, assetValues, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// get all assets
const getAllAssets = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM assets_details";
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
const getAssetsById = async (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM assets_details WHERE asset_id = ?";
    promisePool.query(query, id, (err, result) => {
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
  getAssetsById,
  updateAssets,
};
