# 安装和新建vue-webpack项目

#### 1、安装nodejs和npm后

#### 2、全局安装脚手架工具vue-cli

命令npm install --global vue-cli

#### 3、监测vue是否配置好

命令vue -V

#### 4、开始使用Vue创建项目（可以先进入自己想要创建项目的文件夹中）

命令vue init webpack vue_test  (vue_test是自己的项目名字)

#### 5、cd到刚刚创建的目录下面，运行vue项目

cd vue_test

npm run dev

#### 目录解析：

>   build：项目构建(webpack)相关代码
>
>   config：配置目录，包括端口号等
>
>   node_modules：npm加载的项目依赖块
>
>   src：这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：
>
>   assets: 放置一些图片，如logo等
>
>   components：该目录里存放的我们的开发文件组件，主要的开发文件都存放在这里了
>
>   App.vue：项目入口文件
>
>   main.js：项目的核心文件
>
>   router：路由配置目录
>
>   static：放置一些静态资源文件
>
>   test：初始测试目录，可删除
>
>   .xxxx文件：这些是一些配置文件，包括语法配置，git配置等
>
>   index.html：首页入口文件
>
>   package.json：项目配置文件
>
>   README.md：项目的说明文档，markdown 格式