/* Primary file for API */

// Dependencies 
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// start server 
const server = http.createServer(
    function(requestObj,responseObj){
        
        // get the url hit to the server
        const parsedUrl = url.parse(requestObj.url, true)
        
        const path = parsedUrl.pathname;
        const trimmedUrl = path.replace(/^\/+|\/+$/g, '')

        const method = requestObj.method.toLowerCase();

        const queryStringObj = parsedUrl.query;

        const headers = requestObj.headers;

        const decoder = new StringDecoder('utf-8')

        const buffer= ''

        requestObj.on('data', function(data){
            buffer = buffer + decoder.write(data);
        })
        // final response
        responseObj.end('Hello world');

        console.log("request received on the path -", trimmedUrl)
        console.log(" is of method - ", method)
        console.log(" and if having queryString", queryStringObj)
        console.log(" with headers")
    }
)

server.listen(3000, function(){
    console.log("Server is active on 3000");
})