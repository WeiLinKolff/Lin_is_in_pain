// // const mysql = require('mysql2');
// // const http = require('http');
// // const fs = require('fs');
// // const express = require('express');
// // const app = express();
// // // Maak een verbinding met de database
// // const connection = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: 'alaa'
// // });

// // // connect
// // connection.connect((err) => {
// //   if(err){
// //     throw  err;
// //   }
// // });

// // con.connect(function(err) {
// //   if (err) throw err;
// //   con.query("SELECT * FROM nodes", function (err, result, fields) {
// //     if (err) throw err;
// //     console.log(result);
// //   });
// // });
// const mysql = require('mysql2/promise');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "alaa"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   //Select all customers and return the result object:
//   con.query("SELECT * FROM nodes", function (err, result, fields) {
//     if (err) throw err;
//     // console.log(result);
//     const outputElement = document.getElementById("output1");
//     const consoleOutput = result;
//     outputElement.innerHTML = consoleOutput;
//   });
// });
// function getNodes() {
//   fetch('/api/nodes')
//     .then(response => response.json())
//     .then(data => {
//       const outputElement = document.getElementById("output1");
//       outputElement.innerHTML = JSON.stringify(data);
//     })
//     .catch(error => console.error(error));
// }

// window.onload = function() {
//   getNodes();
// };
const mysql = require('mysql2/promise');
const fs = require('fs/promises');

async function getNodes() {
  const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alaa',
    waitForConnections: true,
  });

  try {
    const [rows, fields] = await pool.execute('SELECT * FROM nodes');
    return rows;
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

async function checkAndUpdateJson() {
  try {
    const rows = await getNodes();
    const jsonData = JSON.stringify(rows, null, 2);

    // Check if the JSON data has changed
    const currentData = await fs.readFile('nodes.json', 'utf8');
    if (currentData !== jsonData) {
      // Write the new data to the file
      await fs.writeFile('nodes.json', jsonData);
      console.log('Updated nodes.json');
    } else {
      console.log('nodes.json is up-to-date');
    }
  } catch (err) {
    console.error(err);
  }
}

checkAndUpdateJson();
