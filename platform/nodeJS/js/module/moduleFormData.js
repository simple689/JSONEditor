const API = require('../API/API.js');
const APIData = require('../API/APIData.js');
const APIUtil = require('../API/APIUtil.js');
const Util = require('../base/util.js');

var multiparty = require('multiparty');
var fs = require('fs');

module.exports = ModuleFormData;

function ModuleFormData() {
}

ModuleFormData.prototype.handle = function(structServer) {
    structServer._funcComplete(structServer);
}

    // var jsonObj = "success";
    // var form = new multiparty.Form();
    // form.parse(structServer._req, function(err, fields, files) {
    //     Object.keys(fields).forEach(function(name) {
    //         console.log('got field named ' + name);
    //     });
    //     Object.keys(files).forEach(function(name) {
    //         console.log('got file named ' + name);
    //     });
    //     jsonObj = {
    //         "name": "file"
    //     };
    //     var a = fields.path;
    //     var b = fields.file;
    //     var c = b[0];
    //     var d = JSON.parse(c);
    //     var e = d.module;
    //     // fs.readFile(fields.path[0], function(err, jsonObj) {
    //     //     if (!jsonObj || err) {
    //     //         return ryply({code:401,msg:"请上传身份证正面照片"});
    //     //     }
    //     //     var fileName = fields.originalFilename;
    //     //     var types = fileName.split('.'); // 将文件名以.分隔，取得数组最后一项作为文件后缀名。
    //     //     var picType = String(types[types.length-1]).toLocaleLowerCase();
    //     //     if (picType=="jpg" || picType=="png" || picType=="jpeg") {
    //     //         var date = new Date();
    //     //         var ms = Date.parse(date); //计算当前时间与1970年1月1日午夜相差的毫秒数 赋值给ms以确保文件名无重复。
    //     //         forntPath = appDir+"/kycFiles/front"+ ms +"." + String(types[types.length-1]);
    //     //         fs.renameSync(files.idCardFront[0].path, forntPath);
    //     //     } else {
    //     //         return reply({code:411,msg:"身份证正面照片格式不正确"});
    //     //     }
    //     // });
    //     structServer._funcComplete(structServer, jsonObj);
    // });