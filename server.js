const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth.routes')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const session = require('express-session');

app.use(session({
  secret: 'tajny_klucz_sesji',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  }
}));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Bulletin Board App działa');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});