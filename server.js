var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const urlencodedParser = bodyParser.urlencoded({extended: false});


app.get('/', function(req, res){
	var obj = '{}';
	res.render('weather');
})

app.post('/weather', urlencodedParser, function(req, res){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + req.body.city +'&cnt=7&APPID=1265e5f580e5897cea266165c23deb1c', false);
	xhr.send();
	var api = xhr.responseText;
	var obj = JSON.parse(api);
	var week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'San'];

	res.render('api', {week:week, api:obj});
})

app.listen(3000, function(){
	console.log('Serve is running');
});
