const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const authRoutes = require('./routes/auth.routes');
const formidable = require('express-formidable');
const uniqid = require('uniqid');
const uploadRoutes = require('./routes/upload.routes');
const adsRoutes = require('./routes/ads.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


app.use('/auth', authRoutes);

app.use('/api', authRoutes);

app.use('/upload', formidable({
  uploadDir: './public/uploads',
  keepExtensions: true,
  multiples: false,
  onFileBegin: (name, file) => {
    const extension = file.name.split('.').pop();
    file.path = `${__dirname}/public/uploads/photo_${uniqid()}.${extension}`;
  },
}), uploadRoutes);

app.use('/api', adsRoutes);

app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Bulletin Board App działa');
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});