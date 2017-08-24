const mongoose = require('mongoose');
let urlDataSchema = new mongoose.Schema;
mongoose.Promise = require('bluebird');

urlDataSchema.add({
  allotName:String,  // 分配对应的人
  pageIndex: Number,
  page: String,
  url: {
    type: String,
    unique: true
  },
  title: String,
  unanswer: Number,
  answers: Array
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