/*
 * Primary file for API
 *
 */

 // Dependencies 
var server = require('./lib/server');
var workers = require('./lib/workers');
const { worker } = require('cluster');

var app = {};

app.init = function(){
  // start the server 
  server.init();

  //start the workers
  workers.init(); 
}

app.init();

//export app 
module.exports = app;
