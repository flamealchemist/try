'use strict';
var http = require('http');
var body = '';
var giphyResponse;

module.exports ={
	name : 'service_list',

	read: function(req, resource, params, config, callback) {
		console.log("In the service", params.url, "\n");
		var url = params.url;
		body = '';
        http.get(url, function(res){
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var data;
                try{
                    data = JSON.parse(body);
                }
                catch(err){
                    data = JSON.parse(JSON.stringify({data:[]}));
                }
                giphyResponse = data;
                console.log(giphyResponse);
                callback(null, giphyResponse);
            });
        }).on('error', function(e){
              console.log("Got an error: ", e);
        });
    },

    create: function(req, resource, params, body, config, callback) {
        
    }
};