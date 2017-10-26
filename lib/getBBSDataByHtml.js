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
    
    var data = [...listMain].map(function (node,index){
            let a = node.querySelector('a');
            let postTitle = node.querySelector('.postTitle');
            let w3 = node.querySelectorAll('.w3');
            let unanswerNode = w3[0].querySelector('.dd');
            let b = document.querySelector('.page b');
            let obj = {
              pageIndex:index,
              page: b && b.innerHTML.trim(),  // 页数
              url: (a && ('http://2017.miaov.com'+a.href)) || '',
              title:postTitle && postTitle.innerHTML.trim(),
              unanswer:unanswerNode && unanswerNode.innerHTML.trim()
            }
            return obj
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
  // 把多个地址转成Promise形式  30条并发一次
  /* 
    如果url超过10条，则分段并发处理
  */

  let promises = urls.map(function(url){
    return getDataByHtml(url)
  })
  
  let arr = [];
  let i = 0;
  while(promises.length){
    let result = await Promise.all(promises.splice(i,10))
    arr = [...result]
  }
  
  return arr;
}

module.exports = {
  getDataByHtml,
  getDataByMultiPages
}
