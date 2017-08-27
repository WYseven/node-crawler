const mongoose = require('mongoose');
let urlDataSchema = new mongoose.Schema;
// mongoose.Promise = require('bluebird');

/**
 * 参数说明：
 * flagAnswer：
 *    未回答  unAnswer   默认
 *    分配了未回答  allotNoAnswer
 *    回答了 answerDone
 */

urlDataSchema.add({
  allotId:{
    type:String,
    default:''
  },  // 分配对应的人
  flagAnswer:{
    type: String,
    default:'unAnswer'
  },// 标记问题是否回答
  pageIndex: Number, // 正页的第几条
  page: String,      // 第几页
  url: {            // url地址
    type: String,
    unique: true
  },
  title: String,    // 标题
  unanswer: Number,  // 未回答数
  answers: Array     // 回答人数
});
// 创建url的实例
var urlDataModel = mongoose.model('url', urlDataSchema);


let urlObj = new urlDataModel();

urlObj.modelSave = async (data) => {
  // data是一个数组，存放每一个对象
  // 获取数据库中已有的数据
  let baseData = await urlDataModel.find();
  data = [].concat.apply([],data);  // 把data展成一维数组
  // 判断是否已经存在，存在就不再存入
  // 有待优化？？？
  data = data.filter((item) => {
    return !baseData.find((item2)=>{
      return item2.url == item.url;
    }) 
  });

  await urlDataModel.insertMany(data)
}

// findOne通过async封装之后，调用后then拿不到值，不起作用了
urlObj.findOne = async (data) => {
  await urlDataModel.findOne(data).exec()
};

module.exports = {
  urlObj,
  urlDataModel
};