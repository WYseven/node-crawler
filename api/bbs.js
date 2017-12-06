const superagent = require('superagent')
const async  =require('async')
const cheerio = require('cheerio')
const buildInUrl = require('url')

let originUrl = `http://2017.miaov.com/question/show/index?cat=1&sub=new&page=`

let errorUrls = [];

// 请求页面
let fetchMethod = (url,callback) => {
	let fetchStart = new Date().getTime();
	superagent
		.get(url)
		.end((err,data) => {
			if(err){
				// 请求未成功
				errorUrls.push(err.response.request.url)
				return false;
			}
			let spendTime = new Date().getTime() - fetchStart;
			console.log('抓取:'+ data.request.url +'成功,耗时：'+ spendTime +'毫秒' );
			callback && callback(data.request.url,data.text);

		})
}

/*
	start 开始下标
	count 抓的数量
*/
let crawlBbsUrl = ({start,count,limit}) => {
	let urls = []
	for( var i = start; i < start + count; i++ ){
		urls.push(originUrl+i)
	}

	async.mapLimit(urls, limit, function (url,callback){
		
		fetchMethod(url,function (requestUrl,html){
			// 拿到页面中帖子的地址
			let page = buildInUrl.parse(url,true).query.page;
			let analysisStart = new Date().getTime()
			
			let d = analysisPage(html);
			// 增加字段，标明数据属于第几页
			d.forEach(function (item){
				item.page = page;
			})

			let analysisEnd = new Date().getTime() - analysisStart;

			console.log('解析成功,耗时：'+ analysisEnd +'毫秒' );
			callback(null,d);	
		})
	},function (error,data){
		console.log(data);
	})
}

crawlBbsUrl({
	start:1,
	count: 5,
	limit: 5
})

// 解析页面拿到帖子地址
function analysisPage(html){
	let d = [];
	const $ = cheerio.load(html,{decodeEntities: false});
	let re = /\d+/
	$('.listMain').each( (index,item) => {
		try {
			let items = $(item);
			let w3First = items.find('.w3').first()
			let w3Last = items.find('.w3').last()

			let firstTd = w3First.find('.dt')
			let firstDd = w3First.find('.dd')

			let lastTd = w3Last.find('.dt')
			let lastDd = w3Last.find('.dd')

			let title = items.find('a').attr('href')

			d.push({
				id: title.match(re)[0],
				title ,
				postTitle: items.find('.postTitle').html().trim(),
				postUser: items.find('.w2 .dt').html().trim(),
				postStartTime: items.find('.w2 .dd').html().trim(),
				clickNumber: firstTd.length ? firstTd.html().trim() : 0,
				replyNumber: firstDd.length ? firstDd.html().trim() : 0,
				lastReplyUser: lastTd.length ? lastTd.html().trim() : '',
				lastReplyTime: lastDd.length ? lastDd.html().trim() : 0
			})
		}catch(e){
			console.log(e);
		}
	})

	return d;
}



