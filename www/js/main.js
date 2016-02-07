;
(function ($, main) {
    'use strict';
    $.extend(main, {
		
		init : function () {			
			var $content  = $('#content');

			$("#navigation").load("links.html");					
		    	
			//Events
			window.onhashchange = main.urlChange;
			main.urlChange ();
			
			$content.on('click', '#save-node', function()
			{
				main.saveNode ();
			});
			
			$content.on('click', '#add-node', function()
			{
				main.addNode ();
			});
			
			$content.on('click', '.add-node-element', function()
			{
				var node_id = $(this).attr('id');
					node_id = node_id.replace('add-element-','');
				main.addNodeElement( node_id ) ;
			});
			
			$content.on('click', '.save-node-element', function()
			{
				var temp = $(this).attr('id');					
				var	node_id = temp.split('-')[2];
				var	node_element_id = temp.split('-')[3];
				main.saveNodeElement( node_id,node_element_id ) ;
			});
			
			$content.on('click', '.remove-node-element', function()
			{
				var temp = $(this).attr('id');					
				var	node_id = temp.split('-')[2];
				var	node_element_id = temp.split('-')[3];
				main.removeNodeElement( node_id, node_element_id) ;
			});
			
			$content.on('click', '#cancle', function()
			{
				$("#content").load("/nodes");
			});
			
			$content.on('click','.collapse-button', function(){
				$(this).toggleClass('glyphicon glyphicon-plus');
				$(this).toggleClass('glyphicon glyphicon-minus');
		
			});
			
			$('#show-side-bar-icon').on('click', '#show-side-bar', function () {
				$('#side-bar').toggleClass('hidden');
				$('#hide-bar-show').toggleClass('hidden');
				$('#show-side-bar-icon').addClass('hidden');
				$content.removeClass('col-md-11 col-md-offset-0');
				$content.addClass('col-md-10 col-md-offset-2');
			});
			
			$('#main-wrapper').on('click', '#hide-side-bar', function () {
				$('#side-bar').toggleClass('hidden');				
				$('#show-side-bar-icon').removeClass('hidden');
				$content.removeClass('col-md-10 col-md-offset-2');
				$content.addClass('col-md-11 col-md-offset-0');
			});
		
			
		},
		urlChange : function () {
			/*	
				url: http://jsfiddle.net/nchaves/vMrjs/2/
				//window.location:
				window.location.host        // fiddle.jshell.net (includes port if there is one[1])
				window.location.hostname    // fiddle.jshell.net
				window.location.hash        // 
				window.location.href        // http://fiddle.jshell.net/nchaves/vMrjs/2/show/
				window.location.pathname    // /nchaves/vMrjs/2/show/
				window.location.port        // (port if there is one[1])
				window.location.protocol    // http:
				window.location.search      // 
				
				var el = document.createElement('a');
				el.href ="http://www.somedomain.com/account/search?filter=a#top";
				el.host        // www.somedomain.com (includes port if there is one[1])
				el.hostname    // www.somedomain.com
				el.hash        // #top
				el.href        // http://www.somedomain.com/account/search?filter=a#top
				el.pathname    // /account/search
				el.port        // (port if there is one[1])
				el.protocol    // http:
				el.search      // ?filter=a
			*/
			var $context = $("#content"); 
			switch ( window.location.hash ) {
				
				case '#About':
					$context.load("/nodes");
					break;
				case '#Home':					
					$context.load("/nodes");
					$("#Dashboard").addClass("active").siblings().removeClass('active');					
					break;
				case '#a':
					$context.load("/nodes");
					$("#Export").addClass("active").siblings().removeClass('active');
					
					break;
				case '#Report':
					$context.load("/nodes");
					$("#Reports").addClass("active").siblings().removeClass('active');
					break;
				case '#Analytics':
					$context.load("/nodes");
					$("#Analytics").addClass("active").siblings().removeClass('active');
					break;				
				default:
					$context.load("/nodes");				
					break;
			}		
			
		},		
		saveNode : function ()
		{
			
		},
		addNode : function()
		{
			console.log("addNode");
			var url = 'http://'+ window.location.host + '/addNode';
			console.log(url);
			$.ajax({
				type: "POST",
				url: url,
				data: {'addnode':'node' } ,
				success: function(result){					
					$("#content").load("/nodes");
				}
			});
		},
		addNodeElement : function( node_id )
		{
			console.log( node_id );
			var node_element_name = $("#add-node-element-name-" + node_id).val();
			var node_element_value = $("#add-node-element-value-" + node_id).val();
			var data = {
					   "node_id" : node_id,
				       "node_element_name" : node_element_name,
					   "node_element_value" : node_element_value
				       };
			var url = 'http://'+ window.location.host + '/addNodeElement';
			console.log(url);
			$.ajax({
				type: "POST",
				url: url,
				data: data ,
				success: function(result){					
					$("#content").load("/nodes");
				}
			});
		},
		removeNodeElement : function(node_id, node_element_id )
		{
			console.log( node_element_id );
			var node_element_name = $("#name-" + node_element_id).val();
			var node_element_value = $("#value-" + node_element_id).val();
			var data = {
					   "node_id" : node_id,
					   "node_element_id" : node_element_id,
				       "node_element_name" : node_element_name,
					   "node_element_value" : node_element_value
				       };
			var url = 'http://'+ window.location.host + '/removeNodeElement';
			console.log(url);
			$.ajax({
				type: "POST",
				url: url,
				data: data ,
				success: function(result){					
					$("#content").load("/nodes");
				}
			});
			
		},
		saveNodeElement : function ( node_id, node_element_id )
		{
			console.log( node_element_id );
			var node_element_name = $("#name-" + node_element_id).val();
			var node_element_value = $("#value-" + node_element_id).val();
			var data = {
					   "node_id" : node_id,
					   "node_element_id" : node_element_id,
				       "node_element_name" : node_element_name,
					   "node_element_value" : node_element_value
				       };
			var url = 'http://'+ window.location.host + '/saveNodeElement';
			console.log(url);
			$.ajax({
				type: "POST",
				url: url,
				data: data ,
				success: function(result){					
					$("#content").load("/nodes");
				}
			});
		}
		
			
}); //extend
})(window.jQuery, window.main || (window.main = {}));