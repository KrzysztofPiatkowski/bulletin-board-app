const User = require('../models/user.model');

const register = async (req, res) => {
  const { login, password, avatar, phone } = req.body;

  if (!login || !password) {
    return res.status(400).send('Musisz wprowadzić login i hasło!');
  }

  try {
    const newUser = new User({ login, password, avatar, phone });
    await newUser.save(); 
    console.log('✅ Nowy użytkownik:', newUser);
    res.status(201).send('Użytkownik zarejestrowany!');
  } catch (err) {
    console.error('❌ Błąd rejestracji:', err);
    res.status(500).send('Błąd serwera podczas rejestracji');
  }
};

const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });

    if (!user) {
      return res.status(401).send('Nie znaleziono użytkownika');
    }

    if (user.password !== password) {
      return res.status(401).send('Nieprawidłowe hasło');
    }

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
