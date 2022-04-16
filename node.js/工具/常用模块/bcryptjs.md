# 对密码进行加密处理

-   加密之后的密码，**无法被逆向破解**
-   同一明文密码多次加密，得到的**加密结果各不相同**，保证了安全性

1.  运行如下命令，安装指定版本的 `bcryptjs` ：

```bash
npm i bcryptjs@2.4.3
```

2.  导入 `bcryptjs` ：

```js
const bcrypt = require('bcryptjs')
```

3.  调用 `bcrypt.hashSync(明文密码, 随机盐的长度)` 方法，对密码进行加密处理：

```js
// 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
userinfo.password = bcrypt.hashSync(userinfo.password, 10)
```

