const express = require("express");

const {
  createAttendance,
  getAllEmployeeAttendance,
  getAllAttendance,
} = require("../attendanceController/attendanceServiceController");

const router = express.Router();

router.post("/createAttendance", createAttendance);
router.get("/getAllEmployeeAttendance", getAllEmployeeAttendance);
router.get("/getAllAttendance", getAllAttendance);

module.exports = router;
