// article.js

const express = require('express')
// 创建路由对象
const api_router = express.Router()
// 导入订单路由处理函数
const article_handler = require('../router_handler/article.js')

// 订单列表
api_router.get('/v1/article/list', article_handler.articleList)

// 订单详情
api_router.get('/v1/article/detail', article_handler.articleList)

// 订单创建
api_router.post('/v1/article/create', article_handler.articleList)

// 订单删除
api_router.post('/v1/article/delete', article_handler.articleList)

// 订单更新
api_router.post('/v1/article/update', article_handler.articleList)


module.exports = api_router