function WidgetFileBase() {
}

WidgetFileBase.prototype.init = function (elementTabContent, fileContent, contentType) {
    this._elementTabContent = elementTabContent;
    if (contentType == WidgetTab._enumAddContentType.fileContent) {
        this._jsonObj = JSON.parse(fileContent);
    } else if (contentType == WidgetTab._enumAddContentType.fileJsonObj) {
        this._jsonObj = fileContent;
    }
    this.initRoot();
}
WidgetFileBase.prototype.initRoot = function () {
    var elementFileRoot = this._elementTabContent._elementFileRoot;

    var jsonObjCtrl = new JsonObjCtrl(this, this._jsonObj, null);
    jsonObjCtrl._keyShow = "文件根节点";
    jsonObjCtrl._onMouseEnter = WidgetFileMenu.onMenu;
    this._menuFoldCtrl = new WidgetMenuFold();
    var dd = this._menuFoldCtrl.createMenuFold(elementFileRoot, jsonObjCtrl, true);
    return dd;
}
