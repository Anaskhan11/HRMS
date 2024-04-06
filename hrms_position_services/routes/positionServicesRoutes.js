const express = require("express");
const positionServicesController = require("../controller/positionServicesController");

const router = express.Router();

router.post("/createPosition", positionServicesController.createPosition);
router.get("/getAllPositions", positionServicesController.getAllPosition);
router.get("/getpositionbyid/:id", positionServicesController.getPositionById);
router.put("/updatePosition/:id", positionServicesController.updatePosition);
router.delete("/deletePosition/:id", positionServicesController.deletePosition);

module.exports = router;
