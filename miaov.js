const express = require('express');
const app = express();

// 引入接口文件
const apiRouter = require('./api/urlAPi.js');
const usersRouter = require('./api/userApi.js');

// 连接数据库
require('./mongodb/connet.js');

require('./mongodb/usersSchema.js')

app.use(express.static('public'))

app.get("/", (req,res) => {
	res.sendFile(__dirname+'/views/index.html');
});

app.use('/api',apiRouter);
app.use('/user',usersRouter);

// 扫描bbs社区帖子接口
const getBBSRouter = require('./api/get-bbs-data.js');
app.use('/bbs',getBBSRouter);

app.listen(8888);

