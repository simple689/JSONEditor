(function () {
    var root = typeof window === 'object' ? window : {};
    var js_node = typeof process === 'object' && process.versions && process.versions.node;
    if (js_node) {
        root = global;
        root.APIData = APIData;
    }

    var js_module = typeof module === 'object' && module.exports;
    if (js_module) {
        module.exports = APIData;
    }
})();

function APIData() {
}

APIData._module = "module";
APIData._func = "func";

APIData._type = "type";
APIData._data = "data";
APIData._token = "token";
// KeyBase._title = "title";
APIData._extend = "extend";
APIData._isCheck = "isCheck";
APIData._widgetID = "widgetID";

APIData._fileList = "fileList";
APIData._folderList = "folderList";

APIData._folder = "folder";
// KeyBase._file = "file";

// KeyBase._fileName = "fileName";
// KeyBase._fileContent = "fileContent";

APIData._json = "json";
APIData._jsonShow = "json";
APIData._jsonMould = "jsonMould";
APIData._jsonMouldShow = "json模版";

APIData._extendJson = ".json";
APIData._extendJsonMd = ".jsonMd";

APIData._userName = "userName";
APIData._userPWD = "userPWD";

APIData._storeShow = "商城";
APIData._personalShow = "个人文件夹";
APIData._stateMenuFold = "stateMenuFold";
APIData._stateFlex = "stateFlex";
