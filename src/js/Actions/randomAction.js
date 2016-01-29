'use strict'

module.exports = function(context, payload, done){
	console.log("in the random action");
	var load = payload.url.split("=");
	console.log(payload.url);
	var query = load[1];
	var label = 'Random Gif with tag \"';
	for(var i =0; i<query.length ;i++){
		if(query[i] == '+'){
			label += ' ';
		}
		else{
			label += query[i];
		}
	}
	label+= '\":';
	var url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + query;
	console.log(label, url, query);

	context.service.read('service_list',{url : url}, {},function(err, results){
		if(err){
			console.log("--------error occurs\n");
			context.dispatch('CHANGE_GIF_RANDOM',{label: "Error Connecting" ,results:JSON.parse(JSON.stringify({data:[]}))});
			console.error(err);
			done(err);
			return;
		}
		console.log('dispatching CHANGE_GIF' , results);
		context.dispatch('CHANGE_GIF_RANDOM',{label: label ,results:results});
		done();
		return;
	});
}