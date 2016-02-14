// =================================================
//
//    Name : dal.js
//    Author : Brandon Bluemner
//    Description : Database access layer
//
// =================================================

var database_type = 'mysql';
var sql;
var connection;


switch ( database_type )
{
	case 'db2': 
				sql = require('db2');
				break;
				
    case 'mssql': 
				sql = require('mssql');
				break;
				
	case 'mysql': 
				sql = require('mysql');
				connection = sql.createConnection({
					host : 'localhost',
					user : 'adoption',
					password : 'apple',
					database : 'adoption'
				});				
				
				break;
				
}

module.exports = {
 	db : function ( )
	{
		connection.connect(function(error){
			if ( error )
			{
				console.error("Error Connecting to database");
				return undefined;
			}
			console.log('Connected to database');
		});
		
		return true;
	},
	dbTest : function() 
		{			
			connection.query('SELECT 1 + 1 AS solution', function( error, rows, fields ) {
				if ( error ) 
				{ 					
					return undefined;
				}
				console.log('The solution is: ', rows[0].solution);
			});
		},
	 dbEnd : function()
		{
			connection.end();
		},
	 dbQuery : function (query, inserts , result) {
		query = sql.format(query, inserts);
		
		connection.query( query, function( error, rows ){
			 
			 if( error )
			 {
				console.error("Error :" + error);
				return result ( "" + error, undefined );
			
			 }
			 if(rows)
			 {
				 result ( false, rows );
			 }
			 else{
				 console.log('no rows...');
				  result ( false, false );
			 }
		      
			 
		 
		 });
		 
		
		 
	 }
}




