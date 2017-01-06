var express = require('express');
var app = express();
var requestManager = require('./functions/requestManager')

var viewerRoutes = require('./viewerRoutes')
app.set('view engine', 'pug')
app.set('views', './templates')

app.use('/viewer', viewerRoutes)

app.get('/',function (req, res) {
	res
		.status(200)
		.send('HanziAPI by Théo ELIA');
});

app.get('/pinyin/:pinyin', function (req, res) {
	requestManager.getPinyin(req.params,function(data) {
		requestManager.jsonResponse(res,data);
	});
});

app.get('/definition/:definition/', function (req, res) {
	requestManager.getDefinition(req.params,function(data) {
		requestManager.jsonResponse(res,data);
	});
});

app.get('/hanzi/:hanzi/', function (req, res) {
	requestManager.getHanzi(req.params,function(data) {
		requestManager.jsonResponse(res,data);
	});
});

var server = app.listen(3000, function () {
  console.log('HanziAPI listening on port 3000!');
});

module.exports = server;