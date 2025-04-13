const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.get('/admin', (req, res) => {
  if (req.session.user !== 'admin') return res.redirect('/login');

  db.all(\`
    SELECT users.username, scores.challenge
    FROM scores
    JOIN users ON users.id = scores.user_id
    WHERE scores.completed = 1
  \`, [], (err, rows) => {
    if (err) return res.send('Erreur de base de données');
    res.render('admin', { scores: rows });
  });
});

module.exports = router;
