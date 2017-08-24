const express = require('express');
const app = express();

// 引入接口文件
const apiRouter = require('./api/base.js');

// 连接数据库
require('./mongodb/connet.js');

app.use(express.static('public'))

app.get("/", (req,res) => {
	res.sendFile(__dirname+'/views/index.html');
});

app.use('/api',apiRouter);

app.listen(8888);

