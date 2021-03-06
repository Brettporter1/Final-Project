const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const aboutRouter = require('./routes/about');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    debug: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/app', express.static(path.join(__dirname, 'client/build')));

// custom Middleware for logging the each request going to the API
// app.use((req, res, next) => {
//   if (req.body) log.info(req.body);
//   if (req.params) log.info(req.params);
//   if (req.query) log.info(req.query);
//   log.info(
//     `Received a ${req.method} request from ${req.ip} for                ${
//       req.url
//     }`
//   );
//   next();
// });

app.enable('trust proxy');
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'dasdasdas4324213',
    proxy: true,
    // resave: false,
    // // saveUninitialized: true,
    // cookie: {
    //   secure: false,
    //   sameSite: false,
    //   path: '/',
    //   domain: 'localhost:3000',
    //   maxAge: 1000 * 60 * 24
    // }
  })
);
// app.use(
//   cors({ credentials: true, origin: 'localhost:3000', preflightContinue: true })
// );

// Passport config
app.use(passport.initialize());
require('./utils/passport-config')(passport);

// app.use(passport.session());

const User = require('./models/user');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/about', aboutRouter);

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
