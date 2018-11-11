var fs = require('fs');
var path = require('path');

function DeviceUtilAppPC() {
    DeviceUtilBase.call(this);
}

DeviceUtilAppPC.prototype = new DeviceUtilBase();
DeviceUtilAppPC.prototype.constructor = DeviceUtilAppPC;

DeviceUtilAppPC.prototype.a = function () {
    DeviceUtilBase.prototype.a.apply(this, arguments);
    console.log("aa");
}

// 写文件
DeviceUtilAppPC.prototype.fileSystem.writeFile = function(filePath, data, callback) { // 异步方法
    // ModuleFileSystem.writeFileFromRoot(ModuleFileSystem._runPath + filePath, data, callback);
}
DeviceUtilAppPC.prototype.fileSystem.writeFileFromRoot = function(filePath, data, callback) {
    // var normalizePath = path.normalize(filePath);
    // fs.writeFile(normalizePath, data, function(err) {
    //     if (err) {
    //         console.log('写文件操作失败');
    //     } else {
    //         console.log('写文件操作成功');
    //         if (callback) {
    //             callback();
    //         }
    //     }
    // });
}
DeviceUtilAppPC.prototype.fileSystem.writeFileSync = function(filePath, data) { // 同步方法
    // ModuleFileSystem.writeFileFromRootSync(ModuleFileSystem._runPath + filePath, data);
}
DeviceUtilAppPC.prototype.fileSystem.writeFileFromRootSync = function(filePath, data) {
    var normalizePath = path.normalize(filePath);
    fs.writeFileSync(normalizePath, data);
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
    // return this.fileSystem.readFileFromRootSync(ModuleFileSystem._runPath + filePath);
}
DeviceUtilAppPC.prototype.fileSystem.readFileFromRootSync = function(filePath) {
    var normalizePath = path.normalize(filePath);
    return fs.readFileSync(normalizePath, "utf8");
}

// 删文件
DeviceUtilAppPC.prototype.fileSystem.delFile = function(filePath, callback) {
    // ModuleFileSystem.delFileFromRoot(ModuleFileSystem._runPath + filePath, callback);
}
DeviceUtilAppPC.prototype.fileSystem.delFileFromRoot = function(filePath, callback) {
    // var normalizePath = path.normalize(filePath);
    // fs.unlink(normalizePath, function (err) {
    //     if(err) throw err;
    //     console.log('成功')
    //     if (callback) {
    //         callback();
    //     }
    // })
}

// [demo] getDirFiles
// ModuleFileSystem.getDirFiles(filePath, function(err, files) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     files.forEach(function (file) {
//         var filePath = filePath + '/' + file;
//     });
// });
DeviceUtilAppPC.prototype.fileSystem.getDirFiles = function(filePath, callback) {
    // return ModuleFileSystem.getDirFilesFromRoot(ModuleFileSystem._runPath + filePath, callback);
}
DeviceUtilAppPC.prototype.fileSystem.getDirFilesFromRoot = function(filePath, callback) {
    // var normalizePath = path.normalize(filePath);
    // fs.readdir(normalizePath, function (err, files) {
    //     callback(err, files);
    // });
}
DeviceUtilAppPC.prototype.fileSystem.getDirFilesSync = function(filePath) {
    // return ModuleFileSystem.getDirFilesFromRootSync(ModuleFileSystem._runPath + filePath);
}
DeviceUtilAppPC.prototype.fileSystem.getDirFilesFromRootSync = function(filePath) {
    // var normalizePath = path.normalize(filePath);
    // return fs.readdirSync(normalizePath);
}
DeviceUtilAppPC.prototype.fileSystem.getStat = function(filePath) {
    // return ModuleFileSystem.getStatFromRoot(ModuleFileSystem._runPath + filePath);
}
DeviceUtilAppPC.prototype.fileSystem.getStatFromRoot = function(filePath) {
    // var normalizePath = path.normalize(filePath);
    // return stat = fs.statSync(normalizePath);
}
DeviceUtilAppPC.prototype.fileSystem.isDir = function(stat) {
    // return stat.isDirectory();
}
DeviceUtilAppPC.prototype.fileSystem.isFile = function(stat) {
    // return stat.isFile();
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
//     var path = require("path");
//     var dataPath = require('nw.gui').App.dataPath; // 数据存储地址
//     console.log(dataPath);
//     console.log("a");
// }
// DeviceUtilAppPC.fileBrowser.addFolder = function () {
//     console.log("addFolder");
// }
