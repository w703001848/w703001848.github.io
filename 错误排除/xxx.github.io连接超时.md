## xxx.github.io连接超时
### 方法一

访问被拒绝多是dns服务器出了问题，把DNS换成114.114.114.114不作用，8.8.8.8不作用

使用208.67.222.222（opendns）可以正常解析，将其设置为备用DNS即可

### 方法二

https://gitee.com/docmirror/dev-sidecar#https://gitee.com/docmirror/dev-sidecar/releases



## 【git】解决git报错:ssh:connect to host github.com port 22: Connection timed out 亲测有效

如题，git使用中突然报错
ssh:connect to host github.com port 22: Connection timed out
通过查阅各种资料，得知原因可能是由于电脑的防火墙或者其他网络原因导致ssh连接方式 端口22被封锁。

#### 解决方法

#### 一：抛弃ssh连接方式，使用http连接。

```
git config --local -e
将配置文件的url = git@github.com:username/repo.git一行改为：url = https://github.com/username/repo.git
```

#### 方法二：如果22号端口不行，那就换一个端口

#### 进入.ssh文件夹

创建一个config文件

![](C:\projectGit\w703001848.github.io\错误排除\z7drxuznvgnea_e581f158a2904c7597a852544116edf9.png)

将下面的内容复制进去

```
Host github.com
User git
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443

Host gitlab.com
Hostname altssh.gitlab.com
User git
Port 443
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```

保存退出
检查是否成功

```
ssh -T git@github.com 
这里要根据它的提示操作，有个地方要输入yes
此时大功告成啦
```

