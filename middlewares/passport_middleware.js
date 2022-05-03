const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy, BearerStrategy = require('passport-http-bearer').Strategy;
const userService = require('../services/user_service');
const salt = process.env.LOCAL_PASSWORD_SALT;
const jwtSecret = process.env.AUTH_JWT_SECRET;

passport.serializeUser(function(user, done) {
    done(null, { user_id: user.user_id });
});

passport.deserializeUser(function(user, done) {
    userService.findUserById(user.user_id).then(function (data) {
        done(null, data);
    }).catch(done);
});

passport.use('localUserLogin', new LocalStrategy({
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        try {
            userService.findUserCredentialsByEmail(email).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 'We are unable to sign in to your account.' });
                }

                // const inputPassword = crypto.scryptSync(password, salt, 64);
                const inputPassword = password;

                if (user.password !== inputPassword) {
                    return done(null, false, { message: 'We can\'t sign in to your account.' });
                }

                const jsonWebToken = jwt.sign({ data: user.email}, jwtSecret,{ expiresIn: '1h' });
                return done(null, jsonWebToken);
            });
        } catch (err) {
            return done(err, false, err);
        }
    }
));

passport.use('userBearerLogin', new BearerStrategy(
    function(token, done) {
        const decoded = jwt.verify(token, jwtSecret);

        userService.findUserByEmail(decoded.data).then(function (user) {
            if (!user) {
                return done(null, false, { message: 'We are unable to sign in to your account.' });
            }
            return done(null, user, { scope: 'all' });
        });
    }
));

passport.use('localUserSignup', new LocalStrategy({
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    async function(req, email, password, done) {
        try {
            let user = await userService.findUserByEmail(email);

            if (user) {
                return done(null, false, { message: 'This email address is already taken.' });
            } else {
                // Hash password, TODO: Incorporate random salt and store into DB
                // var salt = crypto.randomBytes(64).toString('hex');
                // const password = crypto.scryptSync(password, salt, 64);
                user = await userService.createUserAccount(email, password);

                if (user) {
                    const jsonWebToken = jwt.sign({ data: user.email}, jwtSecret,{ expiresIn: '1h' });
                    return done(null, jsonWebToken);
                } else {
                    return done(null, false, { message: 'We are facing issues with creating your account. Please try again later.' });
                }
            }
        } catch (err) {
            return done(err, false, err);
        }
    }
));

module.exports = passport;
