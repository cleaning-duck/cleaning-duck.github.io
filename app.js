const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let root = path.resolve(process.argv[2]||'.');

const server = http.createServer(function(req,res){
   
    let pathname = url.parse(req.url).pathname;
    let filepath = path.join(root,pathname);
    
    fs.stat(filepath,function(err,stats){
        if(!err && stats.isFile()){
            res.writeHead(200);
            fs.createReadStream(filepath).pipe(res);
        }else{
            res.writeHead(404);
            res.end('404 Not Found');
        }

    })
    
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');

