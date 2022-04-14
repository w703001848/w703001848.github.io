## 介绍

`nrm`(npm registry manager) 是`npm`的镜像源管理工具. 有时候国外资源太慢,使用`nrm`可以快速的在`npm`源之间切换

## 安装

```bash
npm install -g nrm
```

## 基本使用

#### 查看可选择的源

```bash
nrm ls
```

#### 切换镜像源–切换到`npm` 镜像源

```bash
nrm use npm
```

#### 增加镜像源

```bash
nrm add registry http://registry.npm.frp.trmap.cn/
```

#### 删除镜像源

```bash
nrm del taobao
```

#### 测试镜像源的速度

```bash
nrm test npm
```

### 其他用法

| 命令                        | 描述                                                         |
| --------------------------- | ------------------------------------------------------------ |
| ls                          | 列举所有的镜像源                                             |
| current                     | 显示当前注册表名称                                           |
| use <registry>              | 切换镜像源                                                   |
| add <registry> [home]       | 添加镜像源                                                   |
| set-auth <registry> [value] | 使用base64编码的字符串或用户名和密码为自定义注册中心设置授权信息 |
| -a --always-auth            | Set is always auth                                           |
| -u --username <username>    | 设置镜像源的用户名                                           |
| -p --password \             | 设置镜像源的密码                                             |
| set-email <value>           | 设置邮箱                                                     |

… 还有其他的一下用法,请参考>>[nrm-npm](https://www.npmjs.com/package/nrm)<<