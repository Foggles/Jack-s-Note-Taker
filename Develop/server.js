// const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
// const http = require('http');
const server = express();

// Specifying the PORT so as to work on Heroku, or on PORT 3000 if not on Heroku
const PORT = process.env.PORT || 3000;

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get('/', (request, response) => response.sendFile(`${__dirname}/public/index.html`));
server.get('/notes', (request, response) => response.sendFile(`${__dirname}/public/notes.html`));

let notes;
noteIdCounter = 1;

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
  let noteId = noteIdCounter;

  const note = { title: noteTitle, text: noteText, id: noteId };
  notes.push(note);

  fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log("Success");
  });

  noteIdCounter++;
  response.json(note);
});

// server.delete('/api/notes/:id', (request, response) => {
//   fs.readFile(`${__dirname}/db/db.json`, (err, data) => {
//     if (err) throw err;

//     notes = JSON.parse(data);
//     const noteId = request.params.noteId;

//     delete notes[noteId];

//     response.status(204).send();

//   })
// });

// server.delete('/api/notes/:id', (req, res) => {
//   let deleteId = req.params.id; //Get the id through req.params.id of the object you are going to delete
//   // notes = JSON.parse(data);

//   let deleteObj = notes.find(note => note.id == deleteId); // As you have only Id of the object, we want to get the entire object from the array. find() will fetch the object from the array whose id is equal to deleteId and assign it to deleteObj.
//   let deleteIndex = notes.indexOf(deleteObj); //Find the index of the object fetched from the JSON array.
//   notes.splice(deleteIndex, 1); // Splice/ remove the object from the JSON Array.
//   res.send(); // Send the deleted object as response.
// });

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
})