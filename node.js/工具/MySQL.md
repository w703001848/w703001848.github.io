# 安装

`npm install mysql`



# 配置

```js
// 导入mysql模块
const mysql = require('mysql');

// 建立与数据库的连接
const db = mysql.createPool({
    host: 'localhost', // 127.0.0.1
    user: 'root',
    password: 'admin123',
    database: 'my_db_01',
    port: 3306
});
```

#### 测试是否正常工作

```js
db.query('select 1', (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
})
```

> 打印`[ RowDataPacket { '1': 1 } ]`



## 查询

```js
const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
})
```

> 注意：使用select查询数据返回数组

## 插入

```js
// ? 表示占位符
const sql = 'insert into users values(?, ?)'
// 使用数组的形式为占位符指定具体的值
db.query(sql, [username, password], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('插入成功')
})
```

> ? 表示占位符

##### 快速插入

```js
const user = {username:'Bruce', password:'55520'}
const sql = 'insert into users set ?'
db.query(sql, user, (err, results) => {
  ...
})
```

## 更新

```js
const sql = 'update users set username=?, password=? where id=?'
db.query(sql, [username, password, id], (err, results) => {
  ...
})
```
##### 快速插入
```js
const user = {id:7,username:'Bruce',password:'55520'}
const sql = 'update users set ? where id=?'
db.query(sql, [user, user.id], (err, results) => {
  ...
})
```

## 删除

```js
const sql = 'delete from users where id=?'
db.query(sql, id, (err, results) => {
  ...
})
```

使用 delete 语句会真正删除数据，保险起见，使用标记删除的形式，模拟删除的动作。即在表中设置状态字段，标记当前的数据是否被删除。

```js
db.query('update users set status=1 where id=?', 7, (err, results) => {
  ...
})
```