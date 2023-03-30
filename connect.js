var mysql = require('mysql');
var express = require('express');
const app = express();
const port = 3000;



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});