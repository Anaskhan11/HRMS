const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateEmployeeTokens = (user) => {
  // Secret keys should be in your environment variables
  const accessTokenSecret = process.env.EMPLOYEE_ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  const accessToken = jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    accessTokenSecret,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    refreshTokenSecret,
    { expiresIn: "3d" }
  );

  return { accessToken, refreshToken };
};

exports.verifyEmployeeToken = (req, res, next) => {
  const JwtToken = req.headers["authorization"];
  const token = JwtToken.split(" ")[1];

  if (!token) {
    return res.status(403).json("Token is required");
  }
  try {
    const decoded = jwt.verify(token, process.env.EMPLOYEE_ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid Token while Verifying");
  }
};

exports.generateAdminTokens = (user) => {
  // Secret keys should be in your environment variables
  const accessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  const accessToken = jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    accessTokenSecret,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    refreshTokenSecret,
    { expiresIn: "3d" }
  );

  return { accessToken, refreshToken };
};

exports.verifyAdminToken = (req, res, next) => {
  const JwtToken = req.headers["authorization"];
  const token = JwtToken.split(" ")[1];

  if (!token) {
    return res.status(403).json("Token is required");
  }
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid Token while Verifying");
  }
};

exports.generateManagerTokens = (user) => {
  // Secret keys should be in your environment variables
  const accessTokenSecret = process.env.MANAGER_ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  const accessToken = jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    accessTokenSecret,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { userId: user.user_id, email: user.email, role: user.role },
    refreshTokenSecret,
    { expiresIn: "3d" }
  );

  return { accessToken, refreshToken };
};

exports.verifyManagerToken = (req, res, next) => {
  const JwtToken = req.headers["authorization"];
  const token = JwtToken.split(" ")[1];

  if (!token) {
    return res.status(403).json("Token is required");
  }
  try {
    const decoded = jwt.verify(token, process.env.MANAGER_ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid Token while Verifying");
  }
};

// Middleware to verify either Admin or Manager token
exports.verifyAdminOrManagerToken = (req, res, next) => {
  const JwtToken = req.headers["authorization"];

  if (!JwtToken) {
    return res.status(403).json("Token is required for authorization");
  }

  const token = JwtToken.split(" ")[1];

  // First, try verifying as an Admin
  jwt.verify(
    token,
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        // If verification fails, try verifying as a Manager
        jwt.verify(
          token,
          process.env.MANAGER_ACCESS_TOKEN_SECRET,
          function (err, decoded) {
            if (err) {
              // If both verifications fail, return an unauthorized error
              return res
                .status(401)
                .json("Invalid Token. Unauthorized access.");
            } else {
              // If Manager token is valid, proceed
              req.user = decoded;
              next();
            }
          }
        );
      } else {
        // If Admin token is valid, proceed
        req.user = decoded;
        next();
      }
    }
  );
};
