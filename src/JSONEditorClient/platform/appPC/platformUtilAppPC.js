function PlatformUtilAppPC() {
    PlatformUtilBase.call(this);
}

PlatformUtilAppPC.prototype = new PlatformUtilBase();
PlatformUtilAppPC.prototype.constructor = PlatformUtilAppPC;

PlatformUtilAppPC.fileBrowser = {};
// fileBrowser
// 获取文件浏览器目录结构
// 添加文件夹
// 删除文件夹
// 添加文件
// 删除文件
// 刷新文件浏览器目录结构
// 读取文件
// 保存文件
PlatformUtilAppPC.fileBrowser.a = function () {
    PlatformUtilBase.prototype.a.apply(this, arguments);

    var path = require("path");
    var dataPath = require('nw.gui').App.dataPath; // 数据存储地址
    console.log(dataPath);
    console.log("a");
}
PlatformUtilAppPC.fileBrowser.addFolder = function () {
    console.log("addFolder");
}
