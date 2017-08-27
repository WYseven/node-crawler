const mongoose = require('mongoose');
let usersDataSchema = new mongoose.Schema;

usersDataSchema.add({
  userName: {
    type: String,
    unique: true
  }
});
// 创建url的实例
var UsersDataModel = mongoose.model('users', usersDataSchema);


let usersObj = new UsersDataModel();

module.exports = {
  usersObj
};