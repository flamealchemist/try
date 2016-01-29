'use script'

var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var ProvideContext = require('fluxible-addons-react/provideContext');
var Comp = require('./components1');
var handleHistory = require('fluxible-router').handleHistory;


var Application = React.createClass({
	mixins : [FluxibleMixin],

	render: function(){
		var CurrentRoute = this.props.currentRoute;

		var Handler = CurrentRoute && CurrentRoute.handler;
		console.log("In the Application component");
		
		console.log(CurrentRoute, CurrentRoute.url );
		var content;
		if(!Handler){
			content = <div> Not Found </div>;
			console.log("In the if " + content + "\n");
		}
		else{
			console.log("Else");
			content = <Handler currentRoute={CurrentRoute}/>;
		}
	//	console.log(content);
		return content ;
	}
});

Application = handleHistory(Application);

Application = ProvideContext(Application);

module.exports = Application;