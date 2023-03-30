const mysql = require('mysql2');
const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
// Maak een verbinding met de database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'alaa'
});

// connect
connection.connect((err) => {
  if(err){
    throw  err;
  }
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM nodes", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});