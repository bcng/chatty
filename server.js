var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

///////////////// MIDDLEWARE

//any request that comes in, look at what comes in if it is JSON convert the req to req.body
app.use(bodyParser.json());
app.use('/', cors());
app.use(express.static(__dirname + '/public'));

var messages = [{message: 'hello world'}];

app.get('/', function(req, res) {
    res.send(JSON.stringify(messages));
});

app.post('/', function(req, res) {
    var newMessage = req.body;
    messages.push(newMessage);
    res.send(messages);
});

app.put('/api/person/:id', function(req, res){
    var name = req.params.id;
    res.send("your id is " + name);
});

var port = 8887;

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on port: ' + port);
    }

});


// Example of a body we're getting
// {
//     "message":"we are winners"
// }



// var http = require('http');

// //this is your resource
// var messages = [{message: 'hello world'}];

// var port = 8887;


// var app = require('./app').create();

// var onRequest = function(req, res) {

//     //code for GET method
//     if (req.method === 'GET') {
//         res.statusCode = 200;

//         res.setHeader('Content-Type', 'application/json');

//         // Allow any website to access this API
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
//         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

//         // Don’t allow scripts or iframes execution from domains we don't trust
//         res.setHeader('X-XSS-Protection', '1; mode=block');
//         res.setHeader('X-Frame-Options', 'SAMEORIGIN');
//         res.setHeader('Content-Security-Policy', "default-src 'self' devmountain.github.io");
//         res.end(JSON.stringify(messages));

//     //code for POST method
//     } else if (req.method == 'POST') {
//        var postData = '';
//        //this is just how the web sends data over the web; use the toString method on the data object to store it into vanilla JS 
//        req.on('data', function(chunk) {
//            var chunkie = toString(chunk);
//            console.log(chunkie);
//            postData += chunk.toString();
//         });    
//         req.on('end', function() {
//             console.log("Got POST data:");
//             console.log(JSON.parse(postData));
//             var msg = JSON.parse(postData.toString());
//             messages.push(msg);
//             res.writeHead(200, {
//             'Connection': 'close',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
//             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
//             });
//             res.end(JSON.stringify(messages));
//        });


//     } else if (req.method === 'OPTIONS') {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
//         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//         res.end();
//     }
// };

// var server = http.createServer(onRequest).listen(port);

// console.log('I\'m watching you...', server.address());
