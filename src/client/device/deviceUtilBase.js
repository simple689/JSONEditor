function DeviceUtilBase() {
}

DeviceUtilBase.prototype.a = function() {
}

DeviceUtilBase.prototype.fileSystem = {};
DeviceUtilBase.prototype.fileBrowser = {};

// 写文件
DeviceUtilBase.prototype.fileSystem.writeFile = function(filePath, data, callback) { // 异步方法
}
DeviceUtilBase.prototype.fileSystem.writeFileFromRoot = function(filePath, data, callback) {
}
DeviceUtilBase.prototype.fileSystem.writeFileSync = function(filePath, data) { // 同步方法
}
DeviceUtilBase.prototype.fileSystem.writeFileFromRootSync = function(filePath, data) {
}

// 读文件
DeviceUtilBase.prototype.fileSystem.readFile = function(filePath, callback) { // 异步方法
}
DeviceUtilBase.prototype.fileSystem.readFileFromRoot = function(filePath, callback) {
}
DeviceUtilBase.prototype.fileSystem.readFileSync = function(filePath) { // 同步方法
}
DeviceUtilBase.prototype.fileSystem.readFileFromRootSync = function(filePath) {
}
