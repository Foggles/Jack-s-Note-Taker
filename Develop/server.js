const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const app = express();

const noteDatabase = fs.readFile('./db/db.json', (err, data) => {
  if (err) throw err;
  let db = JSON.parse(data);
  console.log(db);
});

// Specifying the PORT so as to work on Heroku, or on PORT 3000 if not on Heroku
const PORT = process.env.PORT || 3000;