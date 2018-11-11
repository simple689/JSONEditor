function DeviceUtilBase() {
}

DeviceUtilBase.prototype.a = function() {
    console.log("a");
}

DeviceUtilBase.prototype.fileSystem = {};
DeviceUtilBase.prototype.fileBrowser = {};

// 读文件
DeviceUtilBase.prototype.fileSystem.readFile = function() { // 异步方法
}
DeviceUtilBase.prototype.fileSystem.readFileSync = function() { // 同步方法
}

DeviceUtilBase.prototype.fileBrowser.b = function() {
    console.log("b");
}
