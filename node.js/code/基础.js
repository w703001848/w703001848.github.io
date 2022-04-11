const path = require('path')
const fs = require('fs')

console.log('hello node.js', __dirname);

// 读取文件
// 动态文件路径 __dirname
fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, data){
    if(err) {
        return console.error(err);
    }
    console.log('文件读取成功！');

    var arr = data.split(' '), list = [];
    arr.forEach(item => {
        list.push(item.replace('=', ':'));
    });

    // 写入文件
    fs.writeFile(path.join(__dirname, './files/2.txt'), list.join('\r\n'), 'utf8', function(err){
        if(err){
            return console.error(err)
        }
        console.log('文件写入成功！');
    });
});
