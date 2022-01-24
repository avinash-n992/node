//console.log('Hello World');

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The server should listen to all requests with a string
var server = http.createServer(function(req,res){
    
    // Get the URL and parse 
    var parsedUrl = url.parse(req.url,true);
    
    // get path 
    var path = parsedUrl.pathname;
    var trimmedpath = path.replace(/^\/+|\/+$/g,'');

    // get the http method 
    var method = req.method.toLowerCase();

    // get the querystring 
    var queryStringObject = parsedUrl.query; 

    // get the headers
    var queryHeaders = req.headers;
    
    // get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });

    req.on('end',function(){
        buffer += decoder.end();

        // chose the handler this request should go to, if its not found it should go to Not Found handler
        var chosenHandler = typeof(router[trimmedpath] !== 'undefined' ? router[trimmedpath]: handlers.notFound);
        
        // construct the data obj to be sent to handler
        var data = {
            'trimmedPath' : trimmedpath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': queryHeaders,
            'payload': buffer
        };

        // router request to handler as the routes 
        chosenHandler(data, function(statusCode ,payload){
            // use the status code from callback or set it to default
            statusCode = typeof(statusCode) == 'number' ? statusCode: 200;

            // use the payload from callback or default to empty object
            payload = typeof(payload) =='object' ? payload: {};

            var payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);
        });

        console.log("tseet");
        console.log('Request path from API with method ',method,' has the body - ', buffer);
    });
    // send response
    //res.end("Hello World\n");

    // log path from request
    //console.log('Request path from trimmed path '+trimmedpath+ ' with this method '+ method+ ' has the parameters ',queryStringObject, ' and the headers are ',queryHeaders);

});

// Start the server & listen to port 3000
server.listen(3000,function(){
    console.log("Server is listening to port 3000")
});

// define handlers 
var handlers = {};

// sample handler 
handlers.sample = function(data,callback){
    // callback http satus code and payload object 
    callback(406,{'name':'sample handler'});
};

// not found handler 
handlers.notFound = function(data,callback){
    callback(404);
};

// define a request router 
var router = {
    'sample':handlers.sample
}