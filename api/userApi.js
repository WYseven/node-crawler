const express = require('express');
const router = express.Router();

// 操作数据库已存在的数据

// 抓取指定页数的数据
router.get("/getUsers", (req,res) => {
  db.model('users').find().then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
  })
  
});

module.exports = router;

