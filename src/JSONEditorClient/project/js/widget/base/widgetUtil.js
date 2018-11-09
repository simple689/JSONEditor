function getElementById(id) {
    return document.getElementById(id);
}

function removeFileFolder(str) {
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
function removeFileExtend(str) {
    var index = str.lastIndexOf(".");
    var strNew = str.substring(0, index);
    return strNew;
}
function changeFileExtend(str, extend) {
    var strNew = removeFileExtend(str);
    strNew += extend;
    return strNew;
}
function getFileExtend(str) {
    var index = str.lastIndexOf(".");
    var strNew = "";
    if (index != -1) {
        strNew = str.substr(index);
    }
    return strNew;
}
function equalFileExtend(str, extend) {
    return str.toLowerCase() == extend.toLowerCase();
}
function getFileTitle(str) {
    var strNew = removeFileFolder(str);
    strNew = removeFileExtend(str);
    return strNew;
}
function openFile(fileExtend, onChange) {
    var element = WidgetHtml.createElement("input");
    element.type = WidgetKey._file;
    element._fileExtend = fileExtend;
    element.onchange = onChange;
    element.click();
}
function downloadFileJson(jsonObjCtrl) {
    var name = jsonObjCtrl._exec._elementTabTitle._title;
    var jsonStr = JSON.stringify(jsonObjCtrl._obj, null, 2); // 将字符串对象转换为JSON对象
    var element = WidgetHtml.createElement("a");
    // element.setAttribute('href', 'data:text/text; base64,' + '77u/' + base64encode(utf16to8(jsonStr))); // base64_old.js
    element.setAttribute('href', 'data:text/text; base64,' + '77u/' + base64.encode(jsonStr));
    element.setAttribute('download', name);
    element.click();
}
