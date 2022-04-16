# 定义验证规则、规则验证等

### 定义验证规则

1.  安装 `joi` 包，为表单中携带的每个数据项，定义验证规则：

```bash
npm install joi
```

2.  安装 `@escook/express-joi` 中间件，来实现自动对表单数据进行验证的功能：

```bash
npm i @escook/express-joi
```

3.  新建 `/schema/user.js` 用户信息验证规则模块，并初始化代码如下：

```js
const joi = require('joi')

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}
```

4.  修改 `/router/user.js` 中的代码如下：

```js
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
// 登录
router.post('/login', userHandler.login)

module.exports = router
```

5.  在 `app.js` 的全局错误级别中间件中，捕获验证失败的错误，并把验证失败的结果响应给客户端：

```js
const joi = require('joi')

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})
```

### 规则

```js
// 字符串、支持空字符串、只能是包含 a-zA-Z0-9 的字符串、必填（不能为undefined）
Joi.string().allow('').alphanum().required()

// 数字、整数、正数、最小值18、最大值35
Joi.number().integer().positive().min(18).max(35)
// 数字必须大于5
Joi.number().greater(5)

// 数组、长度为3、子元素为字符串、
Joi.array().items(joi.string()).length(3)

// 对象、只有p1属性且为字符串
Joi.object({
	p1: Joi.string()
})

// 函数、参数数量
Joi.func().arity(2)

// 日期、时间戳 or ISO格式
Joi.date().timestamp()	.iso()

// 任意
Joi.any()

// 真假、忽略
Joi.boolean().allow()

// 正则regex
Joi.string().pattern(/^[\S]{6,12}$/)
Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)

// 为空不能为null、为空undefined不能为空字符串
Joi.empty('').empty()

// 取old_password
Joi.ref('old_password')

// 验证是否不同，且执行password的验证规则
Joi.not(Joi.ref('old_password')).concat(password)

// 可以时字符串也可以是数字类型
[Joi.string(), Joi.number()]

// 自定义错误信息
Joi.string().error(new Error(‘自定义错误信息’))
```

-   **valid:列举可选值；**age只能取14， 16， 18 中的其一
-   a字段的校验规则要根据b字段的规则确定；（疑问❓：age为数组的话，childAge为数组值中一个❓）
-   **in:指向其他属性**用ref、ancestor往**上层对象中查找，找不到就验证失败**

```js
Joi.object({
    age: Joi.number().valid(14, 16, 18),
    childAge: Joi.number().valid(Joi.in('age')),
    childAgeBack: Joi.ref('childAge'),
    childAgeBack1: Joi.ref('childAge', {ancestor: 2}),
})
```

-   **with: 全选。** 表示当设置的属性有一个出现了，其他也必须出现，上面的例子设置了a、b属性，需要同时存在或者同时不存在。

-   **without: 二者择其一。**第一个参数设置条件字段，第二个参数为字段数组，表示第一个参数字段存在的话，第二个参数数组里面的字段都不能存在。上面的例子就是当a字段出现时，b字段就不能存在。

-   **xor: 一个或多个。**表示设置的参数需要任何一个或多个存在。

```
const schema = Joi.object({
	a: Joi.any(),
	b: Joi.any()
}).with('a', 'b');

const schema = Joi.object({
	a: Joi.any(),
	b: Joi.any()
}).without('a', ['b']);

const schema = Joi.object({
	a: Joi.any(),
	b: Joi.any()
}).xor('a', 'b');
```

-   **when: 相当于条件判断**，第一个参数传递属性名，is相当于if，then后面就是is为真的时候的校验条件。【mode字段只允许传入’email’和’phone’，当mode字段为’email’的时候，address字段就会进行email校验(joi自带的字符串邮箱校验)】

```js
const schema = Joi.object({
	mode: Joi.string().allow('email', 'phone').required(),
	address: Joi.string().when(
        'mode', 
        {
            is: 'email',
            then:Joi.string().email()
        }
    ).required(),
});
```

#### 特殊情况

1.  Joi.string()默认情况不支持空字符串

2.  required()必须放在最后，因为返回值为undefined

3.  如果没有required()，可以不填值，填了就要遵循规则

4.  对象schema中，默认不能传入指定外的属性。如果需要**允许其他属性**的出现，需要在跟上一个**unknown**方法。
    
```js
    const result = schema.validate({
    	name: 'wlp'
    }).unknown() // 允许出现其他字段
    ```
    
5.  Joi.number()校验数字类型、如果字符串可以转换convert为数字，那么默认也会pass。

6.  Joi.number()默认只支持js的safe范围（Number.MIN_SAFE_INTEGER & Number.MAX_SAFE_INTEGER)）的数值；非safe范围需要指明：Joi.number().unsafe()

### 规则验证

```js
const joi = require('joi')
const schema = joi.string().alphanum().min(1).max(10).required()
// validate方法，传入需要校验的值
const result = schema.validate('w77777')
// 同上,且验证所有字段，不会验证出现第一个错误时就停止
const {err, value} = Joi.validate('w77777', schema, {abortEarly: true})
```

>   validate方法会返回一个对象，如果验证通过，就只会返回value属性，如果验证错误，就还有一个error对象，其中error对象的message描述了失败原因:

```js
try {
	const value = await schema.validateAsync(req[content], data);
    console.log(value);
    next();
} catch (error) {
    xxx = {
    	code: 400,
        message: error.message ? error.message : errMsg[error.details[0].context.key]
    }
}
```

