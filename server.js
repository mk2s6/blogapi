//Genral server packages
const express = require('express');
const app = express();

//General parser packages
const path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');

const hbs = require('express-hbs');

const index = require('./routes/router');
const fs = require('fs');

require('dotenv').config();


//setting up directores
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/dist'));

//setting up parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//setting up view engine 
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('views', path.join(__dirname , '/views'));
app.set('view engine', '.hbs');


//setting server and listeing port
const port = process.env.SERVER_PORT || 4200;
app.listen(port, function (req, res) {
	console.log('Server listnening at ' + port);
});

// app.use(function (req, res, next) {
// 	console.log(req);
// 	next();
// });

//Appling routes
app.use(index);

//Error Handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err)
});


