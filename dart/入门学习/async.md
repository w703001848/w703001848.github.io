# dart:async - 异步编程

返回Future或者Stream对象的函数, 这些函数被称为异步函数。
`async`和`await`关键词支持了异步编程，允许您写出和同步代码很像的异步代码。

## Future

### then\catchError\onError\whenComplete
```
Future.delayed(new Duration(seconds: 2),(){
   // return "hi world!";
   throw AssertionError("Error");  
}).then((data){
   // 执行成功会走到这里  
   print("success");
}, onError: (err) {
   // 执行失败也会走到这里 
    print(err);
}).catchError((err){
   // 执行失败会走到这里  
   print(err);
}).whenComplete((){
   // 无论成功或失败都会走到这里
   // 请求结束后关闭对话框。
});
```

### 等待多个异步任务都执行结束后才进行
```
Future.wait([
  // 2秒后返回结果  
  Future.delayed(new Duration(seconds: 2), () {
    return "hello";
  }),
  // 4秒后返回结果  
  Future.delayed(new Duration(seconds: 4), () {
    return " world";
  })
]).then((results){
  print(results[0]+results[1]);
}).catchError((e){
  print(e);
});
```

### Async/await
```
task() async {
   try{
    String id = await login("alice","******");
    String userInfo = await getUserInfo(id);
    await saveUserInfo(userInfo);
    //执行接下来的操作   
   } catch(e){
    //错误处理   
    print(e);   
   }  
}
```


## Stream










