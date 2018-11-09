var http = require('http');
var url = require('url');

module.exports = ModuleServer;

const APIData = require('../API/APIData.js');
const ModuleRouter = require('./moduleRouter.js');
const base64 = require('hi-base64');

function ModuleServer(conf) {
    this._conf = conf;
}

ModuleServer.prototype.create = function(httpCom, httpPort) {
    ModuleRouter.test();
    ModuleRouter.init(this);
    var httpServer = new http.Server();
    httpServer._moduleServer = this;
    httpServer.on("request", function(req,res) {
        console.log('\n[Server]req.url : ' + req.url);
        // var urls = req.url.split('?');
        var structServer = {
            "_server": this._moduleServer,
            "_req": req,
            "_res": res,
            "_jsonClient": {},
            "_jsonServer": {},
            "_funcComplete": ModuleServer.routerHandleComplete
        };
        structServer._jsonServer[APIData._module] = "misMatch";

        if (req.method === "GET") {
            var jsonObj = url.parse(req.url, true).query;
            structServer._jsonClient = jsonObj;
            ModuleRouter.handle(structServer);
        } else if (req.method === "POST") {
            var jsonStr = ""; // 暂存请求体信息
            req.on('data', function(chunk) { // 每当接收到请求体数据，累加到post中
                jsonStr += chunk;  // 一定要使用+=
                // console.log("chunk : ", chunk);
            });
            req.on('end', function() {
                var jsonStrNew = base64.decode(jsonStr);
                // console.log("[Server]post jsonStr : ", jsonStrNew);
                var jsonObj = JSON.parse(jsonStrNew); // 解析参数
                structServer._jsonClient = jsonObj;
                ModuleRouter.handle(structServer);
            });
        }
    });
    httpServer.listen(httpPort, httpCom, function() {
        console.log('[Server]running : http://' + httpCom + ':' + httpPort);
    })
}
ModuleServer.routerHandleComplete = function(structServer) {
    var jsonStr = JSON.stringify(structServer._jsonServer);
    console.log('[Server]jsonServer : ', jsonStr);
    if (structServer._jsonClient.jsonpCallback) { // 请求为携带jsonp方法的http请求
        structServer._res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
        var callback = structServer._jsonClient.jsonpCallback + '(' + jsonStr + ');';
        structServer._res.end(callback);
    } else {
        if (structServer._req.method === "POST") {
            var jsonStrNew = base64.encode(jsonStr);
            jsonStr = jsonStrNew;
        }
        // console.log('[Server]header : Access-Control-Allow-Origin');
        structServer._res.setHeader('Access-Control-Allow-Origin', '*');
        structServer._res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        structServer._res.end(jsonStr);    
    } 
}