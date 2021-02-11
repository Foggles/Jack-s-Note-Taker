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

let notes;
server.get('/api/notes', (request, response) => {
  // READ JSON, STORE IT INTO VARIABLE, PARSE IT INTO DB.JSON
  fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
    if (err) throw err;

    notes = JSON.parse(data);

    response.json(notes);
  });
});

server.post('/api/notes', (request, response) => {
  let noteTitle = request.body.title;
  let noteText = request.body.text;

  const note = {title: noteTitle, text: noteText};
  notes.push(note);

  fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log("Success");
  });
  response.json(note);
});

// server.delete('/api/notes:id', (request, response) => {
//   console.log(request);
// })

// Specifying the PORT so as to work on Heroku, or on PORT 3000 if not on Heroku
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
})