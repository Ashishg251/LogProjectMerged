var mongoose = require('./mongoose');
var db = mongoose();
//Loading  global config variable
require('./configLoad')

var compress = require('compression');
var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');

var configRoute = require('./routes/config');
var authenticate = require('./routes/authenticate')(passport);
var userAgent = require('./routes/API/userAgent');
var logListing = require('./routes/API/logListing');
var trafficRate = require('./routes/API/trafficRate');

//Wave 2 code
// var mainRoutes = require('./routes/aptCache/index');
var packageRoutes = require('./routes/aptCache/packageCount');
var graphRoutes = require('./routes/aptCache/logRateData');
var dataRateData = require('./routes/aptCache/dataRateData');
var packageAnalytics = require('./routes/aptCache/packageAnalytics');
var repRoutes = require('./routes/aptCache/repository');
var getInfo = require('./routes/aptCache/getInfo');
//end wave 2 code

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}

app.use(flash());
app.use(methodOverride());
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'secret',
  cookie:{
    login:false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/config', configRoute);
var initPassport = require('./passport-init');
initPassport(passport);
app.use('/', routes);
app.use('/auth', authenticate);
app.use('/json/userAgent', userAgent);
app.use('/json/logListing', logListing);
app.use('/json/trafficRate', trafficRate);

//wave 2 code
// app.use('/', mainRoutes);
app.use('/logRateData',graphRoutes);
app.use('/dataRateData',dataRateData);
app.use('/packageCount', packageRoutes);
app.use('/packageanalytics', packageAnalytics);
app.use('/repository/mode',repRoutes);
app.use('/getInfo',getInfo);
//end wave 2 code

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
