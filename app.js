'use strict';
const express = require('express');
const app = express();
const request = require('request');
app.set('view engine', 'ejs');

//set port to env or 3000
app.set('port', process.env.PORT || 3000);
const port = app.get('port');

app.get('/', (req,res,next) => {
	res.render('search')
});

app.get('/results', (req, res, next) => {
	let query = req.query.search;
	// console.log('"'+ query + '"');
	let url;
	if (query != ''){
		 url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
	}
	else {
		 url = 'http://www.omdbapi.com/?s=' + 'empty' + '&apikey=thewdb';
	}
	request(url, (error, response , body) => {
		if(!error && response.statusCode == 200){
			let data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});

});

app.get('*', (req, res, next) => {
	res.render('404');
})

//start server
app.listen(port, () => {
	console.log('Server running on port: ', port);
})