// 导入数据库操作模块
const db = require('../db/index')

// 文章列表
exports.articleList = (req, res) => {
  const body = req.body
  res.send({
      code: 200,
      data: body,
      msg: 'success',
      timestamp: req.timestamp,
  });
};