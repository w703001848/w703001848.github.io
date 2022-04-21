const Joi = require('joi')

// 2. 定义 name 和 alias 的验证规则
const name = Joi.string().required()
const alias = Joi.string().alphanum().required()
// id 的校验规则
const id = Joi.number().integer().min(1).required()

// 上传图片表单
exports.update_pic_schema = {
  body: {
    user_pic: Joi.string().required(),
  },
}

// 向外共享
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
}

// 删除分类
exports.delete_cate_schema = {
  params: {
    id,
  },
}

// 根据 Id 获取文章分类
exports.get_cate_schema = {
  params: {
    id,
  },
}

// 更新分类
exports.update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  },
}
