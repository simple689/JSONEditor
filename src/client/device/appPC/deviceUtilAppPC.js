function DeviceUtilAppPC() {
    DeviceUtilBase.call(this);
}

DeviceUtilAppPC.prototype = new DeviceUtilBase();
DeviceUtilAppPC.prototype.constructor = DeviceUtilAppPC;

DeviceUtilAppPC.prototype.a = function () {
    DeviceUtilBase.prototype.a.apply(this, arguments);
    console.log("aa");
}

// 读文件
DeviceUtilAppPC.prototype.fileSystem.readFile = function(filePath, callback) { // 异步方法
    // this.fileSystem.readFileFromRoot(ModuleFileSystem._runPath + filePath, callback);
}
DeviceUtilAppPC.prototype.fileSystem.readFileFromRoot = function(filePath, callback) {
    // var normalizePath = path.normalize(filePath);
    // fs.readFile(normalizePath, "utf8", function(err, data) {
    //     if (err) {
    //         console.log('读文件操作失败');
    //     } else {
    //         console.log('读文件操作成功');
    //         if (callback) {
    //             callback();
    //         }
    //     }
    // });
}
DeviceUtilAppPC.prototype.fileSystem.readFileSync = function(filePath) { // 同步方法
    return this.fileSystem.readFileFromRootSync(ModuleFileSystem._runPath + filePath);
}
DeviceUtilAppPC.prototype.fileSystem.readFileFromRootSync = function(filePath, data) {
    var normalizePath = path.normalize(filePath);
    return fs.readFileSync(normalizePath, "utf8");
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
