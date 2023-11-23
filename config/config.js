const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'prabhu3437',
    database:'contacts_db'
  });

  exports.db =db;