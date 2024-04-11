const express = require("express");

const {
  createAttendance,
  getAllEmployeeAttendance,
  getAllAttendance,
  getAttendanceDataForChart,
} = require("../attendanceController/attendanceServiceController");

const router = express.Router();

router.post("/createAttendance", createAttendance);
router.get("/getAllEmployeeAttendance", getAllEmployeeAttendance);
router.get("/getAllAttendance", getAllAttendance);
router.get("/getAttendanceDataForChart", getAttendanceDataForChart);

module.exports = router;
