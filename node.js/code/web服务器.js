const http = require('http');
const fs = require('fs');
const path = require('path')

const server = http.createServer();

server.on('request', (req, res) => {
    const url = req.url
    const method = req.method
    let content = '404 Not found';
    // 设置 Content-Type 响应头，解决中文乱码的问题
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    let router = '';
    if (url === '/' || url === '/index.html') {
        router = '/index.html';
    }else if(url === '/about.html'){
        router = '/about.html';
    }else{
        console.log(`Your request url is ${url}, and request method is ${method}`);
    }
    if(router){
        fs.readFile(path.join(__dirname, './files', router), 'utf8', function(err, data){
            if(err) {
                return res.end(content);
            }
            // 向客户端响应内容
            res.end(data)
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000/');
});