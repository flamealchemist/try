'use strict';
var createStore = require('fluxible/addons').createStore;

var AppStore = createStore({
	storeName: 'AppStore',
	handlers: {
		'CHANGE_GIF':'updateGif'
	},

	initialize: function(){
		console.log("store initialise\n");
		this.state = {
			gifs : JSON.parse(JSON.stringify({data:[]})),
			label : 'search any string'
		};
	},

	getGif: function(){
		console.log("store get\n");
		return this.state;
	},

	updateGif: function(payload){
		console.log("store update\n", payload);
		this.state.label = payload.label;
		this.state.gifs = payload.results;
		console.log(this.state.gifs);
		this.emitChange();
	},

	dehydrate: function(){
		console.log("store dehydrate\n");
		return {
			state : this.state
		};
	},

	rehydrate: function(state){
		console.log("store rehydrate\n");
		this.state = state.state;
	}
});

module.exports = AppStore;