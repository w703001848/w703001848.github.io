// user.js

const express = require('express')
// 创建路由对象
const api_router = express.Router()
// 导入用户路由处理函数
const user_handler = require('../router_handler/user.js')
// 导入 @escook/express-joi 验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入 joi 需要的验证规则对象
const { reg_login_schema } = require('../utils/joi_schema.js')

// token验证
api_router.get('/v1/user/token/verify', user_handler.userinfo)

// token刷新
api_router.get('/v1/user/token/refresh', user_handler.userinfo)

// 注册
api_router.post('/v1/user/register', expressJoi(reg_login_schema), user_handler.regUser)

// 登录
api_router.post('/v1/user/login', user_handler.userinfo)

// 注销
api_router.post('/v1/user/logout', user_handler.userinfo)

// 获取用户信息
api_router.get('/v1/user/info', user_handler.userinfo)

// 更新用户信息
api_router.post('/v1/user/update', user_handler.userinfo)

// 更新用户密码
api_router.post('/v1/user/update/password', user_handler.userinfo)

// 更新用户头像
api_router.post('/v1/user/update/avatar', user_handler.userinfo)

// 更新用户状态
api_router.post('/v1/user/update/status', user_handler.userinfo)

module.exports = api_router