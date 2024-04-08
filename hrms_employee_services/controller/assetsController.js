const assetsModel = require("../models/assetsModel");

exports.createAsset = async (req, res) => {
  const data = req.body;
  console.log("data asset", data);

  try {
    const result = await Promise.all(
      data.map((asset) =>
        assetsModel.createAsset(asset.asset, asset.employee_id)
      )
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAssets = async (req, res) => {
  try {
    const result = await assetsModel.getAllAssets();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssetsById = async (req, res) => {
  const { employee_id } = req.params;
  try {
    const result = await assetsModel.getAssetsByEmployeeId(employee_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update Assets
exports.updateAssets = async (req, res) => {
  const data = req.body;
  try {
    const result = await Promise.all(
      data.map((asset) =>
        assetsModel.updateAssets(asset.asset, asset.employee_id)
      )
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAssets = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await assetsModel.deleteAssets(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
