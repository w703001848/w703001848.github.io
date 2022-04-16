// 导入 joi 模块
const Joi = require('joi')
// 账户信息验证规则
const username = Joi.string().alphanum().min(1).max(11).required()
// 密码验证规则
const password = Joi.string().pattern(/^[\S]{8,16}$/).required()
// id 字段验证规则
const id_schema = Joi.number().integer().min(1).required()
// nickname 字段验证规则
const nickname_schema = Joi.string().min(1).max(10);
// email 字段验证规则
const email_schema = Joi.string().email();
// pic 字段验证规则
const pic_schema = Joi.string();
// 状态字段验证规则
const status_schema = Joi.number().integer();

// 修改密码表单的验证规则对象
exports.update_password_schema = {
  body: {
    id: id_schema,
    old_password: password,
    password: Joi.not(Joi.ref('old_password')).concat(password),
    repeat_password: Joi.ref('password')
  },
}
// 更新图片表单的验证规则对象
exports.update_pic_schema = {
  body: {
    id: id_schema,
    user_pic: pic_schema,
  },
}
// 更新用户状态表单的验证规则对象
exports.update_status_schema = {
  body: {
    id: id_schema,
    user_pic: status_schema.min(0).max(1),
  },
}
// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
}
// 更新用户信息表单的验证规则对象
exports.update_userinfo_schema = {
  body: {
    id: id_schema,
    nickname: nickname_schema.empty(''),
    email: email_schema.empty(''),
    user_pic: pic_schema.empty(''),
  },
}