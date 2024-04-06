const express = require("express");
const projectDetialController = require("../controller/projectDetialsController");
const taskController = require("../controller/taskController");
const assignmentController = require("../controller/assignmentController");

const router = express.Router();

router.post("/createProject", projectDetialController.createProject);
router.get("/getProjects", projectDetialController.getProjects);
// Get project by Id
router.get("/getProjectById/:id", projectDetialController.getProjectsById);
// Search User By Name
router.post("/searchByName", projectDetialController.searchName);

// Task Routes
router.post("/createTask", taskController.createTask);
router.get("/getProjectTasks/:project_id", taskController.getProjectTasks);
router.put(`/:task_id/updateTaskStatus`, taskController.updateTaskStatus);

// Assignment Routes
router.post("/createAssignment", assignmentController.createAssignment);

router.post(
  "/searchEmployeesInAssignment/:project_id/:searchTerm",
  assignmentController.searchEmployeesInAssignment
);

router.get(
  "/getProjectsByManagerId/:manager_id",
  projectDetialController.getProjectsByManagerId
);

module.exports = router;
