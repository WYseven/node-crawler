const request = require('request')

let url = 'https://s.click.taobao.com/t?e=m%3D2%26s%3DFBSJ7SXHG9wcQipKwQzePOeEDrYVVa64LKpWJ%2Bin0XLjf2vlNIV67tlmXN32iC8xahEP0ZrOLIpL9MIL63peI1ySRq1aYhdaEqhT2GDquknTMHngBpkL8nH1VWZTL3lKO3XKpf4bZ4DX7Y%2B2YY%2Bk5piELBojkXNoxg5p7bh%2BFbQ%3D&pvid=21_221.221.150.206_915_1511778100266'
//let url = 'https://s.click.taobao.com/t'

request.get(url,function (err,response,body){
	console.log(err);
	console.log(response.body)
})