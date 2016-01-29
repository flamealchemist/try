'use strict';
var search = require('./Actions/searchAction');
var random = require('./Actions/randomAction');
module.exports = {
	Homepage:{
		path: '/',
		method: 'get',
		handler: require('./components/components1'),
		action: require('./Actions/loadHome')
	},
	Search:{
		path: '/search',
		method: 'get',
		handler: require('./components/components1'),
		action: function(context, payload, done){
			context.executeAction(search, {url : payload.url}, done);
		}
	},
	Random:{
		path: '/random',
		method: 'get',
		handler: require('./components/RandomComponent'),
		action: function(context, payload, done){
			context.executeAction(random, {url : payload.url}, done);
		}
	}
};