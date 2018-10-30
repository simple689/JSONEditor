(function () {
    var root = typeof window === 'object' ? window : {};
    var js_node = typeof process === 'object' && process.versions && process.versions.node;
    if (js_node) {
        root = global;
    }

    var js_require = typeof require === 'function';
    if (js_require) {
        var jsPath = "";
        if (global.document) {
            jsPath = document.scripts;
            jsPath = jsPath[jsPath.length - 1].src.substring(7, jsPath[jsPath.length - 1].src.lastIndexOf("/") + 1);
        }
        console.log(jsPath);        
        root.APIData = require(jsPath + './APIData.js');
    }

    var js_module = typeof module === 'object' && module.exports;
    if (js_module) {
        module.exports = APIUtil;
    }
})();

function APIUtil() {
}

APIUtil.fileBrowser = {};

// fileBrowser
APIUtil.fileBrowser.addFolder = function (jsonObj, key) {
    var list = jsonObj[APIData._folderList];
    if (!list) {
        jsonObj[APIData._folderList] = {}
        list = jsonObj[APIData._folderList];
    }
    list[key] = {};
    var obj = list[key];
    obj[APIData._type] = APIData._folder;
    obj[APIData._isCheck] = false;
    return obj;
}
APIUtil.fileBrowser.addFile = function (jsonObj, key, extend) {
    var list = jsonObj[APIData._fileList];
    if (!list) {
        jsonObj[APIData._fileList] = {}
        list = jsonObj[APIData._fileList];
    }
    list[key] = {};
    var obj = list[key];
    obj[APIData._extend] = extend;
}
