const dashboardModel = require("../models/dashboardModel");

// get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const result = await dashboardModel.getDashboardData();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeDashboardData = async (req, res) => {
  try {
    const result = await dashboardModel.getEmployeeDashboardData(
      req.params.employee_id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAges = async (req, res) => {
  try {
    const result = await dashboardModel.getAllAges();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
