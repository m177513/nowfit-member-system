// /config/db.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '003205',
  database: 'gym',
  waitForConnections: true,
  connectionLimit: 10,
});
module.exports = pool;
