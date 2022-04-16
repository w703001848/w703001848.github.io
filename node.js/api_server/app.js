// 导入 express 模块
const express = require('express')

// 导入第三方模块
// 导入cors模块
const cors = require('cors')
// 导入 @hapi/joi 模块
const joi = require('joi')
// 导入token验证中间件
const expressJWT = require('express-jwt')

// 导入自定义模块
// 导入路由模块
const api_router = require('./router/index.js')
const api_router_user = require('./router/user.js')
const api_router_order = require('./router/order.js')
// 导入配置文件
const config = require('./config/constData.js')

// 创建 web 服务器
const app = express()

// 设置静态资源目录
app.use(express.static('files'))
app.use('/img', express.static('static'))

// 挂载时间戳中间件
app.use(function (req, res, next) {
    const t = parseInt(new Date().getTime()/1000)
    req.timestamp = t
    // 返回函数封装success
    res.sendStatusSuccess = function (data = null, msg = 'success') {
        res.send({
            code: 200,
            data: data,
            msg: msg,
            timestamp: t,
        })
    }
    // 返回函数封装error
    res.sendStatusError = function (msg, code = 500, data = null) {
        res.status(code).send({
            code: code,
            data: data,
            msg: msg instanceof Error ? msg.message : msg,
            timestamp: t,
        })
    }
    next()
})

// jsonp 跨域设置(用于支持老版本浏览器)
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    if (req.method == 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

// 设置路由(支持老版本浏览器接口)
app.get('/api/jsonp/index', (req, res) => {
    const query = req.query
    res.sendStatusSuccess(query)
})

// CORS 跨域设置
app.use(cors())

// 配置解析 JSON 格式 POST 请求的中间件
app.use(express.json())
// 配置解析表单 POST 请求的中间件
app.use(express.urlencoded({ extended: false }))

// 指定接口不需要验证token
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: ['/api/user/v1/register', '/api/user/v1/login']}))

// 设置路由
app.use('/api/index', api_router)
app.use('/api/user', api_router_user)
app.use('/api/order', api_router_order)

// 定义 404 页面
app.use((req, res) => {
    res.sendStatusError('404 Not Found', 404)
})

// 定义 500 页面
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.sendStatusError('invalid token', 401)
    }else if (err instanceof joi.ValidationError) {
        return res.sendStatusError(err, 400)
    }
    // 未知错误
    console.log(err)
    res.sendStatusError(err.message || 'Internal Server Error', 500)
    // res.status(500).send('Internal Server Error')
    // res.sendStatus(500) 同上
})

// 启动服务器
app.listen(80, () => {
    console.log('express server running at http://127.0.0.1')
})