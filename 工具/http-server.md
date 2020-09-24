# Http-server

是一个轻量级的基于nodejs的http服务器，它最大好处就是：

可以使任意一个目录成为服务器的目录，完全抛开后台的沉重工程，直接运行想要的js代码。

## 安装

```undefined
npm i -g http-server
```

## 运行

 在要成为服务器的目录下运行如下命令

```undefined
http-server
```

## 禁用缓存

若要禁用缓存，请使用如下命令运行

```swift
http-server -c-1
```

运行后在浏览器输入http://localhost:8080/或者http://127.0.0.1:8080就可以打开目录啦

## 停止运行

`Ctrl`+`C`