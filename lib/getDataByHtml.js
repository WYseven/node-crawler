let { getPagesHtml } = require('./utils.js');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
// 提取出页面中想要的数据
function transformDataByHtml(htmlBuffer){
  return new Promise((resolve) => {
    var html = htmlBuffer.toString("utf-8");
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
    resolve(data);
  })
}

// 分析数据中没有回答问题的，然后进到地址再去找回答问题的作者

let getAnswers = async (data) => {
  
  let promises = data.map((item)=>{
    // 如果未回答者为0，说明未回答，返回为空
    if(item.unanswer != 0){
      return getPagesHtml(item.url)
    }
    return [];
    
  });
  let results = await Promise.all(promises);

  results.map((html,index) => {
    if(html.length){
      let questionHtml = html.toString("utf-8");
      var DOM = new JSDOM(questionHtml);
      var document = DOM.window.document;
    
      let userNameAll = document.querySelectorAll('.repeatBox .userName');
    
      let usernameData = Array.from(userNameAll,(item)=>{
        return item.innerHTML.trim();
      });
  
      data[index].answers = usernameData;
    }else{
      data[index].answers = [];
    }
  });

  return data;
}

async function getDataByHtml(url){
  let htmlBuffer = await getPagesHtml(url);
  let htmlData = await transformDataByHtml(htmlBuffer);  
  return await getAnswers(htmlData);
}

async function getDataByMultiPages(urls){
  console.log(urls)
  let promises = urls.map((url) => {
		return getDataByHtml(url)
	});
  return await Promise.all(promises);
  
}

module.exports = {
  getDataByHtml,
  getDataByMultiPages
}
