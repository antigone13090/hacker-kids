const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err || !user) return res.render('login', { message: "Utilisateur inconnu" });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.render('login', { message: "Mot de passe incorrect" });
    }
    req.session.user = username;
    res.redirect('/dashboard');
  });
});

router.get('/register', (req, res) => {
  res.render('register', { message: null });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], err => {
    if (err) return res.render('register', { message: "Nom déjà utilisé" });
    res.redirect('/login');
  });
});

router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  db.all(
    "SELECT challenge FROM scores JOIN users ON users.id = scores.user_id WHERE users.username = ? AND scores.completed = 1",
    [req.session.user],
    (err, rows) => {
      if (err) return res.send("Erreur DB");
      res.render('dashboard', { username: req.session.user, scores: rows });
    }
  );
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
