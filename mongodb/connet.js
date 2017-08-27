const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// 连接数据库
var promise = mongoose.connect('mongodb://localhost:27017/miaovbbs', {
  useMongoClient: true
});
promise.then(function(db) {
  console.log('数据库连接成功');
  global.db = db;
})
.catch((error)=>{
  console.log('连接失败')
  console.log(error)
})

