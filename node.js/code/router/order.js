// order.js

const express = require('express')
// 创建路由对象
const api_router = express.Router()
// 导入订单路由处理函数
const order_handler = require('../router_handler/order.js')

// 订单列表
api_router.get('/v1/order/list', order_handler.orderList)

// 订单详情
api_router.get('/v1/order/detail', order_handler.orderList)

// 订单创建
api_router.post('/v1/order/create', order_handler.orderList)

// 订单删除
api_router.post('/v1/order/delete', order_handler.orderList)

// 订单更新
api_router.post('/v1/order/update', order_handler.orderList)


module.exports = api_router