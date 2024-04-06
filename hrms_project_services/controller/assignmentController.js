const assignmentModel = require("../models/assignmentModel");

exports.createAssignment = async (req, res) => {
  const { project_id, employee_id, role } = req.body;
  console.log(project_id, employee_id, role, "data");
  try {
    const result = await assignmentModel.createAssignment(
      project_id,
      employee_id,
      role
    );

    res
      .status(200)
      .json({ message: "Assignment created successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.searchEmployeesInAssignment = async (req, res) => {
  const { project_id, searchTerm } = req.params;
  console.log(project_id, searchTerm, "controller modellll");
  try {
    const result = await assignmentModel.searchEmployeesInAssignment(
      project_id,
      searchTerm
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
