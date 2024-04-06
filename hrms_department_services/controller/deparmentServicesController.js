const departmentServicesModel = require("../models/deparmentServicesModel");

exports.createDepartmentService = (req, res) => {
  const { name, description } = req.body;
  try {
    const result = departmentServicesModel.createDepartmentService(
      name,
      description
    );
    res
      .status(200)
      .json({ message: "Department service created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all department service controller
exports.getAllDepartmentService = async (req, res) => {
  try {
    const result = await departmentServicesModel.getAllDepartmentService();

    res
      .status(200)
      .json({ message: "All department services", result: result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// get department by id controller
exports.getDepartmentByIdService = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await departmentServicesModel.getDepartmentByIdService(id);

    res.status(200).json({
      success: true,
      message: "Department service by id",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// update department service controller
exports.updateDepartmentService = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    const result = await departmentServicesModel.updateDepartmentService(
      id,
      name,
      description
    );

    res.status(200).json({
      success: true,
      message: "Department service updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete department service controller
exports.deleteDepartmentService = async (req, res) => {
  const { id } = req.params;

  try {
    await departmentServicesModel.deleteDepartmentService(id);

    res.status(200).json({
      success: true,
      message: "Department service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
