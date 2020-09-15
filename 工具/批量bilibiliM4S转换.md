## 1、首先下载FFmpeg，下载地址及设置环境变量方法如下

http://ffmpeg.zeranoe.com/builds/

先进入bin目录获取路径：D:\dev\app\ffmpeg-win64\bin

打开系统开始菜单--右击计算机--点击属性--选中高级系统设置--选择高级--选择环境变量设置

在系统变量里选择path,选择编辑，将FFmpeg的bin目录的路径D:\dev\app\ffmpeg-win64\bin;加进去，记得加上分号，点击“确定”保存，即配置完成。

**使用命令行窗口检验是否安装成功**

调用命令行（windows+R输入cmd）输入“ffmpeg –version”，如果出现如下说明配置成功。



运行打开CMD窗口终端

执行以下命令

```
cd  E:\Course\python
dir ./b > name.txt
```
生成name.txt文件，打开删除文本末尾name.txt
>   **注意：执行for循环前将name.txt中name.txt这条记录删除，否则执行会产生一条错误**,在文本末尾


```
for /f %i in (name.txt) do  cd E:\Course\python\%i\64 & ffmpeg -i video.m4s -i audio.m4s -c:v copy -strict experimental %i.mp4 & move %i.mp4 E:\Course\python & cd E:\Course\python
```

等待执行完成

------

主要生成mp4格式文件命令为

```
ffmpeg -i video.m4s -i audio.m4s -c:v copy -strict experimental 文件名.mp4
```

在文件生成之后可以添加静默删除，即修改for循环即可

```
for /f %i in (name.txt) do  cd C:\bilibili\Python\%i\80 & ffmpeg -i video.m4s -i audio.m4s -c:v copy -strict experimental %i.mp4 & move %i.mp4 C:\bilibili\Python & cd C:\bilibili\Python & rd /s/q %i
```

>   注意：命令中80是根据你下载文件格式清晰度不同进行定义的，即你下载的视频有可能是16等其他数字，但是同一批缓存文件格式一般都是相同的，所以在生成视频注意修改；同时不建议添加默认删除，不然for循环修改后执行错误会将源文件进行删除，老惨了，切记；