// Libs
const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");

// DB Connection
const UserPool = require("./hrms_user_services_Authentication/config/DBConnection");
const db = require("./hrms_department_services/config/DBConnection");
const positiondb = require("./hrms_position_services/config/DBConnection");
const leaveDB = require("./hrms_leave_management_services/config/DBConnection");
const projectDB = require("./hrms_project_services/config/DBConnection");
const payrollDB = require("./hrms_payroll_services/config/DBConnection");

// Routes
const userLoginRoutes = require("./hrms_user_services_Authentication/routes/userLoginRoutes");
const employeeServiceRoutes = require("./hrms_employee_services/routes/employeeServiceRoutes");
const departmentServicesRoutes = require("./hrms_department_services/routes/deparmentServicesRoutes");
const positionServicesRoutes = require("./hrms_position_services/routes/positionServicesRoutes");
const attendanceServiceRoutes = require("./hrms_attendence_service/attendanceRoutes/attendanceServiceRoutes");
const leaveServicesRoutes = require("./hrms_leave_management_services/routes/leaveServicesRoutes");
const projectDetialRoutes = require("./hrms_project_services/routes/projectDetialsRoutes");
const payrollRoutes = require("./hrms_payroll_services/routes/payrollRoute");

// App
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
// app.use(
//   session({
//     secret: process.env.ACCESS_TOKEN_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use("/api/auth", userLoginRoutes);
app.use("/api/employee", employeeServiceRoutes);
app.use("/api/department", departmentServicesRoutes);
app.use("/api/position", positionServicesRoutes);
app.use("/api/attendance", attendanceServiceRoutes);
app.use("/api/leave", leaveServicesRoutes);
app.use("/api/project", projectDetialRoutes);
app.use("/api/payroll", payrollRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    colors.bgGreen("Server is running on port: " + process.env.PORT).black
  );

  UserPool.connect((err) => {
    if (err) {
      console.log("Error connecting to UserPool");
      return;
    }
    console.log(colors.bgCyan("1:: Connected to user services database").black);
  });
  db.connect((err) => {
    if (err) {
      console.log("Error connecting to UserPool");
      return;
    }
    console.log(
      colors.bgYellow("3:: Connected to Department services database").black
    );
  });
  positiondb.connect((err) => {
    if (err) {
      console.log("Error connecting to UserPool");
      return;
    }
    console.log(
      colors.bgBlue("4:: Connected to Position services database").black
    );
  });

  leaveDB.connect((err) => {
    if (err) {
      console.log("Error connecting to UserPool");
      return;
    }
    console.log(
      colors.bgMagenta("5:: Connected to Leave services database").black
    );
  });
  projectDB.connect((err) => {
    if (err) {
      console.log("Error connecting to UserPool");
      return;
    }
    console.log(
      colors.bgYellow("6:: Connected to project services database").black
    );
  });
  payrollDB.connect((err) => {
    if (err) {
      console.log("Error connecting to UserPool");
      return;
    }
    console.log(
      colors.bgGreen("7:: Connected to project services database").black
    );
  });
});
