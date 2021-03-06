var requestHandlers = require("../models/cars");

var handle = {};
handle["root"] = requestHandlers.root;
handle["ford"] = requestHandlers.ford;
handle["chevy"] = requestHandlers.chevy;


exports.handle = handle;