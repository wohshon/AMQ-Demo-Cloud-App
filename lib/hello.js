var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var $fh = require('fh-mbaas-api');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  hello.post('/', function(req, res) {
    var clientId = req.body && req.body.clientId ? req.body.clientId : '1234567890';

 
//=====
   $fh.service({
      "guid" : "of4572e7yng3mlo2ztcipcqy",
      "path": "/mqtt", //the path part of the url excluding the hostname - this will be added automatically
      "method": "POST",   //all other HTTP methods are supported as well. e.g. HEAD, DELETE, OPTIONS
      "params": {
         "clientId": clientId
 //        ,
//         "amqMsg": amqMsg
      }, //data to send to the server - same format for GET or POST
      "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
      "headers" : {
        // Custom headers to add to the request. These will be appended to the default headers.
      }      
    }, function(err, body, response) {
      if (err || !body) {
              console.log('got ======= ERROR');
      }
      res.json({msg: 'Got a message : ' + body.msg });       
    });

//=====  


  });


  hello.post('/connect', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var clientId = req.body && req.body.clientId ? req.body.clientId : '1234567890';
   // var amqMsg = req.body && req.body.hello ? req.body.hello : 'Hello';
 
//=====
   $fh.service({
      "guid" : "of4572e7yng3mlo2ztcipcqy",
      "path": "/mqtt/connect", //the path part of the url excluding the hostname - this will be added automatically
      "method": "POST",   //all other HTTP methods are supported as well. e.g. HEAD, DELETE, OPTIONS
      "params": {
         "clientId": clientId
 //        ,
//         "amqMsg": amqMsg
      }, //data to send to the server - same format for GET or POST
      "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
      "headers" : {
        // Custom headers to add to the request. These will be appended to the default headers.
      }      
    }, function(err, body, response) {
      if (err || !body) {
              console.log('got ======= ERROR');
      }
      res.json({msg: 'Client : ' + body.msg +' connected'});       
    });

//=====
    //res.json({msg: 'Client : ' + clientId +' connected'});

  });

  hello.post('/pub', function(req, res) {
    console.log("PUBLISH "+req.body);
    var clientId = req.body && req.body.clientId ? req.body.clientId : '1234567890';
    var amqMsg = req.body && req.body.hello ? req.body.hello : 'Hello';
     console.log("PUBLISH "+req.body.hello);

//=====
   $fh.service({
      "guid" : "of4572e7yng3mlo2ztcipcqy",
      "path": "/mqtt/pub", //the path part of the url excluding the hostname - this will be added automatically
      "method": "POST",   //all other HTTP methods are supported as well. e.g. HEAD, DELETE, OPTIONS
      "params": {
         "clientId": clientId,
         "amqMsg": amqMsg
      }, //data to send to the server - same format for GET or POST
      "timeout": 25000, // timeout value specified in milliseconds. Default: 60000 (60s)
      "headers" : {
        // Custom headers to add to the request. These will be appended to the default headers.
      }      
    }, function(err, body, response) {
      if (err || !body) {
              console.log('got ======= ERROR');
      }
      res.json({msg: 'Client : ' + body.msg +' published message'});       
    });

//=====
    //res.json({msg: 'Client : ' + clientId +' connected'});

  });



/*//connect method
  hello.connect=function(req, res) {
    
    console.log('connect '+req.body);
    res.json({msg: 'connect'});
  }
*/  

  return hello;
}

module.exports = helloRoute;

