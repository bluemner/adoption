var fs = require('fs');
var handlebars = require('handlebars');
module.exports.controller = function(app) {

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
}