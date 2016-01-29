'use strict';
var React = require('react');
//var FluxibleMixin  = require('fluxible-addons-react/FluxibleMixin');
var AppStore = require('../Stores/AppStore');
var ConnectToStore = require('fluxible-addons-react/connectToStores');

var Result = React.createClass({

//	mixins: [ FluxibleMixin ],
	statics: {
		storeListener: [AppStore]
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

	componentWillUnmount: function(){
	},
	onChange: function(){
		if(this.isMounted())
			this.setState(this.getStateFromStore());
	},

	render: function(){

		var grid = this.state.gifs.data.map(function(gif, i ){
						  	return <Gif gif={gif} key={i}/>;
						}, this);
		console.log("In the result component");
			return(
				<div className="container result">
					<h2>{this.state.label}</h2>
					<div id="columns">
		
						{grid}
						
					</div>
					
				</div>
			);
	}

});

var Gif = React.createClass({
    render: function () {
        var p = this.props.gif;
        var user = this.props.gif.username;
        if(user == ""){
        	user = "Not Available";
        }

        return (
            <div className="panel-style">
           
                <img className="image" src={p.images.fixed_height.url}></img>
            
                <div className="user">Username: {user}</div>
                <div>
	                	<a href={p.source}><div className="links">Go to Source</div></a>
	                
	               		<a href={p.images.fixed_height.url}><div className="links">View Gif</div></a>
	             </div>
            </div>
        );
    }
});

module.exports = ConnectToStore(
	Result,
  [AppStore],
  function(context, props){
    var _temp = {
      AppStore: context.getStore(AppStore)
    };
    return  _temp;
  }
);