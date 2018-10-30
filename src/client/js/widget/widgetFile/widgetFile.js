function WidgetFile() {
}

WidgetFile.readFile = function (file, elementTabContent) {
    var reader = new FileReader();
    reader._elementTabContent = elementTabContent;

    var extend = getFileExtend(file.name);
    if (file.type.match("application/json") || equalFileExtend(extend, APIData._extendJson)) {
        reader.onload = WidgetFile.loadedJson;
        reader.readAsText(file);
    } else if (file.type.match(/image*/)) {
        reader.onload = WidgetFile.loadedImg;
        reader.readAsDataURL(file);
    } else {
        reader.onload = WidgetFile.loadedFile;
        reader.readAsText(file);
    }
}
WidgetFile.readFileContent = function (fileContent, elementTabContent, contentType) {
    var elementFileRoot = WidgetHtml.addDiv(elementTabContent);
    WidgetHtml.classAdd(elementFileRoot, "widgetFileRoot");

    elementTabContent._elementFileRoot = elementFileRoot;

    var extend = getFileExtend(elementTabContent._elementTabTitle._title);
    if (equalFileExtend(extend, APIData._extendJson)) {
        elementTabContent._widgetFileBase = new WidgetFileJson();
    } else if (equalFileExtend(extend, APIData._extendJsonMd)) {
        elementTabContent._widgetFileBase = new WidgetFileJsonMould();
    }
    elementTabContent._widgetFileBase.init(elementTabContent, fileContent, contentType);
    // WidgetHistory.addFile(elementTabContent._elementTabTitle._title, fileContent, contentType, elementTabContent._elementTabTitle._widgetTab._exec._historyItem);
}
WidgetFile.loadedJson = function () {
    WidgetFile.createFileJsonCtrl(this);
    this._elementTabContent._elementTabTitle._widgetTab._exec.loadedJson(this);
}
WidgetFile.loadedImg = function () {
    // var img = WidgetHtml.createElement("img");
    // WidgetHtml.classAdd(img, "obj");
    // img.file = file;
    // console.log(reader.result);
    // img.src = reader.result;
}
WidgetFile.loadedFile = function (e) {
    if (WidgetFile.isJson(this.result)) {
        WidgetFile.createFileJsonCtrl(this);
    }
}
WidgetFile.createFileJsonCtrl = function (fileReader) {
    // WidgetLog.log(fileReader.result);
    WidgetFile.readFileContent(fileReader.result, fileReader._elementTabContent, WidgetTab._enumAddContentType.fileContent);
}
WidgetFile.isJson = function (fileStr) {
    var isjson = false;
    try {
        var jsonObj = JSON.parse(fileStr);
        isjson = typeof(jsonObj) == "object" && Object.prototype.toString.call(jsonObj).toLowerCase() == "[object object]" && fileStr.length > 0;
    } catch (exception) {
        isjson = false;
    }
    // WidgetLog.log("isjson = " + isjson);
    return isjson;
}
