var elementData = require('../model/node_element' );
	
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

module.exports = data;
module.exports = dataCount;	
