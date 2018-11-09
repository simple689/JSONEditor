(function () {
    var root = typeof window === 'object' ? window : {};
    var js_node = typeof process === 'object' && process.versions && process.versions.node;
    if (js_node) {
        root = global;
        root.PlatformUtil = PlatformUtil;
    }
})();

function PlatformUtil() {
}

PlatformUtil.fileBrowser = {};
// fileBrowser
// 获取文件浏览器目录结构
// 添加文件夹
// 删除文件夹
// 添加文件
// 删除文件
// 刷新文件浏览器目录结构
// 读取文件
// 保存文件
PlatformUtil.fileBrowser.a = function () {
    var path = require("path");
    var dataPath = require('nw.gui').App.dataPath; // 数据存储地址
    console.log(dataPath);
    console.log("a");
}
PlatformUtil.fileBrowser.addFolder = function () {
    console.log("a");
}
