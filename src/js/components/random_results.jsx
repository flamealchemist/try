'use strict';
var React = require('react');
//var FluxibleMixin  = require('fluxible-addons-react/FluxibleMixin');
var RandomStore = require('../Stores/RandomStore');
var ConnectToStore = require('fluxible-addons-react/connectToStores');

var randomResult = React.createClass({

//	mixins: [ FluxibleMixin ],
	statics: {
		storeListener: [RandomStore]
	},

	getInitialState: function(){
		var state = this.getStateFromStore();
		console.log("result initialize", state);
		return state;
	},

	getStateFromStore: function(){

		return this.props.AppStore.getGif();
	},

	componentDidMount: function(){
		this.props.AppStore.addChangeListener(this.onChange);
	},

	onChange: function(){
		if(this.isMounted())
			this.setState(this.getStateFromStore());
	},

	render: function(){
		console.log("In the result component");
		return(
			<div className="container result">
				<h2>{this.state.label}</h2>
				<div data-columns="" id="columns">
					<div className="panel panel-style">
		            	<div>
		                	<img src={this.state.gifs.data.fixed_width_downsampled_url}></img>
		                </div>
	              	    <div className="user">Username: {this.state.gifs.data.username}</div>
		                <div>
			                	<a href={this.state.gifs.data.source}><div className="links">Go to Source</div></a>
			                
			               		<a href={this.state.gifs.data.image_url}><div className="links">View Gif</div></a>
			             </div>
					</div>
				</div>
			</div>
			);
	}

});

module.exports = ConnectToStore(
	randomResult,
  [RandomStore],
  function(context, props){
    var _temp = {
      AppStore: context.getStore(RandomStore)
    };
    return  _temp;
  }
);