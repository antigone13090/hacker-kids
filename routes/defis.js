const express = require('express');
const router = express.Router();

// Exemple de route de défi fixe
router.get('/defis-exemple', (req, res) => {
  res.send('Défi statique de test OK');
});

module.exports = router;
