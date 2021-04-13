Git报错解决：OpenSSL SSL_read: Connection was reset, errno 10054 错误解决

首先，造成这个错误很有可能是网络不稳定，连接超时导致的，
如果再次尝试后依然报错，可以执行下面的命令。
这是服务器的SSL证书没有经过第三方机构的签署，所以报错。

打开Git命令页面，执行git命令脚本：修改设置，解除ssl验证

`git config http.sslVerify "false"` 
`git config --global http.sslVerify "false"` 全局忽略