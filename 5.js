const http = require("http");
const path = require("path");
const fs = require("fs");
const os = require('os');
const cluster = require('cluster');
const isDirectory = (fileName) => {
    return fs.lstatSync(fileName).isDirectory();
};
const isFile = (fileName) => {
    return fs.lstatSync(fileName).isFile();
};
function getData(dirname, url){
    if (url != "/"){
        url = (url+"/");
    }
    if (!url.split('/').slice(0,-2).join('/')){
        var back = "..";
    } else {
        var back = url.split('/').slice(0,-2).join('/');
    }
    const dirList = fs.readdirSync(dirname).filter(isDirectory);
    const fileList = fs.readdirSync(dirname).filter(isFile);
    const list = dirList.concat(fileList);
    var dat = '<a href="..">.</a><br><a href="'+back+'">..</a><br>';
    list.forEach(function(item, i, list) {
        dat = dat+"<a href="+url+item+">"+item+"</a><br>";
    });
    return '<html><body>'+dat+'</body></html>';
}
function getFile(file){
    return fs.readFileSync(file, "utf8").replace(new RegExp("[<]","g"),"&lt;").replace(new RegExp("[>]","g"),"&gt;");
}
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running...`);
    for (let i = 0; i < os.cpus().length; i++) {
        console.log(`Forking process number ${i}`);
        cluster.fork();
    }
} else {
    console.log(`Worker ${process.pid} is running`);
    const server = http.createServer((req, res) => {
        if (req.url != "/favicon.ico"){
            if (fs.lstatSync(__dirname+req.url).isDirectory()){
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(getData(__dirname+req.url, req.url));
            } else {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end('<a href="..">.</a><br><a href="'+req.url.split('/').slice(0,-1).join('/')+'">..</a><br>'+getFile(__dirname+req.url));
            }
        }
        setTimeout(() => {
            console.log(`Worker ${process.pid} handling request`);
        }, 5000);
    });
    server.listen(8000);
}