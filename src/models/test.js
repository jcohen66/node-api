function test(req, res) {
    console.log('This is a test url.');
    return res.send('This is a test url.');
}

// enables this function to be callable from outside this file.
exports.test = test;