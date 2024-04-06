const taskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const {
    project_id,
    task_title,
    task_description,
    employee_id,
    start_date,
    end_date,
    status,
  } = req.body;
  console.log(
    "Checking...... controller",
    project_id,
    task_title,
    task_description,
    employee_id,
    start_date,
    end_date,
    status
  );
  try {
    const result = await taskModel.createTask(
      project_id,
      task_title,
      task_description,
      employee_id,
      start_date,
      end_date,
      status
    );
    res.status(200).json({ message: "Task created successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProjectTasks = async (req, res) => {
  const { project_id } = req.params;
  try {
    const result = await taskModel.getProjectTasks(project_id);
    res.status(200).json({ message: "Tasks fetched successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { task_id } = req.params;
  const { status } = req.body;
  try {
    const result = await taskModel.updateTaskStatus(task_id, status);
    res
      .status(200)
      .json({ message: "Task status updated successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
