// 导入数据库操作模块
const db = require('../db/index')
// 导入加密模块
const bcrypt = require('bcryptjs')
// 导入 jsonwebtoken模块来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config/constData.js')

//token验证
exports.verifyToken = (req, res, next) => {
    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
        if (err) return res.sendStatusError('token验证失败', 401)
        res.sendStatusSuccess()
    })
}

// token刷新
exports.refreshToken = (req, res) => {
    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
        if (err) return res.sendStatusError('token验证失败', 401)
        const user = decoded.user
        const newToken = 'Bearer ' + jwt.sign({id: user.id, username: user.username}, config.jwtSecretKey, {expiresIn: config.expiresIn})
        res.sendStatusSuccess({
            token: newToken
        }, 'token刷新成功')
    })
}

// 注册用户
exports.regUser = (req, res) => {
    const userinfo = req.body
    // 定义SQL语句, 查询用户名是否存在
    const sql_select = `SELECT * FROM ev_users WHERE username=?`
    // 执行SQL语句
    db.query(sql_select, userinfo.username, (err, result) => {
        if(err) return res.sendStatusError(err, 500)
        // 判断用户名是否存在
        if(result.length > 0) {
            return res.sendStatusError('用户名已存在', 400)
        }
        // 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // console.log(`数据长度:${userinfo.password.length} 加密后:${userinfo.password}`)
        // 定义SQL语句, 插入用户数据
        const sql_insert_user = `INSERT INTO ev_users SET ?`
        // 执行SQL语句
        db.query(sql_insert_user, userinfo, (err, result) => {
            if(err) return res.sendStatusError(err, 500)
            // 判断是否插入成功
            if(result.affectedRows !== 1) return res.sendStatusError('注册失败', 400)
            res.sendStatusSuccess(null, '注册成功')
        })
    })
};

// 登录用户
exports.login = (req, res) => {
    const userinfo = req.body
    // 定义SQL语句, 查询用户名是否存在
    const sql_select = `SELECT * FROM ev_users WHERE username=?`
    // 执行SQL语句
    db.query(sql_select, userinfo.username, (err, result) => {
        if(err) return res.sendStatusError(err, 500)
        // 判断用户名是否存在
        if(result.length !== 1) {
            return res.sendStatusError('用户名不存在', 400)
        }
        // 判断密码是否正确
        if(!bcrypt.compareSync(userinfo.password, result[0].password)) {
            return res.sendStatusError('密码错误', 400)
        }
        // 生成Token
        const token = 'Bearer ' + jwt.sign({id: result[0].id, username: result[0].username}, config.jwtSecretKey, {expiresIn: config.expiresIn})
        // 生产刷新Token
        const refreshToken = 'Bearer ' + jwt.sign({id: result[0].id, username: result[0].username}, config.jwtRefreshSecretKey, {expiresIn: config.expiresRefresh})
        res.sendStatusSuccess({token, refreshToken}, '登录成功')
    })
};

// 退出登录
exports.logout = (req, res) => {
    res.sendStatusSuccess()
}

// 获取用户信息
exports.getUserinfo = (req, res) => {
    // 定义SQL语句, 查询用户信息
    const sql_select = `SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id=?`
    // 执行SQL语句
    db.query(sql_select, req.user.id, (err, result) => {
        if(err) return res.sendStatusError(err, 500)
        if(result.length !== 1) return res.sendStatusError('用户不存在', 400)
        res.sendStatusSuccess(result[0])
    })
}

// 更新用户信息
exports.updateUserinfo = (req, res) => {
    // 定义SQL语句, 查询用户信息
    const sql_select = `UPDATE ev_users SET ? WHERE id=?`
    // 防止用户恶意更新数据库
    const userinfo = req.body
    delete userinfo.id
    // 判断最少要更新一个字段
    if(Object.keys(userinfo).length === 0) return res.sendStatusError('更新字段不能为空', 400)
    // 执行SQL语句
    db.query(sql_select, [userinfo, req.user.id], (err, result) => {
        if(err) return res.sendStatusError(err, 500)
        if(result.affectedRows !== 1) return res.sendStatusError('更新用户信息失败', 400)
        res.sendStatusSuccess(null, '更新用户信息成功')
    })
}

// 更新用户密码
exports.updateUserPassword = (req, res) => {
    const sql_select = `SELECT id, password FROM ev_users WHERE id=?`
    db.query(sql_select, req.user.id, (err, result) => {
        if(err) return res.sendStatusError(err, 500)
        if(result.length !== 1) return res.sendStatusError('用户不存在', 400)
        // 判断原密码是否正确
        if(!bcrypt.compareSync(req.body.old_password, result[0].password)) {
            return res.sendStatusError('原密码错误', 400)
        }
        const sql_update = `UPDATE ev_users SET password = ? WHERE id = ?`
        const password = bcrypt.hashSync(req.body.password, 10)
        db.query(sql_update, [password, req.user.id], (err, result) => {
            if(err) return res.sendStatusError(err, 500)
            if(result.affectedRows !== 1) return res.sendStatusError('更新失败', 400)
            res.sendStatusSuccess()
        })
    })
}

// 更新用户头像
exports.updateUserPic = (req, res) => {
    const sql = `UPDATE ev_users SET user_pic = ? WHERE id = ?`
    db.query(sql, [req.body.user_pic, req.user.id], (err, result) => {
        if(err) return res.sendStatusError(err, 500)
        if(result.affectedRows !== 1) return res.sendStatusError('更新失败', 400)
        res.sendStatusSuccess()
    })
}

// 更新用户状态
exports.updateUserStatus = (req, res) => {
    const sql = `UPDATE ev_users SET status = ? WHERE id = ?`
    db.query(sql, [req.body.status, req.user.id], (err, result) => {
        if(err) return res.sendStatusError(err, 500)
        if(result.affectedRows !== 1) return res.sendStatusError('更新失败', 400)
        res.sendStatusSuccess()
    })
}