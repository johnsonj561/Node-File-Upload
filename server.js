// node dependencies
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

// config image upload options using multer
var multer = require('multer');
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
});

var appRoutes = require('./app/routes/api')(router, upload, fs);

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', appRoutes);

// singple page application
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

module.exports = app;
