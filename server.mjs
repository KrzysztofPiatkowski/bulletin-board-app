import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import formidable from 'express-formidable';
import uniqid from 'uniqid';

import connectDB from './db.js';
import authRoutes from './routes/auth.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import adsRoutes from './routes/ads.routes.js';
import usersRoutes from './routes/users.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors({
  origin: '*', // Replit nie pozwoli na http://localhost:3000
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.secret || 'tajny_klucz_sesji',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  },
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
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

// === Serve Frontend ===
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
