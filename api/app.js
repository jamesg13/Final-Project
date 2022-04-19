var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var scopes = ['user-read-private', 'playlist-modify-private','playlist-read-private'],
state = 'some-state-of-my-choice',
showDialog = true,
responseType = 'token';
    
var spotifyApi = new SpotifyWebApi({
clientId: '5e6b0010b34447459153368afadff90b',
clientSecret: '72a9dbfd368a45509e7836165713434f',
redirectUri: 'http://localhost:8888/callback/'
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes,state,showDialog,responseType);
console.log(authorizeURL);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(req, res, next) {
  
  next();
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
