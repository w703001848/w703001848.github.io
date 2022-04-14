// 导入mysql模块
const mysql = require('mysql');

// 建立与数据库的连接
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01',
    port: 3306
});

// // 查询
// const sqlStr = 'select * from users'
// db.query(sqlStr, (err, results) => {
//   if (err) return console.log(err.message)
//   console.log(results)
// })

// 插入
// const sqlStr = 'insert into users (username, password) values (?, ?)'
// db.query(sqlStr, ['zhangsan', '123456'], (err, results) => {
//     if (err) return console.log(err.message)
//     if (results.affectedRows > 0) {
//         console.log('插入成功')
//     } else {
//         console.log('插入失败')
//     }
// })

module.exports = db