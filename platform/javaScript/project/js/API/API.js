(function () {
    var js_module = typeof module === 'object' && module.exports;
    if (js_module) {
        module.exports = API;
    }
})();

function API() {
}

// 模块类 module
API._module = {};
API._module._mysql = "mysql";
API._module._fileSystem = "fileSystem";
API._module._formData = "formData";
API._module._user = "user";
API._module._dock = "dock";
API._module._fileBrowser = "fileBrowser";

// 功能类 func
API._func = {};

// 功能 mysql
API._func._mysql = {};
API._func._mysql._add = "add";
API._func._mysql._del = "del";
API._func._mysql._up = "up";
API._func._mysql._query = "query";

// 功能 fileSystem
API._func._fileSystem = {};
API._func._fileSystem._fileWrite = "fileWrite";
API._func._fileSystem._fileRead = "fileRead";
API._func._fileSystem._fileDel = "fileDel";

// 功能 user
API._func._user = {};
API._func._user._login = "login";
API._func._user._forgetPWD = "forgetPWD";
API._func._user._register = "register";

// 功能 dock
API._func._dock = {};
API._func._dock._layoutLoad = "layoutLoad";
API._func._dock._layoutSave = "layoutSave";

// 功能 fileBrowser
API._func._fileBrowser = {};
API._func._fileBrowser._query = "query";
API._func._fileBrowser._up = "up";
// 特有数据
API._fileBrowser = {};
// 数据类型 fileBrowser
API._fileBrowser._type = {};
API._fileBrowser._type._all = "all";
API._fileBrowser._type._store = "store";
API._fileBrowser._type._personal = "personal";
API._fileBrowser._type._stateMenuFold = "stateMenuFold";
API._fileBrowser._type._stateFlex = "stateFlex";
