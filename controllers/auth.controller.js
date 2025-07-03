const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const path = require('path');
const uniqid = require('uniqid');
const fs = require('fs');

const register = async (req, res) => {
  const { login, password, phone } = req.fields;
  const file = req.files.avatar;

  if (!login || !password || !phone) {
    return res.status(400).send('Login, hasło i telefon są wymagane!');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let avatarFilename = null;

    if (file && file.name) {
      const extension = path.extname(file.name);
      avatarFilename = `avatar_${uniqid()}${extension}`;
      const newPath = path.join(__dirname, '../public/uploads/avatars/', avatarFilename);
      fs.renameSync(file.path, newPath);
    }

    const newUser = new User({
      login,
      password: hashedPassword,
      phone,
      avatar: avatarFilename,
    });

    await newUser.save();

    req.session.user = {
      id: newUser._id,
      login: newUser.login,
      avatar: newUser.avatar,
      phone: newUser.phone,
    };

    console.log('✅ Nowy użytkownik:', req.session.user);
    res.status(201).send('Użytkownik zarejestrowany i zalogowany!');
  } catch (err) {
    console.error('❌ Błąd rejestracji:', err);
    res.status(500).send('Błąd serwera podczas rejestracji');
  }
};

const login = async (req, res) => {
  const { login, password } = req.fields;

  if (!login || !password) {
    return res.status(400).send('Login i hasło są wymagane!');
  }

  try {
    const user = await User.findOne({ login });
    if (!user) return res.status(401).send('Nie znaleziono użytkownika');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(401).send('Nieprawidłowe hasło');

    req.session.user = {
      id: user._id,
      login: user.login,
      avatar: user.avatar,
      phone: user.phone,
    };

    console.log('✅ Zalogowany użytkownik:', req.session.user);
    res.send('Zalogowano pomyślnie!');
  } catch (err) {
    console.error('❌ Błąd logowania:', err);
    res.status(500).send('Błąd serwera podczas logowania');
  }
};

module.exports = {
  register,
  login,
};