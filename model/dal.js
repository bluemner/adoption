// =================================================
//
//    Name : dal.js
//    Author : Brandon Bluemner
//    Description : Database access layer
//
// =================================================

var database_type = 'mysql';
var sql;

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
				break;
				
}


exports.saveNode = function ( node, event )
{
	
}

