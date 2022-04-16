const path = require('path')
const fs = require('fs')

console.log('hello node.js', __dirname);

// 正则
const regScript = /<script (\w+=".*?")*>[\s\S]*<\/script>/
const regStyle = /<style>[\s\S]*<\/style>/

function resolceCSS(htmlStr){
    var arr = regStyle.exec(htmlStr);
    var a1 = arr && arr[0].replace(/<style>/, '').replace(/<\/style>/, '');
    return a1;
}

function resolceScript(htmlStr){
    var arr = regScript.exec(htmlStr);
    var a1 = arr[0].replace(/<script (\w+=".*?")*>\s*/, '').replace(/<\/script>/, '').replace(/\r\n\s*/g, ' ');
    return a1;
}

// 读取文件
// 动态文件路径 __dirname
fs.readFile(path.join(__dirname, './files/index.html'), 'utf8', function(err, data){
    if(err) {
        return console.error(err);
    }
    console.log('文件读取成功！');
    var cssStr = resolceCSS(data);
    // var scriptStr = resolceScript(data);
    console.log(cssStr);
    // 写入文件
    // fs.writeFile(path.join(__dirname, './files/2.txt'), list.join('\r\n'), 'utf8', function(err){
    //     if(err){
    //         return console.error(err)
    //     }
    //     console.log('文件写入成功！');
    // });
});
