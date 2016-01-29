'use strict';

module.exports = function(context , payload, done){
	console.log("in the search");
	var load = payload.url.split("=");
	console.log(payload.url);
	var query = load[1];
	var label = 'Showing results for \"';
	for(var i =0; i<query.length ;i++){
		if(query[i] == '+'){
			label += ' ';
		}
		else{
			label += query[i];
		}
	}
	label+= '\":';
	var url = 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC';
	console.log(url);
	context.service.read('service_list',{url : url},{},function(err, results){
		if(err){
			context.dispatch('CHANGE_GIF',{label: "Error Connecting" ,results:JSON.parse(JSON.stringify({data:[]}))});
			console.error(err);
			done(err);
			return;
		}
		console.log('dispatching CHANGE_GIF' , results);
		context.dispatch('CHANGE_GIF',{label: label ,results:results});
		done();
		return;
	});
} 