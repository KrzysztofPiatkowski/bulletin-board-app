const User = require('../models/user.model');

const register = (req, res) => {
    
    const { login, password, avatar, phone } = req.body;

    if (!login || !password) {
        return res.status(400).send('Musisz wprowadzic login i haslo!')
    }

    const newUser = new User(login, password, avatar, phone);

    console.log('Nowy uzytkownik: ', newUser);
    res.send('Użytkownik zarejestrowany (próba)');
};

const login = (req, res) => {
    console.log('Dane z formularza: ', req.body);
    const { login, password } = req.body;

    const loggedUser = new User(login, password);
    req.session.user = loggedUser;

    console.log('Zalogowany uzytkownik: ', loggedUser);
    res.send('Udalo sie zalogować!');
}

module.exports = {
    register,
    login,
};