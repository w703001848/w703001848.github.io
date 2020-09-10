# github连接超时

由于github过一个月就会连接超时

网上很多解决方法，大多都是直接修改host文件值，而且网址直接copy。但大多映射的网址都ping不通，即`本地dns解析错误`。

#### 先ping其他网站，查看本地

```
ping baidu.com
```

能接受说明网络正常。

#### 再ping github.com

可以看到github.com ping不通，就是本地dns解析错误。而括号里面的地址就是你在host文件中的映射地址。

## 解决办法

首先就是找个能够访问的IP地址，映射到github.com上，就能够访问了。

[IP地址查找网站](https://ip.911cha.com/github.com.html)
[IP地址查找网站2](http://tool.chinaz.com/dns/)

ping 查询到的ip（例：ping 192.30.255.113）

> 注意：网站查询的ip每次大概率不一样，可以多查询几个 ping到最佳的ip

找到github.com对应的IP地址，粘贴到host文件上。但注意，host文件映射是以**第一个地址**为标准的，所以之前的地址需要删除。

**_host文件路径：C:\Windows\System32\drivers\etc\hosts_**

再次ping github.com,可以发现对应的地址改变了，并且能够ping通。现在可以上传项目到github了

> 注意：保存后记得`ipconfig /flushdns` 修改后刷新缓存

