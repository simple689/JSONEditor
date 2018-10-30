var mysql = require('mysql');
var fs = require('fs');
var http = require('http');
var url = require('url');   
var querystring = require("querystring");

var httpObj = http.createServer(function(req, res) {
    console.log('req.url : ' + req.url);
    var urlList = req.url.split('?');
    var qs = querystring.parse(urlList[1]);
    if (params.jsonpCallback) { // 请求为携带jsonp方法的http请求
        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
        var data = {
            "name": "Monkey"
        };
        data = JSON.stringify(data);
        var callback = params.jsonpCallback + '(' + data + ');';
        res.end(callback);
    } else {
        res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        res.end('Hell World\n');    
    } 
    console.log('进来了！');
});
httpObj.listen(6989, '127.0.0.1', function() {
    console.log('Server running at http://127.0.0.1:6989');
})
return;

var db = mysql.createConnection({
    host : '127.0.0.1',
    port: '3306',
    user : 'teddy',
    password : '199068',
    database : 'ZHEditor'
});
db.connect();

var httpObj = http.createServer(function(req, res) {
    console.log('req.url : ' + req.url); // 日志文件
    if (req.url.indexOf('getNews') != 1) {
        // 从数据库拿数据
        console.log('进来了！');
        db.query('select * from news', function(err, data) {
            if (!err) {
                // res.writeHead(200, {'Content-Type':'text/plain'});
                // res.end('hello nodeJS 1');
                res.write(JSON.stringify(data));
                res.end();
            }
        });
    } else {
        fs.readFile('www' + req.url, function(err, data) {
            console.log('www' + req.url);
            if (!err) {
                res.write(data);
                res.end();
            } else {
                res.write('404');
                res.end();
            }
        });
    }
});

httpObj.listen(6989, '127.0.0.1', function() {
    console.log('Server running at http://127.0.0.1:6989');
})

// mysql
var table = 'node_user';
db.query( 
    'SELECT * FROM ' + table, 
    function selectCb(err, result, fields) { 
        if (err) {
            console.log('%s', err)
            // throw err;
        } 
        if (result) {
            for (var i = 0; i < result.length; i++) {
                console.log("%d\t%s\t%s", result[i].id, result[i].name, result[i].age);
            }
        }   
    } 
);

// mysql 增、删、改、查
// 增 add
var addSql = 'INSERT INTO ' + table +'(id,name,age) VALUES(0,?,?)';
var addSql_Param = ['Wilson', 55];
db.query(addSql, addSql_Param, function(err, result) {
    if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }       
    console.log('-------INSERT----------');
    //console.log('INSERT ID:', result.insertId);       
    console.log('INSERT ID:', result);       
    console.log('#######################'); 
});
//改 up
var userModSql = 'UPDATE node_user SET name = ?,age = ? WHERE id = ?';
var userModSql_Params = ['Hello World',99,7];
db.query(userModSql, userModSql_Params, function(err, result) {
    if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
    }       
    console.log('----------UPDATE-------------');
    console.log('UPDATE affectedRows', result.affectedRows);
    console.log('******************************');
});
//查 query
var userGetSql = 'SELECT * FROM node_user';
db.query(userGetSql, function(err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }       
    console.log('---------------SELECT----------------');
    console.log(result);       
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'); 
});
// 删除 del
var userDelSql = 'DELETE FROM node_user WHERE id = 7';
db.query(userDelSql, function(err, result) {
    if (err) {
        console.log('[DELETE ERROR] - ', err.message);
        return;
    }       
    console.log('-------------DELETE--------------');
    console.log('DELETE affectedRows', result.affectedRows);
    console.log('&&&&&&&&&&&&&&&&&'); 
});

db.end();