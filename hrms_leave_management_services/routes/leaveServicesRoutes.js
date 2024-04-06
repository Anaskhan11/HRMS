const {
  createLeave,
  getLeaves,
  updateLeave,
  getLeavesByEmployeeId,
} = require("../controller/leaveServicesController");
const express = require("express");

const router = express.Router();

router.post("/createLeave", createLeave);
router.get("/getLeaves", getLeaves);
router.get("/getEmployeeLeave/:employee_id", getLeavesByEmployeeId);
router.put("/updateLeaves", updateLeave);

module.exports = router;
