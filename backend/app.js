const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const stravaRouter = require('./routes/strava');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  //'Accept': 'application/json, text/plain, */*',
  //'Content-Type': 'application/json'
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/strava", stravaRouter);

module.exports = app;
