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
router.get("/getAssetsById/:id", getAssetsById);
router.put("/updateAssets/:id", updateAssets);
router.delete("/deleteAssets/:id", deleteAssets);
module.exports = router;
