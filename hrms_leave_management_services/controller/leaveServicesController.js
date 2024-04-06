const leaveServicesModel = require("../models/leaveServicesModel");

exports.createLeave = async (req, res) => {
  const { employee_id, start_date, end_date, leave_type } = req.body;
  try {
    const status = "isPending";
    const result = await leaveServicesModel.createLeave(
      employee_id,
      start_date,
      end_date,
      leave_type,
      status
    );
    res
      .status(200)
      .json({ success: true, message: "Leave Created Sucessfull", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const result = await leaveServicesModel.getLeaves();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeavesByEmployeeId = async (req, res) => {
  const { employee_id } = req.params;
  try {
    const result = await leaveServicesModel.getLeavesByEmployeeId(employee_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeave = async (req, res) => {
  const { id, status } = req.body;

  try {
    const result = await leaveServicesModel.updateLeave(id, status);
    res
      .status(200)
      .json({ success: true, message: "Leave Updated Sucessfull", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
