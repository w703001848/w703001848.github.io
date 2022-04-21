# Termux

# Termux 简介

**文档相关**

- [Termux 官网](https://termux.com/)
- [Github 项目地址](https://github.com/termux/termux-app)
- [官方英文 WiKi 文档](https://wiki.termux.com/wiki/Main_Page)

**下载地址**

- [F-Droid 下载地址](https://f-droid.org/packages/com.termux/)
- [Google Play 下载地址](https://play.google.com/store/apps/details?id=com.termux)
- [酷安 下载地址](https://www.coolapk.com/apk/com.termux)

> F-Droid 市场版本下载的版本比 Google Play （貌似 1 年多没有更新了）下载的要新，而且插件这块安装也很方便，有能力的朋友建议首先考虑下载 F-Droid 版本的，然后考虑 Google Play 版本，最后再考虑酷安的版本。

Termux 是一个 Android 下一个高级的终端模拟器，开源且不需要 root，支持 apt 管理软件包，十分方便安装软件包，完美支持 Python、 PHP、 Ruby、 Nodejs、 MySQL等。随着智能设备的普及和性能的不断提升，如今的手机、平板等的硬件标准已达到了初级桌面计算机的硬件标准，用心去打造 DIY 的话完全可以把手机变成一个强大的极客工具。

**初始化**

第一次启动Termux的时候需要从远程服务器加载数据，然而可能会遇到这种问题：

```verilog
Ubable to install
Termux was unable to install the bootstrap packages.
Check your network connection and try again.
```

这里的Termux官方远程的服务器地址是: http://termux.net/bootstrap/



![img](.\img\15871943464391.png)



目前解决方法有两种：

1. VPN 全局代理 （成功率很高）
2. 如果你是 WiFi 的话尝试切换到运营商流量 （有一定成功率）
3. ① F-Droid > ② Google Play > ③ 酷安 根据这个顺序尝试安装，如果不行再重复1、2 步骤操作