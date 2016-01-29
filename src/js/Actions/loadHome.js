'use strict';

module.exports = function(context, payload, done){
	console.log ("in the load home\n");
	var url = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
	
	context.service.read('service_list',{url : url},{}, function(err, results){

		if(err){
			console.error(err);
			context.dispatch('CHANGE_GIF',{label: "Error Connecting" ,results:JSON.parse(JSON.stringify({data:[]}))});
			done(err);
			return;
		}
		console.log("Dispatching CHANGE_GIF: ");
		context.dispatch('CHANGE_GIF',{label: "Trending GIFs :" ,results:results});
		done();
		return;
	});

};