var bodyParser = require("body-parser");
var express = require("express");
var helmet = require("helmet");

var app = express();
var port = 3000;

app.use(helmet.hidePoweredBy({ setTo: "PHP/5.4.0" }));
app.use(bodyParser.json());

// a middleware function with no mount path.
// This code is executed for every request to
//the router.
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

function logOriginalUrl(req, res, next) {
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log("Request Type:", req.method);
  next();
}

var logStuff = [logOriginalUrl, logMethod];
app.get("/user/:id", logStuff, function (req, res, next) {
  res.send("User Info");
});

var birds = require("./routes/birds");
app.use("/birds", birds);

var health = require("./routes/health");
app.use("/health", health);
var cars = require("./routes/cars");
app.use("/cars", cars);

//   app.get('/user/:id', function (req, res, next) {
//     console.log('ID:', req.params.id);
//     next();
//   }, function (req, res, next) {
//     res.send('User Info');
//   });

//   // handler for the /user/:id path, which prints the user ID
//   app.get('/user/:id', function (req, res, next) {
//     res.send(req.params.id);
//   });

// Error handling middleware always takes 4 args.
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, function () {
  console.log("--------------------SERVER INITIALIZED--------------------");
});
