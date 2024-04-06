const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASWORD,
  database: process.env.DBLEAVES,
  port: process.env.DBPORT,
});

module.exports = db;
