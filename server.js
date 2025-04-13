const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// EJS + Layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Routes
app.use(require('./routes/defis'));
app.use(require('./routes/admin'));
app.use(require('./routes/auth'));
app.use(require('./routes/niveaux'));
app.use(require('./routes/editor'));

// Accueil
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user || null });
});

// Page de contact
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  console.log('Message reçu de :', req.body.email, '| Contenu :', req.body.message);
  res.send('Merci pour ton message !');
});

// Page 404
app.use((req, res) => {
  res.status(404).render('notFound', { url: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
