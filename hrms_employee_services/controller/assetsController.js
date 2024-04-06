const assetsModel = require("../models/assetsModel");

exports.createAsset = async (req, res) => {
  const { assetName, assetValue } = req.body;
  try {
    const result = await assetsModel.createAsset(assetName, assetValue);
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
  const { id } = req.params;
  try {
    const result = await assetsModel.getAssetsById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update Assets
exports.updateAssets = async (req, res) => {
  const { id } = req.params;
  const { assetName, assetValue } = req.body;
  try {
    const result = await assetsModel.updateAssets(id, assetName, assetValue);
    res.status(200).json(result);
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
