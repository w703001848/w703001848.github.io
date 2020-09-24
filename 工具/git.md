

```
git config --global user.name “用户名”
git config --global user.email “邮箱”
```

使用`cd ~/.ssh`可以查看是否已配置SSH。

执行生成公钥和私钥的命令`ssh-keygen -t rsa` 

执行查看公钥的命令`cat ~/.ssh/id_rsa.pub` 