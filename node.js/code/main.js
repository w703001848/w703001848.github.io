// 导入 express 模块
const express = require('express')
const cors = require('cors')
const apiRouter = require('./router/index.js')

// 创建 web 服务器
const app = express()

// 设置静态资源目录
app.use(express.static('files'))
app.use('/img', express.static('static'))

// 挂载时间戳中间件
app.use(function (req, res, next) {
    const t = parseInt(new Date().getTime()/1000)
    req.timestamp = t
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
    res.send({
        code: 200,
        data: query,
        msg: 'success',
        timestamp: req.timestamp,
    })
})

// CORS 跨域设置
app.use(cors())

// 配置解析 JSON 格式 POST 请求的中间件
app.use(express.json())
// 配置解析表单 POST 请求的中间件
app.use(express.urlencoded({ extended: true }))

// 设置路由
app.use('/api', apiRouter)

// 定义 404 页面
app.use((req, res) => {
    res.status(404).send('404 Not Found')
})

// 定义 500 页面
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('500 Server Error')
})

// 启动服务器
app.listen(80, () => {
    console.log('express server running at http://127.0.0.1')
})