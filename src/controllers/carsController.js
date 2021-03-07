var express = require("express");
var cars = require("../models/cars");

// Display list of all books.
exports.inventory_list = function (req, res) {
  //res.send(cars.inventory_list);
  cars.findById(4, function (data) {
    res.json(data);
  });
  //res.send("NOT IMPLEMENTED");
};
