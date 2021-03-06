var bodyParser = require('body-parser');
var express = require('express');
var helmet = require('helmet');

var app = express();
var port = 3000;

app.use(helmet.hidePoweredBy({setTo: 'PHP/5.4.0'}));
app.use(bodyParser.json());

app.use(function(req, res) {
    var str = req.originalUrl;
    console.log(str);
    try {
        // Strip off leading '/'.
        str = str.substring(1);
        segments = str.split("/");
        // Load routes for top level if they exist.
        var pkg_path = "./routes/" + segments[0];
        var pkg = require(pkg_path);
        // Chop out endpoint path
        var func_path = "root"; 
        if(segments.length > 1) {
            func_path = segments[1];
        }
    } catch(e) {
        // They dont exist.
        console.log(e);
        return res.send({'status': 400, 'message': { 'path': 'Invalid Request Path - 1'} });
    }
    // Set up handlers for endpoints.
    if (pkg && typeof pkg.handle[func_path] === 'function')
        pkg.handle[func_path](req, res);
    else { 
        // Complain if there are no handlers for the functions.
        return res.send({ 'status': 400, 'message': { 'path': 'Invalid Request Path - 2'}});
    }
});

app.listen(port, function() {
    console.log('--------------------SERVER INITIALIZED--------------------');
});

