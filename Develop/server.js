const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const http = require('http');
const app = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const noteDatabase = fs.readFile('./db/db.json', (err, data) => {
  if (err) throw err;
  let db = JSON.parse(data);
  console.log(db);
});

// Specifying the PORT so as to work on Heroku, or on PORT 3000 if not on Heroku
const PORT = process.env.PORT || 3000;

// const renderHomepage =  (request, response) => {
//   fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
//     if (err) throw err;
//     response.writeHead(200, { 'Content-Type': 'text/html'});
//     response.end(data);
//   });
// }

// const handleRequest = (request, response) => {
//   const path = request.url;

//   switch (path) {
//     case '/':
//         renderHomepage(request, response);
//       break;
//     case '/notes':
//         renderNotes(request, response);
//         break;
//     default:
//       // response.send("Error")
//       break;
//   }
// }

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
})