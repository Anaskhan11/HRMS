const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeDepartmentAndPosition,
  searchEmployee,
} = require("../controller/employeeServiceController");

const {
  createAsset,
  getAllAssets,
  getAssetsById,
  updateAssets,
  deleteAssets,
} = require("../controller/assetsController");

const {
  getDashboardData,
  getEmployeeDashboardData,
  getAllAges,
} = require("../controller/dashboardController");

const { verifyAdminOrManagerToken } = require("../../middleware/middleware");

const router = express.Router();
router.post("/createEmployee", createEmployee);
router.get("/getAllEmployees", verifyAdminOrManagerToken, getAllEmployees);
router.get("/searchEmployee/:name", searchEmployee);

// Employement Routes
router.get(
  "/getEmployeeDepartmentAndPosition",
  getEmployeeDepartmentAndPosition
);

// assets Routes
router.post("/createAsset", createAsset);
router.get("/getAllAssets", getAllAssets);
router.get("/getAssetsById/:employee_id", getAssetsById);
router.put("/updateAssets/:id", updateAssets);
router.delete("/deleteAssets/:id", deleteAssets);

// Dashboard Routes
router.get("/getDashboardData", getDashboardData);
router.get("/getEmployeeDashboardData/:employee_id", getEmployeeDashboardData);
router.get("/getallages", getAllAges);

module.exports = router;
