var express = require('express');
var app = express();

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);
require ("./assignment/app.js")(app);
console.log(process.env);

var port = 5000;

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || port));
app.listen(app.get('port'), app.get('ipaddress'));