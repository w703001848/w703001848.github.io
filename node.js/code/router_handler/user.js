// 导入数据库操作模块
const db = require('../db/index')
// 导入加密模块
const bcrypt = require('bcryptjs')

// 通用
exports.userinfo = (req, res) => {
    const userinfo = req.body
    res.sendStatusSuccess(userinfo, 'success')
}

// 注册用户
exports.regUser = (req, res) => {
    const userinfo = req.body
    // if(!userinfo.username || !userinfo.password) {
    //     res.sendStatusError('用户名或密码不能为空', 400)
    // }
    // 定义SQL语句, 查询用户名是否存在
    const sql_duplicate = `SELECT * FROM ev_users WHERE username=?`
    // 执行SQL语句
    db.query(sql_duplicate, userinfo.username, (err, result) => {
        if(err) res.sendStatusError(err, 500)
        // 判断用户名是否存在
        if(result.length > 0) {
            res.sendStatusError('用户名已存在', 400)
        }
        // 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // console.log(`数据长度:${userinfo.password.length} 加密后:${userinfo.password}`)
        
        // 定义SQL语句, 插入用户数据
        const sql_insert_user = `INSERT INTO ev_users SET ?`
        // 执行SQL语句
        db.query(sql_insert_user, userinfo, (err, result) => {
            if(err) res.sendStatusError(err, 500)
            // 判断是否插入成功
            if(result.affectedRows !== 1) {
                res.sendStatusError('注册失败', 400)
            }
            res.sendStatusSuccess(null, '注册成功')
        })
    })
};