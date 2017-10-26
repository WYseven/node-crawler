const express = require('express');
const router = express.Router();

let { getDataByHtml,getDataByMultiPages } = require('../lib/getBBSDataByHtml.js');
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
router.get("/get_bbs_data", (req,res) => {
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

module.exports = router;

