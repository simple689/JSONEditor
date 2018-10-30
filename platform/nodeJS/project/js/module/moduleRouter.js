const API = require('../API/API.js');
const APIData = require('../API/APIData.js');
const APIUtil = require('../API/APIUtil.js');
const Util = require('../base/util.js');

const ModuleMysql = require('./moduleMysql.js');
const ModuleFileSystem = require('./moduleFileSystem.js');
const ModuleFormData = require('./moduleFormData.js');
const ModuleUser = require('./moduleUser.js');
const ModuleFileBrowser = require('./moduleFileBrowser.js');

module.exports = ModuleRouter;

function ModuleRouter() {
}

ModuleRouter.init = function(server) {
    ModuleMysql.init(server);
    ModuleFileBrowser.init(server);
}

ModuleRouter.handle = function(structServer) {
    var jsonClientStr = JSON.stringify(structServer._jsonClient);
    console.log('[server]jsonClient : ', jsonClientStr);

    var moduleStr = structServer._jsonClient[APIData._module];
    if (moduleStr) {
        structServer._jsonServer[APIData._module] = moduleStr;
    }
    var router = null;
    if (moduleStr === API._module._mysql) {
        router = new ModuleMysql();
    } else if (moduleStr === API._module._fileSystem) {
        router = new ModuleFileSystem();
    } else if (moduleStr === API._module._formData) { // 暂时不用
        router = new ModuleFormData();
    } else if (moduleStr === API._module._user) {
        router = new ModuleUser();
    } else if (moduleStr === API._module._fileBrowser) {
        router = new ModuleFileBrowser();
    } else {
        structServer._funcComplete(structServer);
    }
    if (router) {
        router.handle(structServer);
    }
}

ModuleRouter.test = function() {
    // ModuleFileSystem.readDir('/res/fileBrowser');
    // ModuleFileSystem.writeFile('/res/a', "aa");
}