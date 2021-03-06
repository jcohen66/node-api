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
        // Chop out top level url segment
        var n = str.indexOf("/");
        var resstr = str.substring(0, n);
        // Load routes for top level if they exist.
        var pkg_path = "./routes/" + resstr;
        console.log(pkg_path);
        var pkg = require(pkg_path);
        // Chop out endpoint path
        var func_path = str.substring(n + 1);
        console.log(func_path);
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

