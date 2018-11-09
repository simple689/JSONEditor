const API = require('../API/API.js');
const APIData = require('../API/APIData.js');
const APIUtil = require('../API/APIUtil.js');
const Util = require('../base/util.js');

var mysql = require('mysql');

module.exports = ModuleMysql;

function ModuleMysql() {
}
ModuleMysql._db = null;

ModuleMysql.init = function(server) {
    try {
        var conf = server._conf;
        ModuleMysql._db = mysql.createConnection({
            host : '127.0.0.1',
            port: '3306',
            user : 'teddy',
            password : '199068',
            database : conf._mysql._db
        });
        ModuleMysql._db.connect(function(e) {
            if (e) {
                ModuleMysql._db = null;
                console.log("[Mysql]error : ", e);
            }
        });
        // ModuleMysql._db.query('SELECT *', function (err, result) {
        //     if (err)
        //         console.log("[Mysql]error : ", err.message);
        //     console.log("[Mysql]result : ", result);
        // });
    } catch(e) {
        console.log("[Mysql]error : ", e);
    }
}
ModuleMysql.exit = function(server) {
    ModuleMysql._db.end();
}

ModuleMysql.prototype.handle = function(structServer) {
    var funcStr = structServer._jsonClient[APIData._func];
    if (funcStr === API._func._mysql._add) {
        this.add(structServer);
    } else if (funcStr === API._func._mysql._del) {
        this.del(structServer);
    } else if (funcStr === API._func._mysql._up) {
        this.up(structServer);
    } else if (funcStr === API._func._mysql._query) {
        this.query(structServer);
    }
}
// 增、删、改、查
ModuleMysql.prototype.add = function(structServer) {
    var sql = 'INSERT INTO ' + structServer._jsonClient.table + 
              '(id,name,age) VALUES(0,?,?)';
    var sqlParam = ['Wilson', 55];
    ModuleMysql.addSql(sql, sqlParam, structServer);
}
ModuleMysql.prototype.del = function(structServer) {
    var sql = 'DELETE FROM ' + structServer._jsonClient.table + 
              'WHERE ' + key + '=' + value;
    ModuleMysql.delSql(sql, structServer);
}
ModuleMysql.prototype.up = function(structServer) {
    var sql = 'UPDATE ' + structServer._jsonClient.table + 
              'SET name = ?,age = ? WHERE id = ?';
    var sqlParam = ['Hello World', 99, 7];
    ModuleMysql.upSql(sql, sqlParam, structServer);
}
ModuleMysql.prototype.query = function(structServer) {
    var sql = 'SELECT * FROM ' + structServer._jsonClient.table;
    ModuleMysql.querySql(sql, structServer);
}

ModuleMysql.addSql = function(sql, sqlParam, structServer, callback) {
    console.log("[Mysql]add : ", sql);
    ModuleMysql._db.query(sql, sqlParam, function(err, result) {
        ModuleMysql.complete(err, result, structServer, callback);
    });
}
ModuleMysql.delSql = function(sql, structServer, callback) {
    console.log("[Mysql]del : ", sql);
    ModuleMysql._db.query(sql, function(err, result) {
        ModuleMysql.complete(err, result, structServer, callback);
    });
}
ModuleMysql.upSql = function(sql, sqlParam, structServer, callback) {
    console.log("[Mysql]up : ", sql);
    ModuleMysql._db.query(sql, sqlParam, function(err, result) {
        ModuleMysql.complete(err, result, structServer, callback);
    });
}
ModuleMysql.querySql = function(sql, structServer, callback) {
    console.log("[Mysql]query : ", sql);
    ModuleMysql._db.query(sql, function(err, result) {
        ModuleMysql.complete(err, result, structServer, callback);
    });
}

ModuleMysql.complete = function(err, result, structServer, callback) {
    if (err) {
        console.log("[Mysql]error : ", err.message);
    }
    console.log("[Mysql]result : ", result);
    if (callback) {
        callback(err, result, structServer);
    } else {
        if (structServer && structServer._funcComplete) {
            structServer._funcComplete(err, result, structServer);
        }
    }
}