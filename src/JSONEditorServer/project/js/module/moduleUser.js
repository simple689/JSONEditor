const API = require('../API/API.js');
const APIData = require('../API/APIData.js');
const APIUtil = require('../API/APIUtil.js');
const Util = require('../base/util.js');

const ModuleMysql = require('./moduleMysql.js');

module.exports = ModuleUser;

function ModuleUser() {
}

ModuleUser.init = function(server) {
}

ModuleUser.prototype.handle = function(structServer) {
    var funcStr = structServer._jsonClient[APIData._func];
    if (funcStr === API._func._user._login) {
        this.login(structServer);
    } else if (funcStr === API._func._user._forgetPWD) {
        this.forgetPWD(structServer);
    } else if (funcStr === API._func._user._register) {
        this.register(structServer);
    }
}
ModuleUser.prototype.login = function(structServer) {
    var jsonObj = structServer._jsonClient;
    var userName = jsonObj[APIData._userName];
    var userPWD = jsonObj[APIData._userPWD];
    // todo 读取数据库 未来加token
    var conf = structServer._server._conf;
    var sql = "SELECT * FROM " + conf._mysqlTable._user + 
              " WHERE " + conf._mysqlUser._name + " = '" + userName + "';";
    ModuleMysql.querySql(sql, structServer, ModuleUser.dbCompleteLogin);
}
ModuleUser.dbCompleteLogin = function (err, result, structServer) {
    if (err) {
    } else {
        // 登录成功
        // todo 返回数据
        structServer._jsonServer[APIData._token] = "123";
        // 返回个人文件夹
        structServer._funcComplete(structServer);
    }
}
ModuleUser.prototype.forgetPWD = function(structServer) {
}
ModuleUser.prototype.register = function(structServer) {
}