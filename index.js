// const http = require('http');
const fs = require('fs');
// const fs = require('fs').promises;
const path = require('path');
require("dotenv").config();
const express = require("express");
const app = express();

app.get("/:filename?", function (req, res) {
  const filename = req.params.filename || 'index'; // default to 'index' if no filename is provided
  const filePath = path.resolve(`${filename}.html`) // prevents directory traversal attacks
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return fs.readFile('./404.html', (err, d) =>res.end(d));
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    return res.end(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{console.log(`Listening on port ${PORT}`)});

// http.createServer(function (req, res) {
//     let filename = "." + req.url;
//     if (req.url === '/') {
//       filename = './index';
//     }
//     fs.readFile(filename + '.html' , function (err, data) {
//       if (err) {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         return fs.readFile('./404.html', (err, d) =>res.end(d));
//       }
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       return res.end(data);
//     });
// }).listen(8080);

// http.createServer(async function (req, res) {
//   let filename = "." + req.url;
//   if (req.url === '/') {
//     filename = './index';
//   }
//   try {
//     // Step 1: Try to read the requested file
//     const data = await fs.readFile(filename + '.html');
//     //Step 2: File exists, send 200 OK
//     res.writeHead(200, {'Content-Type':'text/html'});
//     res.end(data);
//   } catch (err) {
//     //Step 3: File not found, send 404
//     res.writeHead(404, {'Content-Type':'text/html'});
//     try {
//       //Step 4: Try to read and serve 404.html
//       const errorPage = await fs.readFile('./404.html');
//       res.end(errorPage);
//     } catch (err) {
//       //Step 5: If 404.html is missing, send plain text error
//       res.end("404 Not Found");
//     }
//   }
// }).listen(8080);