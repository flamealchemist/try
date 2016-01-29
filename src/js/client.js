'use strict';
var ReactDom = require('react-dom');
var React = require('react');
var app = require('./App');
var createElementWithContext = require('fluxible-addons-react/createElementWithContext');

window.React = React;

var dehydrated = window.App;

app.rehydrate(dehydrated, function(err, context){
	if(err){
		throw err;
	}

	window.context = context;
	var mountNode = document.getElementById('app');
	var component = app.getComponent();
	console.log(component);

	component({context: context.getComponentContext()})

	ReactDom.render(
		createElementWithContext(context),
		mountNode, 
		function(){
			console.log('Client Loaded');
		}
	);
});