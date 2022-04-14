

```bash
git config --global user.name "wangleping"
git config --global user.email "w703001848@qq.com"
```

使用`cd ~/.ssh`可以查看是否已配置SSH。

执行生成公钥和私钥的命令`ssh-keygen -t rsa -C "w703001848@qq.com"` 

执行查看公钥的命令`cat ~/.ssh/id_rsa.pub` 

执行查看连接成功`ssh -T git@github.com` or `ssh -T git@gitee.com `

##### 初始化git

```bash
cd /dir/
git init
```

##### 添加git 源（配置远程仓库）

```bash
git remote add origin git@192.168.xxx:xxx/project.git
git branch --set-upstream-to=origin/master master
git pull origin master
```

##### 提交

```bash
git add ./path/to/file
git commit -m 'change for what?'
git push origin master
```


##### 查看本地分支

```bash
git branch
```

