const attendanceServiceModel = require("../attendanceModel/attendanceServiceModel");

exports.createAttendance = async (req, res) => {
  const { employee_id, status, date, time_in, time_out } = req.body;
  try {
    const result = await attendanceServiceModel.createAttendance(
      employee_id,
      status,
      date,
      time_in,
      time_out
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all attendance
exports.getAllEmployeeAttendance = async (req, res) => {
  try {
    const result = await attendanceServiceModel.getAllEmployeeAttendance();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const result = await attendanceServiceModel.getAllAttendance();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
