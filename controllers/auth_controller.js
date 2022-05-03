const passport = require('passport');
const { validationResult } = require('express-validator');

function userRegistration(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({ status: 'error', errors: errors.array() });
    }

    passport.authenticate('localUserSignup', { session: false }, (err, authToken, info) => {
        console.log(err);
        if (err) return res.sendStatus(500);
        if (authToken) return res.json({ status: 'success', authToken: authToken });

        return res.json({ status: 'error', message: info.message });
    })(req, res, next);
}

function userLogin(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({ status: 'error', errors: errors.array() });
    }

    passport.authenticate('localUserLogin', { session: false }, (err, authToken, info) => {

        if (err) return res.sendStatus(500);
        if (authToken) return res.json({ status: 'success', authToken: authToken });

        return res.json({ status: 'error', message: info.message });
    })(req, res, next);
}

function userLogout(req, res) {
    req.logout();
    res.redirect('/');
}

function userDetails(req, res) {
    return res.status(200).json({ user: req.user });
}

function authBearerToken(req, res, next) {
    passport.authenticate('userBearerLogin',{ session: false },(err, user, info) => {
        if (err) return res.sendStatus(401);

        if (user) {
            req.user = user;
            return next();
        }
        return next(info);
    })(req, res, next);
}

// Checks if password has > 8 chars
function isValidPassword(password) {
    return password.length >= 8;
}

// Uses a regex to check if email is valid
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    userRegistration,
    userLogin,
    userLogout,
    userDetails,
    authBearerToken
};
