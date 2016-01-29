'use strict';
var React = require('react');
//var Action = require('../Actions/searchAction');
var NavLink = require('fluxible-router').NavLink;
//var address = '/search?q=';

var searchBar = React.createClass({
	
	getInitialState: function(){
		var data = this.props.currentRoute.url.split("=");
		var val = '';
		var lin = '';
		if(data.length > 1){
			var str = data[1].split("+");
			for(var i=0;i<str.length;i++){
				val+=str[i];
				if(i < (str.length -1)){
					val+=' ';
				}
			}
			lin = data[1];
		}
	/*	if(data[0] != '/'){
			address = data[0];
		}*/
		return{
			value: val,
			query: lin,
			address: '/search?q='
		};
	},

	search: function(e){

	},

	componentDidMount: function(){

	},

	changed: function(e){
		this.setState({value: this.state.value , query : this.state.query, address: e.target.value});
	},

	handleChange: function(e){

		e.preventDefault();
		var inputValue = e.target.value.trim();

	//	console.log("before trim" + inputValue);
	  // inputValue.trim();

	//    console.log("after trim" + inputValue);
		var search = inputValue.split(" ");

	//	console.log("after split" ,search, search.length);
		var searchString = '';
		var len = search.length;
		for(var i=0 ; i < len ;i++){
			if(search[i] != ""){
				searchString += search[i];
				if(i < (len-1)) {
					searchString+='+';
				}
			}
		}

		console.log("after tokenise" + searchString);

		this.setState({value:e.target.value, query : searchString, address : this.state.address});
	//	console.log(url);
	},



	render: function(){
		console.log("In the Search Bar Component");
		return(
				<div className="searchBar">
					<div className="header">
						<div className="heading"><NavLink href="/">GIF SEARCH ENGINE</NavLink></div>
						<div>
							<input type="text" id="searchInput" value={this.state.value} onChange={this.handleChange} className="text"></input>
						</div>
						<div><select onChange={this.changed}><option value="/search?q=">Get All</option>
		  					 <option value="/random?q=">Get Random</option></select></div>
						<div className="center">
							<NavLink href={this.state.address+this.state.query}><input className="button" type="button" id="searchButton" value="    Search GIF    " onClick={this.search}>
							</input></NavLink>
						</div>
					</div>
				</div>
			);
	}

}) ;
module.exports = searchBar;