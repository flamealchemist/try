'use strict';
var React = require('react');
var SearchBar = require('./searchBar');
var Result = require('./results');
var provideContext = require('fluxible-addons-react/provideContext');
var FluxibleMixin = require('fluxible').Mixin;
var NavLink = require('fluxible-router').NavLink;


var components1 = React.createClass({
	mixins: [ FluxibleMixin ],

	render: function(){
	console.log("this is first component\n");

		return (
				<div>
					<div className="header">
						<SearchBar currentRoute = {this.props.currentRoute}/>
					</div>
					<Result currentRoute={this.props.currentRoute}/>
				</div>

			) ;
	}

});
// module.exports = components1;

module.exports = components1;