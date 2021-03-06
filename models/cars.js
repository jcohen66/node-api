function ford(req, res) {
    msg = 'Fords are ok.';
    console.log(msg);
    return res.send(msg);
}

function chevy(req, res) {
    var msg = "Chevy's are awesome!";
    console.log(msg);
    return res.send(msg);
}

// enables this function to be callable from outside this file.
exports.ford = ford;
exports.chevy = chevy;