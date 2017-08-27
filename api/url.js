const express = require('express');
const router = express.Router();

// 操作数据库已存在的数据

// 抓取指定页数的数据
router.get("/urls", (req,res) => {
  res.send('ok');
});

module.exports = router;

