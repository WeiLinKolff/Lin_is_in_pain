var mysql = require('alaa');
var express = require('express');
const app = express();
const port = 3000;
const http = require('http');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "alaa"
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(8080);
