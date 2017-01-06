var express = require('express')
var router = express.Router()
var requestManager = require('./functions/requestManager')

router.get('/pinyin/:pinyin', function (req, res) {
	var pinyin = req.params.pinyin;
	requestManager.getPinyin(req.params,function(data) {
		data = data.sort(requestManager.sortHanziObject)
		requestManager.htmlResponse(res,data,"Dictionnary of Hanzis for the pinyin " + pinyin);
	});
});

router.get('/hanzi/:hanzi', function (req, res) {
	var hanzi = req.params.hanzi;
	requestManager.getHanzi(req.params,function(data) {
		data = data.sort(requestManager.sortHanziObject)
		requestManager.htmlResponse(res,data,"Dictionnary entry for the Hanzi : " + hanzi);
	});
});

router.get('/definition/:definition', function (req, res) {
	var definition = req.params.definition;
	requestManager.getDefinition(req.params,function(data) {
		data = data.sort(requestManager.sortDefinitionObject)
		requestManager.htmlResponse(res,data,"Dictionnary entries with the meaning of \""+ definition + "\"");
	});
});

module.exports = router