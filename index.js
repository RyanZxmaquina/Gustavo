const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path'); // Importe o módulo 'path' do Node.js.

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'xrc'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Rota para /login2
app.get('/login2', (req, res) => {
  res.render('login2'); // Renderiza a página login2.ejs
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// READ
app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) throw err;
    res.render('index', { users: result });
  });
});

// CREATE
app.post('/add', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    res.redirect('/login2');
  });
});

// UPDATE
app.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
  db.query(sql, [username, password, id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// DELETE
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
