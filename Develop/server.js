// const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
// const http = require('http');
const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


server.get('/', (request, response) => response.sendFile(`${__dirname}/public/index.html`));
server.get('/notes', (request, response) => response.sendFile(`${__dirname}/public/notes.html`));

server.post('/api/notes', (request, response) => {
  console.log(request);
  
  response.json({
    success: true,
  })
});

server.get('/api/notes', (request, response) => {
  // READ JSON, STORE IT INTO VARIABLE, PARSE IT INTO DB.JSON
  fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
    if (err) throw err;

    let db = JSON.parse(data);
    console.log(db);
    response.json(db);
  });
});

// Specifying the PORT so as to work on Heroku, or on PORT 3000 if not on Heroku
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
})