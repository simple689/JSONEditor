function DeviceUtilAppPC() {
    DeviceUtilBase.call(this);
}

DeviceUtilAppPC.prototype = new DeviceUtilBase();
DeviceUtilAppPC.prototype.constructor = DeviceUtilAppPC;

DeviceUtilAppPC.prototype.a = function () {
    DeviceUtilBase.prototype.a.apply(this, arguments);
    console.log("aa");
}

// DeviceUtilAppPC.fileBrowser = {};
// fileBrowser
// 获取文件浏览器目录结构
// 添加文件夹
// 删除文件夹
// 添加文件
// 删除文件
// 刷新文件浏览器目录结构
// 读取文件
// 保存文件
// DeviceUtilAppPC.fileBrowser.a = function () {
//     DeviceUtilBase.prototype.a.apply(this, arguments);
//
//     var path = require("path");
//     var dataPath = require('nw.gui').App.dataPath; // 数据存储地址
//     console.log(dataPath);
//     console.log("a");
// }
// DeviceUtilAppPC.fileBrowser.addFolder = function () {
//     console.log("addFolder");
// }
