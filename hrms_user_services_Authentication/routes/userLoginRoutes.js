const express = require("express");

const {
  loginUser,
  refreshToken,
  updateUser,
  getUserImage,
} = require("../controller/userServiceController");

const multer = require("multer");

const path = require("path");

const router = express.Router();

var storage = multer.diskStorage({
  destination: "public/userimages/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.put("/updateuser", upload.single("image"), updateUser);

router.get("/getimage/:userId", getUserImage);

router.post("/loginuser", loginUser);

router.post("/refresh", refreshToken);

module.exports = router;
