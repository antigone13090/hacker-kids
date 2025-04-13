const express = require('express');
const router = express.Router();

// Exemple de routes pour différents niveaux
router.get('/niveau/facile', (req, res) => {
  res.render('niveau', { niveau: 'facile' });
});

router.get('/niveau/moyen', (req, res) => {
  res.render('niveau', { niveau: 'moyen' });
});

router.get('/niveau/difficile', (req, res) => {
  res.render('niveau', { niveau: 'difficile' });
});

module.exports = router;
