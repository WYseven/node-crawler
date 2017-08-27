const express = require('express');
const router = express.Router();

let { getDataByHtml,getDataByMultiPages } = require('../lib/getDataByHtml.js');
let { urlObj,urlDataModel } = require('../mongodb/schema.js');

// 测试地址
let testUrl = 'http://2017.miaov.com/question/show/index?cat=1&sub=new&page=';

// 根据请求数，得到请求页的地址
let getRequestUrl = (pages) => {
	let urls = [];
	for(let i = 0; i < pages; i++){
		urls.push(testUrl+(i+1));
	}
	return urls;
}
// 抓取指定页数的数据
router.get("/miaovdata", (req,res) => {
	let {pages} = req.query;

	let urls = getRequestUrl(pages);
	getDataByMultiPages(urls)
	.then((data)=>{
		// 存在数据库中
		// 给每一种数据标记为未回答
		urlObj.modelSave(data)
		.then(()=>{
			res.send(data);
		})
	})
});

// 分配给对应的人
router.get("/allot", (req,res) => {
	let {shareUser,id} = req.query;
	// 通过id更新
	let a = urlDataModel.findByIdAndUpdate(id,{allotName:shareUser});
	a.then((data) =>{
		res.send('ok');
	});
});

// 标记为已回答或未回答
/* router.get("/flag", (req,res) => {
	let {shareUser,id} = req.query;
	// 通过id更新
	let a = urlDataModel.findByIdAndUpdate(id,{flagAnswer:shareUser});
	a.then((data) =>{
		res.send('ok');
	});
}); */

module.exports = router;

