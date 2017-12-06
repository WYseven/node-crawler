const express = require('express');
const app = express();

// 设置代理请求的接口

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// 引入接口文件
const apiRouter = require('./api/urlAPi.js');
const usersRouter = require('./api/userApi.js');

// 连接数据库
require('./mongodb/connet.js');

require('./mongodb/usersSchema.js')

app.use(express.static('public'))

app.get("/", (req,res) => {
	// 测试重定向
	res.setHeader('Location', 'http://2017.miaov.com/v_show/2006');
	res.status(302);
	res.end();
	//res.sendFile(__dirname+'/views/index.html');
});

app.use('/api',apiRouter);
app.use('/user',usersRouter);

// 扫描bbs社区帖子接口
const getBBSRouter = require('./api/get-bbs-data.js');
app.use('/bbs',getBBSRouter);

app.listen(8888);

