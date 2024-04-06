const positionSericesModel = require("../models/positionServicesModel");

exports.createPosition = async (req, res) => {
  const { title, responsibilities } = req.body;
  try {
    const result = await positionSericesModel.createPosition(
      title,
      responsibilities
    );

    res.status(201).json({
      message: "Position created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating position",
      error,
    });
  }
};

exports.getAllPosition = async (req, res) => {
  try {
    const result = await positionSericesModel.getAllPositions();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Error while getting position" });
  }
};

exports.getPositionById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await positionSericesModel.getPositionById(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "Error while getting position" });
  }
};

exports.updatePosition = async (req, res) => {
  const id = req.params.id;
  const { title, responsibilities } = req.body;
  try {
    const result = await positionSericesModel.updatePosition(
      id,
      title,
      responsibilities
    );
    res.status(200).json({ message: "Position updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error while updating position" });
  }
};

exports.deletePosition = async (req, res) => {
  const { id } = req.params;
  try {
    await positionSericesModel.deletePosition(id);
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting position" });
  }
};
