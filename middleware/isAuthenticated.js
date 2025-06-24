const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(403).send('Brak dostepu. Zaloguj się!');
    }
};

module.exports = isAuthenticated;