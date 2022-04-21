## 抛出错误

```js
function divide(num1, num2){
    if(typeof num1 != 'number' || typeof num2 != 'number'){
        throw new Error('divide(): Both arguments must be numbers.');
    }
    return num1 / num2;
}
```



## assert

在大型应用中，自定义错误通常使用assert()函数抛出错误。

这个函数接受一个应该为true的条件，并在条件为false时抛出错误。

```js
function assert(condition, message){
    if(!condition){
        throw new Error(message);
    }
}
```

> 这个assert()函数可用于代替多个if语句，同时也是记录错误的好地方。

```js
function divide(num1, num2){
    assert(typeof num1 == 'number' && typeof num2 == 'number', 'divide(): Both arguments must be numbers.')
    return num1 / num2;
}
```

> 相比之前的例子，使用assert()函数可以减少代码量，并且让代码易读。