module.exports = Util;

function Util() {
}

Util.removeFileFolder = function(str) {
    var strNew = str;
    if (strNew == "\/") {
        return "";
    }
    if (strNew[strNew.length - 1] == "\/") {
        strNew = strNew.substring(0, strNew.length - 1);
    }
    var index = strNew.lastIndexOf("\/");
    strNew = strNew.substring(index + 1, strNew.length);
    return strNew;
}
Util.removeFileExtend = function(str) {
    var index = str.lastIndexOf(".");
    var strNew = str.substring(0, index);
    return strNew;
}
Util.changeFileExtend = function(str, extend) {
    var strNew = removeFileExtend(str);
    strNew += extend;
    return strNew;
}
Util.getFileExtend = function(str) {
    var index = str.lastIndexOf(".");
    var strNew = "";
    if (index != -1) {
        strNew = str.substr(index);
        // strNew = strNew.toLowerCase();
    }
    return strNew;
}
Util.getFileTitle = function(str) {
    var strNew = removeFileFolder(str);
    strNew = removeFileExtend(str);
    return strNew;
}