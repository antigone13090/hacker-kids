const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const defiRoutes = require('./routes/defis');
const dynamicDefiRoutes = require('./routes/dynamicDefis');
const adminRoutes = require('./routes/admin');
const niveauRoutes = require('./routes/niveaux');
const editorRoutes = require('./routes/editor');

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Obligatoire pour Render

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'secretHackerKey',
  resave: false,
  saveUninitialized: true
}));

app.use('/', authRoutes);
app.use('/', defiRoutes);
app.use('/', dynamicDefiRoutes);
app.use('/', adminRoutes);
app.use('/', niveauRoutes);
app.use('/', editorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
