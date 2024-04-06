const projectDetialsModel = require("../models/projectDetialsModel");

exports.createProject = async (req, res) => {
  const {
    project_name,
    project_description,
    start_date,
    end_date,
    status = "active",
    manager_id,
    employee_ids,
    role,
  } = req.body;

  try {
    const result = await projectDetialsModel.createProjectAndAssignEmployees(
      project_name,
      project_description,
      start_date,
      end_date,
      status,
      manager_id,
      employee_ids,
      role
    );
    res.status(200).json({
      message: "Project Created Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Project Creation Failed",
      data: err,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const result = await projectDetialsModel.getProjects();
    res.status(200).json({
      message: "Project List",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.searchEmployee = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await projectDetialsModel.searchEmployee(name);
    res.status(200).json({
      message: "Employee List",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProjectsById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await projectDetialsModel.getProjectById(id);
    res.status(200).json({
      message: "Project List",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.searchName = async (req, res) => {
  const { name, department, position } = req.body;
  try {
    const result = await projectDetialsModel.searchByName(
      name,
      department,
      position
    );
    res.status(200).json({
      message: "Employee List",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProjectsByManagerId = async (req, res) => {
  const { manager_id } = req.params;
  try {
    const result = await projectDetialsModel.getProjectsByManagerId(manager_id);
    res.status(200).json({
      message: "Project List",
      data: result,
    });
  } catch (error) {}
};
