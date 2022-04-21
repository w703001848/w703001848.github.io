// 导入 joi 模块
const Joi = require('joi')

// 分别定义 标题、分类Id、内容、发布状态的校验规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 发布文章表单
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}