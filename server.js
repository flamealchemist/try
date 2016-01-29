'use strict';

require('babel-register');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var serialise = require('serialize-javascript');
var React = require('react');
var ReactDomServer = require('react-dom/server');
var app = require('./src/js/App');
var navigateAction = require('fluxible-router').navigateAction;
var Comp = React.createFactory(require('./src/js/components/htmlComponent'));

var server = express();
server.use(bodyparser.json());

server.use('/v2/assets', express.static(path.join(__dirname, './', 'dest')));

var fetchrPlugin = app.getPlugin('FetchrPlugin');

fetchrPlugin.registerService(require('./src/js/server/service.js'));

server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use( function(req,res){
	var context = app.createContext({
		req: req,
		xhrContext:{
			lang: 'en-US',
	        _csrf: 'a3fc2d'
		}
	});
	console.log("context created");

	// var actionContext = context.getActionContext();
	// console.log("actionContext created");

	context.executeAction(
		navigateAction,
		{ url : req.url},
		function (err){
			if(err){
				res.status('500');
				res.send("five hundo. sad panda.");
				console.log(err + " " + req.url);

				return;
			}

			var exposed = 'window.App=' + serialise(app.dehydrate(context)) + ';';

			//console.log("Exposed state " + exposed + "\n");

        	var Component = app.getComponent();


        	console.log("Component is "+ Component + " " + context.getComponentContext() +"\n");


        	var html = ReactDomServer.renderToStaticMarkup(
                Comp({ context: context.getComponentContext(), 
                	state: exposed , 
                	markup : ReactDomServer.renderToString(Component({context : context.getComponentContext()}))})
            );

        	res.send(html);
		});

});

var port = 8000;
server.listen(port,function(){
	console.log("server is running" + port + "\n" );
});