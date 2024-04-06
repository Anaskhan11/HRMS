const dashboardModel = require("../model/dashboardModel");

// get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const result = await dashboardModel.getDashboardData();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
