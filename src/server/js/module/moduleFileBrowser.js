const API = require('../API/API.js');
const APIData = require('../API/APIData.js');
const APIUtil = require('../API/APIUtil.js');
const Util = require('../base/util.js');

const ModuleFileSystem = require('./moduleFileSystem.js');
const ModuleMysql = require('./moduleMysql.js');

module.exports = ModuleFileBrowser;

function ModuleFileBrowser() {
}

ModuleFileBrowser._jsonStore = null;
ModuleFileBrowser._jsonPersonal = null;

ModuleFileBrowser.init = function(server) {
    ModuleFileBrowser._jsonStore = {};
    ModuleFileBrowser.initDir(server._conf._pathResStore, ModuleFileBrowser._jsonStore);

    ModuleFileBrowser._jsonPersonal = {};
}
ModuleFileBrowser.initDir = function(readPath, jsonObj) {
    var files = ModuleFileSystem.getDirFilesSync(readPath);
    if (!files) {
        return;
    }
    files.forEach(function (file) {
        var filePath = readPath + '/' + file;
        var stat = ModuleFileSystem.getStat(filePath);
        if (ModuleFileSystem.isDir(stat)) {
            var jsonObjFold = APIUtil.fileBrowser.addFolder(jsonObj, file);
            ModuleFileBrowser.initDir(filePath, jsonObjFold);
        } else if (ModuleFileSystem.isFile(stat)) {
            if (file === ".DS_Store") {
                return;
            }
            var extend = Util.getFileExtend(file);
            APIUtil.fileBrowser.addFile(jsonObj, file, extend);
        }
    });
}

ModuleFileBrowser.prototype.handle = function(structServer) {
    structServer._jsonServer[APIData._data] = {};

    var funcStr = structServer._jsonClient[APIData._func];
    if (funcStr === API._func._fileBrowser._query) {
        this.query(structServer);
    } else if (funcStr === API._func._fileBrowser._up) {
        this.up(structServer);
    }
}
ModuleFileBrowser.prototype.query = function(structServer) {
    var typeStr = structServer._jsonClient[APIData._type];

    if (typeStr === API._fileBrowser._type._all) {
        structServer._jsonServer[APIData._data][APIData._storeShow] = ModuleFileBrowser._jsonStore;
        structServer._jsonServer[APIData._data][APIData._personalShow] = ModuleFileBrowser._jsonPersonal;
    } else if (typeStr === API._fileBrowser._type._store) {
        structServer._jsonServer[APIData._data][APIData._storeShow] = ModuleFileBrowser._jsonStore;
    } else if (typeStr === API._fileBrowser._type._personal) {
        structServer._jsonServer[APIData._data][APIData._personalShow] = ModuleFileBrowser._jsonPersonal;
    }

    // 查询数据库
    var userName = structServer._jsonClient[APIData._userName];
    userName = "b";

    var conf = structServer._server._conf;
    var sql = "SELECT * FROM " + conf._mysqlTable._fileBrowser + 
              " WHERE " + conf._mysqlFileBrowser._name + " = '" + userName + "';";
    ModuleMysql.querySql(sql, structServer, ModuleFileBrowser.dbCompleteQuery);
}
ModuleFileBrowser.dbCompleteQuery = function (err, result, structServer) {
    if (err) {
    } else {
        // structServer._jsonServer[APIData._data] = result;
        structServer._funcComplete(structServer);
    }
}
ModuleFileBrowser.prototype.up = function(structServer) {
    var typeStr = structServer._jsonClient[APIData._type];

    if (typeStr === API._fileBrowser._type._all) {
        ModuleFileBrowser._jsonStore = structServer._jsonClient[APIData._data][APIData._storeShow];
        ModuleFileBrowser._jsonPersonal = structServer._jsonClient[APIData._data][APIData._personalShow];
    } else if (typeStr === API._fileBrowser._type._store) {
        ModuleFileBrowser._jsonStore = structServer._jsonClient[APIData._data];
    } else if (typeStr === API._fileBrowser._type._personal) {
        ModuleFileBrowser._jsonPersonal = structServer._jsonClient[APIData._data];
    }
    // todo 存入数据库
    // 用户名
    var userName = structServer._jsonClient[APIData._userName];
    userName = "b";
    var data = structServer._jsonClient[APIData._data];
    var token = structServer._jsonClient[APIData._token];

    var conf = structServer._server._conf;
    var sql = "SELECT " + conf._mysqlFileBrowser._id + " FROM " + conf._mysqlTable._fileBrowser + 
              " WHERE " + conf._mysqlFileBrowser._name + " = '" + userName + "';";
    ModuleMysql.querySql(sql, structServer, ModuleFileBrowser.dbCompleteUpGetId);
}
ModuleFileBrowser.dbCompleteUpGetId = function (err, result, structServer) {
    if (err) {
    } else {
        var conf = structServer._server._conf;
        var data = "c";

        // var jsonResult = JSON.stringify(result); // 转换成JSON String格式
        // console.log(jsonResult);
        for (var i in result) {
            var item = result[i];
            // console.log(item);
            var id = item["id"];
            console.log(id);

            var sql = "UPDATE " + conf._mysqlTable._fileBrowser + 
                      " SET " + conf._mysqlFileBrowser._personal + " = '" + data + "'" +
                      " WHERE " + conf._mysqlFileBrowser._id + " = '" + id + "';";
            ModuleMysql.querySql(sql, structServer, ModuleFileBrowser.dbCompleteUp);
        }
    }
}
ModuleFileBrowser.dbCompleteUp = function (err, result, structServer) {
    if (err) {
    } else {
        structServer._jsonServer[APIData._token] = "123";
        structServer._funcComplete(structServer);
    }
}