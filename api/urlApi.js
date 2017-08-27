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

module.exports = router;

