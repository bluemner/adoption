// =================================================
//
//    Name : server.js
//    Author : Brandon Bluemner
//    Description : Create the website & handlers
//
// =================================================
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var io = require('socket.io')(http);
var fs = require('fs');
var handlebars = require('handlebars');
var bodyParser = require('body-parser');
// =================================================

var HTTPS_PORT = Number(4443);
var HTTP_PORT =  Number( 8080);
var SERVER_NAME = '';
var SERVER_MESSAGE = '';
var SERVER_CODE = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// -------------------------------------------------
// OPTION FOR SSL 
// -------------------------------------------------
var options = {
  //ca: fs.readFileSync(''),
 // key: fs.readFileSync(''),
  //cert: fs.readFileSync('')
};
var elementDataCount = 1;
var elementData= 
   [
     {
        node_id: 0,
        node_element_id : 0,
        node_element_name : "some",
        node_element_value : 1,
      },{
        node_id: 0,
        node_element_id : 1,
        node_element_name : "two",
        node_element_value : 0.456,
      },
      
   ];
var dataCount = 2;
var data = { 
  nodes:[
     {
      node_id : 0,
      title : "Node 0",
      node_elements: elementData
    },
    {
      node_id : 1,
      title : "Node 1",
      node_elements: elementData
    },
     {
      node_id : 2,
      title : "Node 2",
      node_elements: []
    }
  ]    
};


// =================================================

// -------------------------------------------------
//  Server
// -------------------------------------------------
var getServerStatus = function () {
  return [{
    websitename: SERVER_NAME,
    code: SERVER_CODE,
    message: SERVER_MESSAGE
  },
    {
      websitename: "abs",
      code: 0,
      message: "test"
    }];
}

// -------------------------------------------------
//  Creates online json
// -------------------------------------------------
var onlineToJSON = function ( websitename, code, message )
{
  var s = '{\n' +
    '\t"websitename" : "' + websitename + '"' + ',\n' +
    '\t"code" : ' + code + ' ,\n' +
    '\t"message" : "' + message + '"\n' +
    '}\n';
  return s;
}

// -------------------------------------------------
//  WEBSITE : 
// -------------------------------------------------
var websitesToJSON = function ( websites ) 
{
  var s = '{\n' +
    '"websites":[\n';
  websites.forEach(function (website, index, array) {
    s += onlineToJSON(website.websitename, website.code, website.message);
    s += ',';
  })
  s = s.substring(0, s.length - 1);
  s += ']\n}\n'
  return s;
}

// -------------------------------------------------
// APPEND HTML TO FILE NAMES
// -------------------------------------------------
app.use(function ( req, res, next ) 
{
  if (req.path.indexOf('.') === -1) {
    var file = __dirname + '/www' + req.path + '.html';
    fs.exists(file, function (exists) {
      if (exists)
        req.url += '.html';
      next();
    });
  }
  else
    next();
});

// -------------------------------------------------
// SET FAVICON LOCATION
// -------------------------------------------------
app.get('/favicon.ico', function (request, responce) {
  responce.sendFile(__dirname + '/www/img/favicon.ico');
});

// -------------------------------------------------
//  SET ROOT WWW LOCATION
// -------------------------------------------------
app.use('/', express.static(__dirname + '/www'));

// -------------------------------------------------
//   
// -------------------------------------------------
app.get('/Status', function (request, responce) {
  responce.send(websitesToJSON(getServerStatus()));
});

// -------------------------------------------------
//  
// -------------------------------------------------
app.get('/online', function (request, responce) {
  responce.send(onlineToJSON(SERVER_NAME, SERVER_CODE,SERVER_MESSAGE));
});

// -------------------------------------------------
//  
// -------------------------------------------------
app.get('/data', function (request, responce) {
  responce.send(data);
});

app.get('/nodes', function(request, response){
  fs.readFile( __dirname + '/views/node.hbs', 'utf-8', function(error, source){
    if( error === undefined ){
      console.log("nodes:\n" +"\terror getting source\n\t"+ __dirname + '/views/_node.html');
      return;
    }
  
  var template = handlebars.compile(source);
  var html = template(data);
  //console.log(html);
  response.send(html);
});
});

// -------------------------------------------------
//  
// -------------------------------------------------
app.post('/addNode', function(request, response){
  
  console.log('Add node');
  data.nodes.push({        
      node_id :  ++dataCount,
      title : "Node " + ( ++dataCount ) ,
      node_elements: [{
        node_id: 0 ,
        node_element_id : 0,
        node_element_name : "foo",
        node_element_value : 3,
      },{
        node_id: 0 ,
        node_element_id : 1,
        node_element_name : "bar",
        node_element_value : 7,
      },]
    }
  );  
  response.send("ok");
});

// -------------------------------------------------
//  Add Node Elements 
// -------------------------------------------------
app.post('/addNodeElement', function(request, response){
      //console.log(request.params);
   var nodeElement = request.body;
   
   //console.log( nodeElement );
   for( var i  = 0; i < data.nodes.length; ++i  )
   {
     var node = data.nodes[i];
     if( node.node_id == nodeElement.node_id)
     {            
         
          node.node_elements.push({
              node_id: nodeElement.node_id ,           
              node_element_id :  ++elementDataCount,
              node_element_name : nodeElement.node_element_name,
              node_element_value : nodeElement.node_element_value
          });
          
          response.send({
            "code":"0",
            "message": "success"
            });
            
          return;
     }
   }
   
   response.send({
    "code":"-1",
    "message":"failure"
    });
        
});

// -------------------------------------------------
//  Add Node Elements 
// -------------------------------------------------
app.post('/removeNodeElement', function(request, response){
   
   var nodeElement = request.body;
   
    for( var i  = 0; i < data.nodes.length; ++i  )
   {
     var node = data.nodes[i];
     if( node.node_id == nodeElement.node_id)
     {            
         
          var elements = node.node_elements;
          
            //  node_id: nodeElement.node_id ,           
            //  node_element_id :  ++elementDataCount,
           //   node_element_name : nodeElement.node_element_name,
             // node_element_value : nodeElement.node_element_value
         
           for( var i  = 0; i < elements.length; ++i  )
            {
              
              
              if( elements[i].node_element_id == nodeElement.node_element_id)
              {            
                    console.log('Removed:'+elements[i].node_element_id );
                    elements.splice(i, 1);
                    response.send({
                      "code":"0",
                      "message": "success"
                      });
                      
                    return;
              }
            }
          response.send({
            "code":"0",
            "message": "success"
            });
            
          return;
     }
   }
   
   
  
   
   response.send({
    "code":"-1",
    "message":"failure"
    });
        
});
// -------------------------------------------------
//  Add Node Elements 
// -------------------------------------------------
app.post('/saveNodeElement', function(request, response){

   var nodeElement = request.body;
   
   
    for( var i  = 0; i < data.nodes.length; ++i  )
    {
        var node = data.nodes[i];
        if( node.node_id == nodeElement.node_id)
        {            
            
            var elements = node.node_elements;
                    
              for( var i  = 0; i < elements.length; ++i  )
              {                                
                if( elements[i].node_element_id == nodeElement.node_element_id)
                {            
                      console.log('Saved:'+elements[i].node_element_id );
                      elements[i].node_element_name = nodeElement.node_element_name;
                      elements[i].node_element_value = nodeElement.node_element_value;
                      response.send({
                        "code":"0",
                        "message": "success"
                        });
                        
                      return;
                }
              }
            response.send({
              "code":"0",
              "message": "success"
              });
              
            return;
        }
    }
      
   response.send({
    "code":"-1",
    "message":"failure"
    });
        
});
// -------------------------------------------------
//  Save All Nodes
// -------------------------------------------------
app.post('/saveAllNodes', function(request, response){
   console.log(request.params);   
   console.log( request.body );
   
   response.send(request.body);     
});

// -------------------------------------------------
//  Set The index file location
// -------------------------------------------------
app.get('/', function (request, responce) {
  responce.sendFile( __dirname + '/www/index.html');
});

// -------------------------------------------------
//   Handling wrong urls
// -------------------------------------------------
app.get("/*", function (req, res) {
  res.sendFile( __dirname + '/www/index.html');
  console.log("bad Url:" + req.url);
});

// -------------------------------------------------
//   Create Server NON-SSL
// -------------------------------------------------
http.createServer(app.handle.bind(app)).listen(HTTP_PORT, function () {
  console.log("Express server listening on port " + HTTP_PORT);
});

// -------------------------------------------------
//   Create Server SSL
// -------------------------------------------------
//https.createServer(options, app.handle.bind(app)).listen(HTTPS_PORT, function () {
//  console.log("Express server listening on port " + HTTPS_PORT);
//});