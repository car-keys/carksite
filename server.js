var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    
    var pathname = url.parse(request.url, true).pathname;
    //console.log("Request for " + pathname + " received.");
    if(pathname == '/'){
        pathname = '/main.html';
    }
    //Deny requests for the server code
    if(path.extname(pathname) == '.js'){
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end();
        return;
    }
    //Grab the file and send it along, or 404 if not found
    //TODO use pipes or somthing https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            if(pathname == "/style.css"){
                response.writeHead(200, {'Content-Type': 'text/css'});
            }else if(path.extname(pathname) == '.jpg'){
                response.writeHead(200, {'Content-Type': 'image/jpeg'});
            }else{
                response.writeHead(200, {'Content-Type': 'text/html'});
            }
            response.write(data.toString());
        }
        response.end();
    });
}).listen(80);
