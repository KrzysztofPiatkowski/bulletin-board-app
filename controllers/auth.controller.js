const User = require('../models/user.model');

const register = (req, res) => {
    
    const { email, password, name } = req.body;

    if (!email || !password) {
        return res.status(400).send('Musisz wprowadzic email i haslo!')
    }

    const newUser = new User(email, password, name);

    console.log('Nowy uzytkownik: ', newUser);
    res.send('Użytkownik zarejestrowany (próba)');
};

const login = (req, res) => {
    console.log('Dane z formularza: ', req.body);
    const { email, password } = req.body;

    const loggedUser = new User(email, password);
    req.session.user = loggedUser;

    console.log('Zalogowany uzytkownik: ', loggedUser);
    res.send('Udalo sie zalogować!');
}

module.exports = {
    register,
    login,
};