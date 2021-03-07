const fs = require("fs");

var schemas = require("./schemas.js");
var _ = require("lodash");
var Car = function (data) {
  this.data = this.sanitize(data);
};

Car.prototype.get = function (name) {
  return this.data[name];
};

Car.prototype.set = function (name, value) {
  this.data[name] = value;
};

Car.findById = function (id, callback) {
  fs.readFile(__dirname + "/" + "cars.json", "utf8", function (err, data) {
    console.log(data);
    if (err) return callback(err);
    callback(JSON.parse(data));
  });
};

Car.prototype.data = {};

Car.prototype.sanitize = function (data) {
  data = data || {};
  schema = schemas.car;
  return _.pick(_.defaults(data, schema), _.keys(schema));
};

exports.inventory = function (req, res) {
  fs.readFile(__dirname + "/" + "cars.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
};

module.exports = Car;
