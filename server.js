var http = require('http');

var messages = [{message: 'hello world'}];

var port = 8887;

var onRequest = function(req, res) {
    if (req.method === 'GET') {
        res.statusCode = 200;

        res.setHeader('Content-Type', 'application/json');

        // Allow any website to access this API
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        // Don’t allow scripts or iframes execution from domains we don't trust
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('Content-Security-Policy', "default-src 'self' devmountain.github.io");
        res.end(JSON.stringify(messages));
    } else if (req.method == 'POST') {
       var postData = '';
       req.on('data', function(chunk) {
           postData += chunk.toString();
        });    
        req.on('end', function() {
            console.log("Got POST data:");
            console.log(JSON.parse(postData));
            var msg = JSON.parse(postData.toString());
            messages.push(msg);
            res.writeHead(200, {
            'Connection': 'close',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            });
            res.end(JSON.stringify(messages));
       });
    } else if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.end();
    }
};

var server = http.createServer(onRequest).listen(port);

console.log('I\'m watching you...', port);


