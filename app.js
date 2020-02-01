const axios = require('axios');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var startRoute = require('./routes/start');
var oinpRoute = require('./routes/oinp');
var eeRoute = require('./routes/express');

const URL1 =
  'https://www.ontario.ca/page/2019-ontario-immigrant-nominee-program-updates';
const URL2 =
  'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html';

let app = express();
dotenv.config();
var option = {
  useNewUrlParser: true
};

//view set up

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use('/', startRoute);
app.use('/', oinpRoute);
app.use('/', eeRoute);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//end of view set up
module.exports = app;
