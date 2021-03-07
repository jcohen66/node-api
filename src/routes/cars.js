var express = require("express");
var carsRouter = express.Router();

var controller = require("../controllers/carsController");

// middleware that is specific to this router
carsRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
carsRouter.get("/", function (req, res) {
  res.send("Cars home page");
});
// define the about route
carsRouter.get("/about", function (req, res) {
  res.send("About cars");
});
/** Check service status **/
carsRouter.get("/inventory", controller.inventory_list);

module.exports = carsRouter;
