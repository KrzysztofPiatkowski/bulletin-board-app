const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');

const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', isAuthenticated, (req, res) => {
    res.send(`Witaj, ${req.session.user.name}!`);
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

module.exports = router;