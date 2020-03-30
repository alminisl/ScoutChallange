const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')

const indexRouter = require('./routes/index');
// Add routes for every step
const init = require("./routes/init");
const validation = require("./routes/validation");
const pictures = require("./routes/pictures");
const links = require("./routes/links");
const cors = require("cors");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(session({
  secret: '3j22i43j4n33jn4jfk3n',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use(logger('dev'));
//INFO: Had to add limit, since the default one was 1mb, this could be better handled in the future with some caching
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/init", init);
app.use("/validation", validation);
app.use("/pictures", pictures);
app.use("/links", links);

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
