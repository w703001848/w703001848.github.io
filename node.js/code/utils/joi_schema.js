// 导入 joi 模块
const Joi = require('joi')

// 账户信息验证规则
const username = Joi.string().alphanum().min(1).max(10).required()
// 密码验证规则
const password = Joi.string().pattern(/^[\S]{8,16}$/).required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}