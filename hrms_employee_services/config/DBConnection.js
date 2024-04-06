const mysql = require("mysql2");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBEMPLOYEES,
  port: process.env.DBPORT,
  waitForConnections: true,
  connectionLimit: 10, // Adjust according to your needs
  queueLimit: 0, // 0 means unlimited queueing
});

const promisePool = pool;

const EmployeePool = promisePool.getConnection(function (err) {
  if (err) {
    console.log(err, "Error in database");
  } else {
    console.log(colors.bgRed("2:: Connected to Employee Services Database"));
  }
});
module.exports = { EmployeePool, promisePool };
