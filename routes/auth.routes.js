const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');

const { register, login } = require('../controllers/auth.controller');

const formidable = require('express-formidable');

router.post('/login', formidable(), login);
router.post('/register', formidable(), register);

router.get('/profile', isAuthenticated, (req, res) => {
    res.send(`Witaj, ${req.session.user.login}!`);
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Błąd przy wylogowywaniu:', err);
            res.status(500).send('Wystąpił błąd');
        } else {
            res.send('Zostales wylogowany.')
        }
    });
});

router.get('/user', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Nie jestes zalogowany' });
    }
});

module.exports = router;