var request = require('request'); 
var CcdbUtil = require('./ccdbUtil');
var requestManager = {};


var apiURL = "http://ccdb.hemiola.com/characters/";
var simplifiedMandarinFilter = "filter=!simplifiable|simplified";
var filedsSelected = "&fields=string,kDefinition,kMandarin,kFrequency,kTotalStrokes,kTraditionalVariant";


requestManager.processHanziObject = function (hanziObject) {
	hanziObject.kMandarin = CcdbUtil.getSoundsPinyin(hanziObject.kMandarin);
	hanziObject.kDefinition = CcdbUtil.getDefinition(hanziObject.kDefinition);
	hanziObject.kTraditionalVariant = CcdbUtil.getTraditionalVariant(hanziObject.kTraditionalVariant);

	if(!hanziObject.kFrequency) 
		hanziObject.kFrequency = 5;

	return hanziObject;
}
requestManager.sortHanziObject = function(a,b) {

	if( parseInt(a.kFrequency) > parseInt(b.kFrequency) )
		return 1;
	else if ( parseInt(a.kFrequency) == parseInt(b.kFrequency) ) {
		if( parseInt( a.kTotalStrokes ) > parseInt( b.kTotalStrokes))
			return 1
		else if( parseInt( a.kTotalStrokes ) == parseInt( b.kTotalStrokes))
			return 0
		else
			return -1
	}
	else
		return -1;
}
requestManager.makeRequest = function(urlAPI,callback) {
	urlAPI = encodeURI(urlAPI);
	console.log(urlAPI);
	request(urlAPI
	,
	function(error,response,body) {
		body = JSON.parse(body)
		var arrayResponse = [];
		for(var id in body) {
			arrayResponse.push(requestManager.processHanziObject(body[id]));
		}
		callback(arrayResponse);
	})
	.on('response',function(response) {
	})
	.on('error',function(err) {
	});
};
// Method use to display JSON in a REST like manner
requestManager.jsonResponse = function(res,responseBody) {
	res.json(responseBody);
};

requestManager.htmlResponse = function(res,responseBody,title) {
	res.render('default', { title : title , hanziListObject : responseBody })

}

requestManager.getPinyin = function(parameters,callback) {
	let url = apiURL+'mandarin/'+parameters.pinyin + '?' + simplifiedMandarinFilter + filedsSelected;
	requestManager.makeRequest(url,callback);
}

requestManager.getHanzi = function(parameters,callback) {
	let url = apiURL+'string/'+parameters.hanzi+ '?' + simplifiedMandarinFilter + filedsSelected;
	requestManager.makeRequest(url,callback);
}

requestManager.getDefinition = function(parameters,callback) {
	let url = apiURL+'definition/'+parameters.definition+ '?' + simplifiedMandarinFilter + filedsSelected;
	requestManager.makeRequest(url,callback);
}
module.exports = requestManager;
