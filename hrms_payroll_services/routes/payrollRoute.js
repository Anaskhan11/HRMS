const salarycontroller = require("../controller/salaryController");
const payrollController = require("../controller/payrollController");
const allowenceController = require("../controller/allowenceController");
const deductionController = require("../controller/dedutionController");
const express = require("express");

const router = express.Router();

// Salary routes
router.post("/createsalary", salarycontroller.createSalary);
router.get("/getsalary", salarycontroller.getSalary);
router.get("/getsalary/:employee_id", salarycontroller.getSalaryById);

// payroll routes
router.post("/createpayroll", payrollController.createPayroll);
router.get("/getpayroll", payrollController.getPayroll);

// allowence routes
router.post("/createallowence", allowenceController.createAllowence);
router.get("/getallowence", allowenceController.getAllowence);

// dedution routes
router.post("/creatededuction", deductionController.creatededuction);
router.get("/getdeduction", deductionController.getDeduction);
module.exports = router;
