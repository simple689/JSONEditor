const API = require('../API/API.js');
const APIData = require('../API/APIData.js');
const APIUtil = require('../API/APIUtil.js');
const Util = require('../base/util.js');

var fs = require('fs');
var path = require('path') 

module.exports = ModuleFileSystem;

function ModuleFileSystem() {
}

ModuleFileSystem._runPath = process.cwd();

ModuleFileSystem.prototype.handle = function(structServer) {
    // 图片的复制与粘贴
    // 打开文件(fs.open)
    // 给文件添加数据(fs.appendFile)
    // 创建文件(fs.open)
    // 删除文件夹(fs.rmdir)
    // 创建文件夹(fs.mkdir)
    // 文件监听(fs.watch fs.watchFile)

    var funcStr = structServer._jsonClient[APIData._func];
    if (funcStr === API._func._fileSystem._fileWrite) { // 写文件(fs.writeFile)
        this.fileWrite(structServer);
    } else if (funcStr === API._func._fileSystem._fileRead) { // 读文件(fs.readFile)
        this.fileRead(structServer);
    } else if (funcStr === API._func._fileSystem._fileDel) { // 删除文件(fs.unlink)
        this.fileDel(structServer);
    }
}
ModuleFileSystem.prototype.fileWrite = function(structServer) {
    // ModuleFileSystem.writeFile();
}
ModuleFileSystem.prototype.fileRead = function(structServer) {
    // ModuleFileSystem.readFile();
}
ModuleFileSystem.prototype.fileDel = function(structServer) {
    // ModuleFileSystem.delFile();
}

// 写文件
ModuleFileSystem.writeFile = function(filePath, data, callback) { // 异步方法
    ModuleFileSystem.writeFileFromRoot(ModuleFileSystem._runPath + filePath, data, callback);
}
ModuleFileSystem.writeFileFromRoot = function(filePath, data, callback) {
    var normalizePath = path.normalize(filePath);
    fs.writeFile(normalizePath, data, function(err) {
        if (err) {
            console.log('写文件操作失败');
        } else {
            console.log('写文件操作成功');
            if (callback) {
                callback();
            }
        }
    });
}
ModuleFileSystem.writeFileSync = function(filePath, data) { // 同步方法
    ModuleFileSystem.writeFileFromRootSync(ModuleFileSystem._runPath + filePath, data);
}
ModuleFileSystem.writeFileFromRootSync = function(filePath, data) {
    var normalizePath = path.normalize(filePath);
    fs.writeFileSync(normalizePath, data);
}

// 读文件
ModuleFileSystem.readFile = function(filePath, callback) { // 异步方法
    ModuleFileSystem.readFileFromRoot(ModuleFileSystem._runPath + filePath, callback);
}
ModuleFileSystem.readFileFromRoot = function(filePath, callback) {
    var normalizePath = path.normalize(filePath);
    fs.readFile(normalizePath, "utf8", function(err, data) {
        if (err) {
            console.log('读文件操作失败');
        } else {
            console.log('读文件操作成功');
            if (callback) {
                callback();
            }
        }
    });
}
ModuleFileSystem.readFileSync = function(filePath) { // 同步方法
    return ModuleFileSystem.readFileFromRootSync(ModuleFileSystem._runPath + filePath);
}
ModuleFileSystem.readFileFromRootSync = function(filePath, data) {
    var normalizePath = path.normalize(filePath);
    return fs.readFileSync(normalizePath, "utf8");
}

// 删文件
ModuleFileSystem.delFile = function(filePath, callback) {
    ModuleFileSystem.delFileFromRoot(ModuleFileSystem._runPath + filePath, callback);
}
ModuleFileSystem.delFileFromRoot = function(filePath, callback) {
    var normalizePath = path.normalize(filePath);
    fs.unlink(normalizePath, function (err) {
        if(err) throw err;
        console.log('成功')
        if (callback) {
            callback();
        }
    })
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
ModuleFileSystem.getDirFiles = function(filePath, callback) {
    return ModuleFileSystem.getDirFilesFromRoot(ModuleFileSystem._runPath + filePath, callback);
}
ModuleFileSystem.getDirFilesFromRoot = function(filePath, callback) {
    var normalizePath = path.normalize(filePath);
    fs.readdir(normalizePath, function (err, files) {
        callback(err, files);
    });
}
ModuleFileSystem.getDirFilesSync = function(filePath) {
    return ModuleFileSystem.getDirFilesFromRootSync(ModuleFileSystem._runPath + filePath);
}
ModuleFileSystem.getDirFilesFromRootSync = function(filePath) {
    var normalizePath = path.normalize(filePath);
    return fs.readdirSync(normalizePath);
}
ModuleFileSystem.getStat = function(filePath) {
    return ModuleFileSystem.getStatFromRoot(ModuleFileSystem._runPath + filePath);
}
ModuleFileSystem.getStatFromRoot = function(filePath) {
    var normalizePath = path.normalize(filePath);
    return stat = fs.statSync(normalizePath);
}
ModuleFileSystem.isDir = function(stat) {
    return stat.isDirectory();
}
ModuleFileSystem.isFile = function(stat) {
    return stat.isFile();
}