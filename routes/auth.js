const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { username: req.session.user });
  } else {
    res.redirect('/login');
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hash], err => {
    if (err) return res.send('Erreur d\'inscription');
    res.redirect('/login');
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (!user) return res.send('Utilisateur non trouvé');
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.session.user = user.username;
      res.redirect('/dashboard');
    } else {
      res.send('Mot de passe incorrect');
    }
  });
});

module.exports = router;
