
var jsdom = require('jsdom');

const { JSDOM } = jsdom;
let { getUrlData } = require('./lib/utils.js');


let testUrl = 'http://2017.miaov.com/question/show/index?cat=1&sub=new&page=3';

var express = require('express');
var app = express();

app.use(express.static('public'))

app.get("/", (req,res) => {
	res.sendFile(__dirname+'/views/index.html');
});

app.get("/miaovdata", (req,res) => {
	getDate((data)=>{
		res.send(data)
	},(error)=>{
		res.send(error)
	})
});

app.listen(8888)

function getDate(success,error){
	getNewsData(testUrl,function(data){
		
		data.map((item) => {
			getUrlData(item.url,function(arr){
				let questionHtml = arr.toString("utf-8");
				var DOM = new JSDOM(questionHtml);
				var document = DOM.window.document;
			
				let userNameAll = document.querySelectorAll('.repeatBox .userName');
			
				let usernameData = Array.from(userNameAll,(item)=>{
					return item.innerHTML.trim();
				});

				item.userNams = usernameData;
			})
		})
		success(data)
	},error)
}


function getNewsData(testUrl,success,error){
	getUrlData(testUrl,function (arr){
		
		var html = arr.toString("utf-8");
		var DOM = new JSDOM(html);
		var document = DOM.window.document;

		var listMain = document.querySelectorAll(".listMain");

		var data = Array.from(listMain).map(function (node){
						var a = node.querySelector('a');
						var postTitle = node.querySelector('.postTitle');
						var w3 = node.querySelector('.w3 .dd');
						return {
							url:'http://2017.miaov.com'+a.href,
							title:postTitle.innerHTML.trim(),
							unanswer:w3.innerHTML.trim()
						}
				});	
			success(data)
	},error);
}


