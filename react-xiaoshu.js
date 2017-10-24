
var jsdom = require('jsdom');
var fs = require('fs');

const { JSDOM } = jsdom;
let { getPagesHtml } = require('./lib/utils.js');


let testUrl = 'http://huziketang.com/books/react/';

function getUrl(url){
  return function () {
    return getPagesHtml(url)
  }
}

getPagesHtml(testUrl).then((data) => {
  let questionHtml = data.toString("utf-8");
  var DOM = new JSDOM(questionHtml);
  var document = DOM.window.document;

  let allA = document.querySelectorAll('.table-of-content a');
  let allSpan = document.querySelectorAll('.table-of-content span');
  let arr = [];
  let obj = {};
  [...allA].forEach(function(ele,index){
    let hrefs = 'http://huziketang.com'+ele.href;
    arr.push(getUrl(hrefs));
    obj[index] = allSpan[index].innerHTML.trim()+"-"+ele.innerHTML.trim();
  })

  async function f() {
    const textPromises = arr.map(async (item,index) => {
      const response = await item();
      fs.writeFileSync('./react-xiaoshu2/'+obj[index]+'.html',response+'<link rel="stylesheet" href="http://huziketang.com/books/react/assets/css/main.css">')

      return response.toString();
    });
  
  }

  f()

})
