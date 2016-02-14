var db = require('../model/dal');
var _nodeElements = require('../model/node_element');
/*
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
*/

module.exports = {
  
   getNodes: function( result )
   {
      db.dbQuery('SELECT * FROM Node',[''], function (error, node) {
          if (error)
          {
          return result(error, undefined);
          }          
         
          // console.log('Deleted ' + queryResult.affectedRows + ' rows');
          _nodeElements.getNodeElements( function(error2, nodeElemnets){
              if (error)
              {
                  return result(error2, undefined);
              }     
          
              
            for( var j = 0; j < node.length; ++j )
            {
              node[j].node_elements = [] ;
            
              for ( var i = 0 ; i < nodeElemnets.length; ++i) 
                {
                   if( nodeElemnets[i].node_id === node[j].node_id )
                   {
                   
                     node[j].node_elements.push(nodeElemnets[i]);
                   }
                }
              }
           
               return result(undefined, node);
          });
            
          
      });
   },
   addNode: function( node, result )
   {
     console.log(node);
     db.dbQuery('INSERT INTO Node SET node_title = ?',[node.node_title],  function (error, queryResult) {
      if (error)
      {
       return result(error, undefined);
      }
       return result( undefined, queryResult);
      // console.log('Deleted ' + queryResult.affectedRows + ' rows');
   });
   },
   updateNode : function ( node , result)
   {
     db.dbQuery('UPDATE Node SET node_title = ? WHERE node_id = ?', [node.node_title, node.node_id],  function (error, queryResult) {
      if (error)
      {
       return result(error, undefined);
      }
       return result( undefined, queryResult);
      // console.log('Deleted ' + queryResult.affectedRows + ' rows');
     });
   },
   removeNode: function( node, result )
   {
      db.dbQuery('DELETE FROM employees WHERE id = ?', [node.node_id],  function (error, queryResult) {
      if (error)
      {
       return result(error, undefined);
      }
       return result( undefined, queryResult);
      // console.log('Deleted ' + queryResult.affectedRows + ' rows');
      });
   }
}

/*
db.dbTest();
db.dbQuery('SELECT 1 AS solution', function (error, result){
    console.log('The solution is: ', result[0].solution);
});
db.dbEnd();
db.dbQuery('SELECT 1 AS solution', function ( error, result ){
   
     
    if ( error)
    { 
      console.error('here');
      return;
    }
    else
    {   
           console.log('The solution is x: ', result[0].solution);
    }
    
});
*/
