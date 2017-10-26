const express = require('express');
const router = express.Router();

// 操作数据库已存在的数据

// 抓取指定页数的数据
router.get("/urls", (req,res) => {
  db.model('url').find().then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
  })
  
});
// 设置分配的人的id
router.get("/setAllotId", (req,res) => {
  let {urlId, userId} = req.query;
  db.model('url')
    .findByIdAndUpdate(urlId,{allotId:userId,flagAnswer:'allotNoAnswer'},{new: true})
    .then((data) => {
      res.send({
        code:1,
        data
      });
    })
    .catch((error) => {
      console.log(error);
    })
});
// 问题已完成
router.get("/completedById", (req,res) => {
  let {urlId, userId} = req.query;
  db.model('url')
    .findByIdAndUpdate(urlId,{flagAnswer:'answerDone'},{new: true})
    .then((data) => {
      res.send({
        code:1,
        data
      });
    })
    .catch((error) => {
      console.log(error);
    })
});

module.exports = router;

