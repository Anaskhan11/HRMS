const express = require("express");
const {
  createDepartmentService,
  getAllDepartmentService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,
} = require("../controller/deparmentServicesController");

const router = express.Router();
router.post("/createDepartment", createDepartmentService);
router.get("/getAllDepartment", getAllDepartmentService);
router.get("/getDepartmentbyid/:id", getDepartmentByIdService);
router.put("/updateDepartment/:id", updateDepartmentService);
router.delete("/deleteDepartment/:id", deleteDepartmentService);

module.exports = router;
