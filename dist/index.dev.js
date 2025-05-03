"use strict";

require('dotenv').config();

var express = require('express');

var cookieParser = require('cookie-parser');

var session = require('express-session');

var methodOverride = require('method-override');

var flash = require('express-flash');

var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT;

var database = require('./config/database');

var route = require('./routes/client/index.route');

var routeAdmin = require('./routes/admin/index.route');

var PATH = require('./config/system');

database.connect();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(cookieParser('SAHHSKSH'));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
app.locals.path_url = PATH.ADMIN; // tạo biến toàn cục cho tất cả các view 

route(app);
routeAdmin(app);
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});