var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
    
    var pathname = url.parse(request.url, true).pathname;
    //console.log("Request for " + pathname + " received.");
    if(pathname == '/'){
        pathname = '/main.html';
    }
    
    
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            if(pathname == "/style.css"){
                response.writeHead(200, {'Content-Type': 'text/css'});
                
            }else{
                response.writeHead(200, {'Content-Type': 'text/html'});
            }
            response.write(data.toString());
        }
        response.end();
    });
}).listen(80);
