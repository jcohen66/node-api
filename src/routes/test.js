var requestHandlers = require("../models/test");

var handle = {};
handle["test"] = requestHandlers.test;

exports.handle = handle;