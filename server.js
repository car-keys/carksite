var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

http.createServer(function (request, response) {
    //Quit out if not GET request
    if (request.method !== 'GET') {
        request.statusCode = 501;
        request.setHeader('Content-Type', 'text/plain');
        return request.end('Method not implemented');
    }
    
    
    var pathname = url.parse(request.url, true).pathname;
    //console.log("Request for " + pathname + " received.");
    if(pathname == '/'){
        pathname = '/main.html';
    }
    //Deny requests for the server code
    if(pathname == 'server.js'){
        response.setHeader('Content-Type', 'text/plain');
        response.statusCode = 404;
        response.end('Not found');
        return;
    }
    console.log('requested ' + pathname);
    //Grab the file and send it along, or 404 if not found
    //TODO use pipes or somthing https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
    var type = mime[path.extname(pathname).slice(1)] || 'text/plain';
    var s = fs.createReadStream('.'+pathname);
    s.on('open', function () {
        response.setHeader('Content-Type', type);
        s.pipe(response);
    });
    s.on('error', function () {
        response.setHeader('Content-Type', 'text/plain');
        response.statusCode = 404;
        response.end('Not found');
    });
    
}).listen(80);
