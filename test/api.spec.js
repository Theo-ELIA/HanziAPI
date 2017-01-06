const request = require('supertest');
const expect = require('chai').expect

var testHanziObject = function(res) {
	/*console.log(res.body)
	expect(res.body).to.be.a('array');
	expect(res.body).to.not.be.empty;
	for(var id in res.body) {
		expect(res.body[id]).to.be.a('Object');
		expect(res.body[id].kMandarin).to.be.a('array');
		expect(res.body[id].kDefinition).to.be.a('array');
		expect(res.body[id].string).to.be.a('string');
	}*/

}
describe('Test HanziAPI', function () {
	var server;
	beforeEach(function () {
		server = require('../server');
	});
	afterEach(function () {
		server.close();
	});
	it('responds to /', function testSlash(done) {
		request(server)
		.get('/')
		.expect(200, done);
	});
	it('responds to /pinyin/*', function testSlash(done) {
		request(server)
		.get('/pinyin/ba3')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/,"should return a JSON")
		.expect(200)
		.end(function (err,res) {
			testHanziObject(res);
			done();
		})

		;

	});
	it('responds to /definition/*', function testSlash(done) {
		request(server)
		.get('/definition/fire')
		.expect('Content-Type', /json/,"should return a JSON")
		.expect(200)
		.end(function (err,res) {
			testHanziObject(res);
			done();
		});
	});
	it('responds to /hanzi/*', function testSlash(done) {
		request(server)
		.get('/hanzi/马')
		.expect('Content-Type', /json/,"should return a JSON")
		.expect(200)
		.end(function (err,res) {
			testHanziObject(res);
			done();
		});
	});
	it('404 everything else', function testPath(done) {
		request(server)
		.get('/foo/bar')
		.expect(404, done);
	});
});
