var express = require('express');
var app = express();
var request = require('superagent'); 

var apiURL = "http://ccdb.hemiola.com/characters/"
var simplifiedMandarinFilter = "filter=!simplifiable|simplified"

app.get('/pinyin/:pinyin', function (req, res) {
	let url = apiURL+'mandarin/'+req.params.pinyin + '?' + simplifiedMandarinFilter +"&fields=string,kDefinition,kMandarin";
	console.log(url)
	request
		.get(url)
		.set('Accept', 'application/json')
		.then(function(response){
			var arrayResponse = [];
			for(var id in response.body) {
				arrayResponse.push(response.body[id]);
			}
			res.json(arrayResponse);
		})
		.catch(function(error) {
			console.error(error);
		});
});

app.get('/definition/:definition/', function (req, res) {
	let url = apiURL+'definition/'+req.params.definition+ '?' + simplifiedMandarinFilter +"&fields=string,kDefinition,kMandarin";
	console.log(url)
	request
		.get(url)
		.set('Accept', 'application/json')
		.then(function(response){
			var arrayResponse = [];
			for(var id in response.body) {
				arrayResponse.push(response.body[id].string);
			}
			res.json(arrayResponse);
		})
		.catch(function(error) {
			console.error(error);
		});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
