// router.js

const express = require('express')
// 创建路由对象
const apiRouter = express.Router()

// 挂载路由
apiRouter.get('/v1/index', (req, res) => {
    const query = req.query
    res.send({
        code: 200,
        data: {
            query: query
        },
        msg: 'success',
        timestamp: req.timestamp,
    })
})

apiRouter.post('/v1/order/create', (req, res) => {
    const body = req.body
    res.send({
        code: 200,
        data: body,
        msg: 'success',
        timestamp: req.timestamp,
    })
})

module.exports = apiRouter