// user.js

const express = require('express')
// 导入 @escook/express-joi 验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入 joi 需要的验证规则对象
const { 
    reg_login_schema,
    update_userinfo_schema,
    update_password_schema,
    update_pic_schema,
    update_status_schema,
} = require('../utils/joi_schema.js')
// 导入用户路由处理函数
const user_handler = require('../router_handler/user.js')

// 创建路由对象
const api_router = express.Router()

// 注册
api_router.post('/v1/register', expressJoi(reg_login_schema), user_handler.regUser)

// 登录
api_router.post('/v1/login', expressJoi(reg_login_schema), user_handler.login)

// token验证
api_router.get('/v1/token/verify', user_handler.verifyToken)

// token刷新
api_router.get('/v1/token/refresh', user_handler.refreshToken)

// 注销
api_router.post('/v1/logout', user_handler.logout)

// 获取用户信息
api_router.get('/v1/userinfo', user_handler.getUserinfo)

// 更新用户信息
api_router.post('/v1/update', expressJoi(update_userinfo_schema), user_handler.updateUserinfo)

// 更新用户密码
api_router.post('/v1/update/password', expressJoi(update_password_schema), user_handler.updateUserPassword)

// 更新用户头像
api_router.post('/v1/update/avatar', expressJoi(update_pic_schema), user_handler.updateUserPic)

// 更新用户状态
api_router.post('/v1/update/status', expressJoi(update_status_schema), user_handler.updateUserStatus)

module.exports = api_router