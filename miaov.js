
let { getDataByHtml,getDataByMultiPages } = require('./lib/getDataByHtml.js');


let testUrl = 'http://2017.miaov.com/question/show/index?cat=1&sub=new&page=';

let getRequestUrl = (pages) => {
	let urls = [];
	for(let i = 0; i < pages; i++){
		urls.push(testUrl+(i+1));
	}
	return urls;
}

var express = require('express');
var app = express();

app.use(express.static('public'))

app.get("/", (req,res) => {
	res.sendFile(__dirname+'/views/index.html');
});

app.get("/miaovdata", (req,res) => {
	let {pages} = req.query;

	let urls = getRequestUrl(pages);
	
	getDataByMultiPages(urls)
	.then((data)=>{
		console.log(data);
		res.send(data.reverse());
	})
});

app.listen(8888);

