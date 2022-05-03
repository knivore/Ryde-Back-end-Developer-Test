const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index_router');
const userRouter = require('./routes/user_router');

const app = express();

// create persistent mysql session store
// var connection = mysql.createConnection(options);
// var sessionStore = new MySQLStore({
//   checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
//   expiration: 86400000,// The maximum age of a valid session; milliseconds.
//   createDatabaseTable: true,// Whether to create the sessions' database table, if one does not already exist.
//   schema: {
//     tableName: 'sessions',
//     columnNames: {
//       session_id: 'session_id',
//       expires: 'expires',
//       data: 'data'
//     }
//   }
// }, connection);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
    origin: "http://localhost:3000", // location of the FE app connected to
    credentials: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
require('./middlewares/passport_middleware')
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
