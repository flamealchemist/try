'use strict';
var React = require('react');
//var Comp = require('./components/components1.js');
var Fluxible =  require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var RouteStore = require('fluxible-router').RouteStore;
var routes = require('./routes');


var app = new Fluxible({
	component: React.createFactory(require('./components/Application'))
});

app.plug(fetchrPlugin({ 
	xhrPath: "/api",
	xhrTimeout: 5000
}));




const AppRouteStore = RouteStore.withStaticRoutes(routes);

app.registerStore(AppRouteStore);

app.registerStore(require('./Stores/AppStore'));

app.registerStore(require('./Stores/RandomStore'));

module.exports = app;

/*
React.render(
	<Comp />,document.getElementById('content')
);*/