const bcrypt = require("bcrypt");
const userServiceModel = require("../models/userServiceModel");
const {
  generateManagerTokens,
  generateAdminTokens,
  generateEmployeeTokens,
} = require("../../middleware/middleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUserService = async (name, email, password, role) => {
  // console.log(name, email, password, role);
  try {
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    // console.log(hashPassword, "hash");
    const result = await userServiceModel.createUserService(
      name,
      email,
      hashPassword,
      role
    );
    console.log(result);
    return result;
  } catch (error) {
    return { "Existing email": error.message };
  }
};

// User Login Controller

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userServiceModel.loginUser(email);

    if (user.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Generating both tokens
    if (user.role === "admin") {
      const { accessToken, refreshToken } = generateAdminTokens(user);

      await userServiceModel.updateUserToken(user.user_id, refreshToken);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
          employee_id: user.employee_id,
          image: user.image,
        },
        accessToken, // Required: Send the accessToken to the client
        refreshToken, // Required: Send the refreshToken to the client
      });
    } else if (user.role === "employee") {
      const { accessToken, refreshToken } = generateEmployeeTokens(user);

      await userServiceModel.updateUserToken(user.user_id, refreshToken);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
          employee_id: user.employee_id,
          image: user.image,
        },
        accessToken, // Required: Send the accessToken to the client
        refreshToken, // Required: Send the refreshToken to the client
      });
    } else if (user.role === "manager") {
      const { accessToken, refreshToken } = generateManagerTokens(user);

      await userServiceModel.updateUserToken(user.user_id, refreshToken);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
          employee_id: user.employee_id,
          image: user.image,
        },
        accessToken, // Required: Send the accessToken to the client
        refreshToken, // Required: Send the refreshToken to the client
      });
    } else {
      res.status(400).json({ message: "Invalid Role" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handling the refresh Token

exports.refreshToken = async (req, res) => {
  // const token = req.body.refreshToken;
  const token = req.headers["authorization"];
  console.log("------------------------TOKEN--------------------------");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Access Token Required" });
  }

  // decode the token and take the role from it
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET; // Ensure this is your refresh token secret

  try {
    const refreshTokenComparison = token.split(" ")[1]; // Assuming Bearer schema
    const decoded = jwt.verify(refreshTokenComparison, refreshTokenSecret);

    // Ensure to verify if the refreshToken is still stored in the database and is valid
    // Add database verification logic here...

    const user = {
      user_id: decoded.user_id,
      email: decoded.email,
      role: decoded.role,
    };

    if (user.role === "admin") {
      const { accessToken, refreshToken } = generateAdminTokens(user);
      await userServiceModel.updateUserToken(user.user_id, refreshToken);
      res.status(200).json({
        accessToken,
      });
    } else if (user.role === "employee") {
      const { accessToken, refreshToken } = generateEmployeeTokens(user);
      await userServiceModel.updateUserToken(user.user_id, refreshToken);
      res.status(200).json({
        accessToken,
      });
    } else if (user.role === "manager") {
      const { accessToken, refreshToken } = generateManagerTokens(user);
      await userServiceModel.updateUserToken(user.user_id, refreshToken);
      res.status(200).json({
        accessToken,
      });
    } else {
      res.status(400).json({ message: "Invalid Role" });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res
        .status(403)
        .json({ message: "Refresh token expired. Please login again." });
    } else {
      res.status(403).json({ message: "Invalid refresh token." });
    }
  }
};

// User update Controller
exports.updateUser = async (req, res) => {
  try {
    const { userId, name, email } = req.body;
    const imagePath = req.file ? "userimages/" + req.file.filename : null;
    console.log("controller details:", userId, name, email, imagePath);
    const result = await userServiceModel.updateUser(
      userId,
      name,
      email,
      imagePath
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user image
exports.getUserImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userServiceModel.getUserImage(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
