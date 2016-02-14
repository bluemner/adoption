var db = require('../model/dal')
/*
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
*/

module.exports =
{
      
   getNodeElements: function( result )
   {
     db.dbQuery('SELECT * FROM Node_Element', [''] ,function (error, queryResult) {
          if (error)
          {
          return result(error, undefined);
          }
          return result( error, queryResult);
          // console.log('Deleted ' + queryResult.affectedRows + ' rows');
      });    
   },
   getNodeElement : function (node , result)
   {
     db.dbQuery('SELECT * FROM Node_Element WHERE node_id = ?', [node.node_id] ,function (error, queryResult) {
          if (error)
          {
          return result(error, undefined);
          }
          return result( error, queryResult);
          // console.log('Deleted ' + queryResult.affectedRows + ' rows');
      });      
   },
   addNodeElement : function( nodeElement, result )
   {
    // var tempNodeElement = 
   //  {  node_id : nodeElement.node_id ,
     //   node_element_name : nodeElement.node_element_name,
     //   node_element_value : nodeElement.node_element_value
     //};
     db.dbQuery('INSERT INTO Node_Element SET node_id = ?, node_element_name = ?, node_element_value = ? ', [nodeElement.node_id,nodeElement.node_element_name, nodeElement.node_element_value] , function (error, queryResult) {
        if (error)
        {
        return result(error, undefined);
        }
        return result( false, queryResult);
      
      });
   },
   updateNodeElement : function( nodeElement, result )
   {
     var updateArgs = [nodeElement.node_element_name, nodeElement.node_element_value , nodeElement.node_element_id]
     db.dbQuery('UPDATE Node_Element SET node_element_name = ? , node_element_value = ? WHERE node_element_id = ?', updateArgs ,  function (error, queryResult) {
      if (error) 
      {
       return result(error, undefined);
      }
       return result( false, queryResult);
      // console.log('Deleted ' + queryResult.affectedRows + ' rows');
     });
   },
}