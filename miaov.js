const express = require('express');
const app = express();

// 引入接口文件
const apiRouter = require('./api/urlAPi.js');
const testRouter = require('./api/base.js');
const usersRouter = require('./api/userApi.js');

// 连接数据库
require('./mongodb/connet.js');

require('./mongodb/usersSchema.js')

app.use(express.static('public'))

app.get("/", (req,res) => {
	res.sendFile(__dirname+'/views/index.html');
});

app.use('/api',apiRouter);
app.use('/test',testRouter);
app.use('/user',usersRouter);

app.listen(8888);

