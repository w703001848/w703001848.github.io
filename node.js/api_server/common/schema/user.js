// 导入 joi 模块
const Joi = require('joi')

// 账户信息验证规则
const username = Joi.string().alphanum().min(1).max(11).required()
// 密码验证规则
const password = Joi.string().pattern(/^[\S]{8,16}$/).required()
// id 字段验证规则
const id_schema = Joi.number().integer().min(1).required()
// nickname 字段验证规则
const nickname_schema = Joi.string().min(1).max(10)
// email 字段验证规则
const email_schema = Joi.string().email()
// pic 字段验证规则
const pic_schema = Joi.string().dataUri()
// 状态字段验证规则
const status_schema = Joi.number().integer().valid(0, 1)

// 修改密码表单
exports.update_password_schema = {
  body: {
    id: id_schema,
    old_password: password,
    password: Joi.not(Joi.ref('old_password')).concat(password),
    repeat_password: Joi.ref('password')
  },
}
// 更新用户状态表单
exports.update_status_schema = {
  body: {
    user_pic: status_schema,
  },
}
// 注册和登录表单
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}

// 更新用户信息表单
exports.update_userinfo_schema = {
  body: {
    nickname: nickname_schema,
    email: email_schema,
    user_pic: pic_schema,
  }
}

// 更新头像
exports.update_avatar_schema = {
  body: {
    avatar: pic_schema
  }
}