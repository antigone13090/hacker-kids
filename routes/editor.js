const express = require('express');
const router = express.Router();

// Exemple d'éditeur de code de test (futur espace d'entraînement)
router.get('/editor', (req, res) => {
  res.render('editor', { code: '' });
});

router.post('/editor', (req, res) => {
  const { code } = req.body;
  // Ici tu pourrais exécuter le code avec un moteur JS/Python sandboxé si besoin
  res.render('editor', { code });
});

module.exports = router;
