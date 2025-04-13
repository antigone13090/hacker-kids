const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Charger les défis depuis defis.json
const defisPath = path.join(__dirname, '..', 'data', 'defis.json');

function getDefis() {
  try {
    const data = fs.readFileSync(defisPath);
    return JSON.parse(data);
  } catch (err) {
    console.error('Erreur lecture defis.json :', err);
    return [];
  }
}

// Route pour lister tous les défis
router.get('/defis', (req, res) => {
  const defis = getDefis();
  res.render('defis', { defis });
});

// Route pour accéder à un défi spécifique
router.get('/defis/:nom', (req, res) => {
  const defis = getDefis();
  const defi = defis.find(d => d.nom === req.params.nom);
  if (!defi) {
    return res.status(404).send('Défi introuvable');
  }
  res.render('defi', { defi });
});

module.exports = router;
