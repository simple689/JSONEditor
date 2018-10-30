function WidgetDialog() {
}

WidgetDialog._dialogList = new Array();
function ChoiceListItem(title, callback) {
    this._title = title;
    this._callback = callback;
};
WidgetDialog._enumFileBrowserType = {
    _open: 0,
    _save: 1
}

WidgetDialog.prototype.createDialog = function (elementParent, title, callback, callbackLoadedHtml) {
    this._elementParent = WidgetHtml.addDiv(elementParent);
    WidgetHtml.classAdd(this._elementParent, "widgetDialogRoot");
    this._elementParent._widgetDialog = this;
    WidgetDialog._dialogList.push(this);

    this._elementMask = WidgetHtml.addDiv(this._elementParent);
    WidgetHtml.classAdd(this._elementMask, "widgetDialogMask");
    this._elementMask._widgetDialog = this;

    this._elementDialog = WidgetHtml.addDiv(this._elementParent);
    WidgetHtml.classAdd(this._elementDialog, "widgetDialog");
    this._elementDialog._widgetDialog = this;

    this._elementDialogHead = WidgetHtml.addDiv(this._elementDialog);
    WidgetHtml.classAdd(this._elementDialogHead, "widgetDialogHead");
    this._elementDialogHead._widgetDialog = this;

    this._elementDialogClose = WidgetHtml.addDiv(this._elementDialogHead);
    WidgetHtml.classAdd(this._elementDialogClose, "widgetDialogHeadButton");
    this._elementDialogClose._widgetDialog = this;
    this._elementDialogClose.innerHTML = "X";
    this._elementDialogClose.onclick = WidgetDialog.onClickCancel;

    this._elementDialogContent = WidgetHtml.addDiv(this._elementDialog);
    WidgetHtml.classAdd(this._elementDialogContent, "widgetDialogContent");
    this._elementDialogContent._widgetDialog = this;

    // 标题
    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._keyShow = title;
    var label = WidgetHtml.addLabel(this._elementDialogHead, jsonObjCtrl);
    label.style.textAlign = "center";
    label.style.lineHeight = "30px";

    this._callback = callback;
    this._callbackLoadedHtml = callbackLoadedHtml;
}
WidgetDialog.loadedHtml = function (widgetDialog) {
    if (widgetDialog._callbackLoadedHtml) {
        widgetDialog._callbackLoadedHtml(widgetDialog);
    }
    WidgetDialog.autoCenter(widgetDialog._elementDialog);
}
WidgetDialog.autoCenter = function (element) {
    // 获取可见窗口大小
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;
    // 获取对话框宽、高
    var elementW = element.offsetWidth;
    var elementH = element.offsetHeight;

    element.style.left = (bodyW - elementW) / 2 + 'px';
    element.style.top = (bodyH - elementH) / 2 + 'px';
};
WidgetDialog.resizeWindow = function () {
    for (var i in WidgetDialog._dialogList) {
        WidgetDialog.autoCenter(WidgetDialog._dialogList[i]._elementDialog);
    }
};
WidgetDialog.prototype.close = function () {
    this._elementParent.remove();
}
WidgetDialog.onClickCancel = function () {
    var exec = WidgetFileUtil.getExec(this);
    if (!exec) {
        exec = this._widgetDialog;
    }
    if (exec) {
        if (exec._callback) {
            exec._callback(null, null);
        }
        exec.close();
    }
}
WidgetDialog.prototype.createDialogWithHtml = function (elementParent, title, jsonObjCtrl, html, callbackLoadedHtml) {
    this.createDialog(elementParent, title, null, callbackLoadedHtml);
    if (!this._elementDialogContent) {
        return;
    }
    this._jsonObjCtrl = jsonObjCtrl;
    if (html) {
        $(this._elementDialogContent).load(html, function () {
            WidgetDialog.loadedHtml(this._widgetDialog);
        });
    } else {
        WidgetDialog.loadedHtml(this);
    }
}
WidgetDialog.prototype.createDialogOneInput = function (elementParent, title, description, callback) {
    this.createDialog(elementParent, title, callback, null);

    // 描述
    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._keyShow = description;
    WidgetHtml.addLabel(this._elementDialogContent, jsonObjCtrl);

    // 输入框
    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    this._oneInput = WidgetHtml.addInput(this._elementDialogContent, jsonObjCtrl, WidgetHtml._enumInputType._textString);

    WidgetHtml.addBr(this._elementDialogContent);

    // button
    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "取消";
    jsonObjCtrl._onClick = WidgetDialog.onClickCancel;
    WidgetHtml.addInput(this._elementDialogContent, jsonObjCtrl, WidgetHtml._enumInputType._button);

    // button
    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "确定";
    jsonObjCtrl._onClick = WidgetDialog.onClickOneInputConfirm;
    WidgetHtml.addInput(this._elementDialogContent, jsonObjCtrl, WidgetHtml._enumInputType._button);

    WidgetDialog.loadedHtml(this);
}
WidgetDialog.prototype.createDialogChoiceList = function (elementParent, title, description, choiceList, callback) {
    this.createDialog(elementParent, title, callback, null);

    // 描述
    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._keyShow = description;
    WidgetHtml.addLabel(this._elementDialogContent, jsonObjCtrl);

    WidgetHtml.addBr(this._elementDialogContent);
    WidgetHtml.addBr(this._elementDialogContent);

    // button
    for (var i in choiceList) {
        var item = choiceList[i];
        jsonObjCtrl = new JsonObjCtrl(this, null, null);
        jsonObjCtrl._value = item._title;
        jsonObjCtrl._onClick = item._callback;
        WidgetHtml.addInput(this._elementDialogContent, jsonObjCtrl, WidgetHtml._enumInputType._button);
    }

    WidgetDialog.loadedHtml(this);
}
WidgetDialog.prototype.createDialogFileBrowser = function (elementParent, title, jsonObjCtrl, fileBrowserType, callback) {
    this.createDialog(elementParent, title, callback, null);
    this._jsonObjCtrl = jsonObjCtrl;
    // 获取可见窗口大小
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var fileTitle = "";
    var fileExtend = "";
    var filePath = "/";
    if (this._jsonObjCtrl) {
        var name = this._jsonObjCtrl._key;
        var elementTabTitle = this._jsonObjCtrl._exec._elementTabTitle;
        if (elementTabTitle) {
            name = elementTabTitle._title;
        }
        fileTitle = getFileTitle(name);
        fileExtend = getFileExtend(name);
        filePath = "/" + APIData._personalShow + "/";
    }

    // 路径
    var jsonObjCtrlSub = new JsonObjCtrl(this, null, null);
    jsonObjCtrlSub._value = filePath;
    this._elementInputFilePath = WidgetHtml.addInput(this._elementDialogContent, jsonObjCtrlSub, WidgetHtml._enumInputType._textString);
    this._elementInputFilePath.style.width = bodyW * 0.5 + "px";

    // 间隔
    WidgetHtml.addBr(this._elementDialogContent);
    WidgetHtml.addBr(this._elementDialogContent);

    // 文件浏览
    var widgetFileBrowser = new WidgetFileBrowser();
    this._widgetFileBrowser = widgetFileBrowser;
    widgetFileBrowser._nowElementInputFilePath = this._elementInputFilePath;
    widgetFileBrowser.create(this._elementDialogContent, API._fileBrowser._type._all, title);
    widgetFileBrowser._divMain.style.height = bodyH * 0.6 + "px";
    widgetFileBrowser._divMain.style.width = bodyW * 0.8 + "px";
    widgetFileBrowser._divLeft.style.width = bodyW * 0.2 + "px";

    // 间隔
    WidgetHtml.addBr(this._elementDialogContent);

    // 文件名
    jsonObjCtrlSub = new JsonObjCtrl(this, null, null);
    jsonObjCtrlSub._keyShow = "文件名：";
    WidgetHtml.addLabel(this._elementDialogContent, jsonObjCtrlSub);
    jsonObjCtrlSub = new JsonObjCtrl(this, null, null);
    jsonObjCtrlSub._value = fileTitle;
    this._elementInputFileTitle = WidgetHtml.addInput(this._elementDialogContent, jsonObjCtrlSub, WidgetHtml._enumInputType._textString);
    this._elementInputFileTitle.style.width = bodyW * 0.3 + "px";

    // 间隔
    WidgetHtml.addBr(this._elementDialogContent);

    // 类型 todo 未来做成下拉框
    jsonObjCtrlSub = new JsonObjCtrl(this, null, null);
    jsonObjCtrlSub._keyShow = "文件类型：";
    WidgetHtml.addLabel(this._elementDialogContent, jsonObjCtrlSub);
    jsonObjCtrlSub = new JsonObjCtrl(this, null, null);
    jsonObjCtrlSub._value = fileExtend;
    this._elementInputFileExtend = WidgetHtml.addInput(this._elementDialogContent, jsonObjCtrlSub, WidgetHtml._enumInputType._textString);
    this._elementInputFileExtend.style.width = bodyW * 0.3 + "px";

    // 间隔
    WidgetHtml.addBr(this._elementDialogContent);

    // 按钮
    var divButton = WidgetHtml.addDiv(this._elementDialogContent);
    divButton.style.float = "right";

    jsonObjCtrlSub = new JsonObjCtrl(this, null, null);
    if (fileBrowserType == WidgetDialog._enumFileBrowserType._open) {
        jsonObjCtrlSub._value = "打开";
        jsonObjCtrlSub._onClick = WidgetDialog.onClickFileBrowserOpen;
    } else if (fileBrowserType == WidgetDialog._enumFileBrowserType._save) {
        jsonObjCtrlSub._value = "保存";
        jsonObjCtrlSub._onClick = WidgetDialog.onClickFileBrowserSave;
    }
    WidgetHtml.addInput(divButton, jsonObjCtrlSub, WidgetHtml._enumInputType._button);

    jsonObjCtrlSub = new JsonObjCtrl(this, null, null);
    jsonObjCtrlSub._value = "取消";
    jsonObjCtrlSub._onClick = WidgetDialog.onClickCancel;
    WidgetHtml.addInput(divButton, jsonObjCtrlSub, WidgetHtml._enumInputType._button);

    // 刷新
    // widgetFileBrowser.refreshFileBrowserRightPath(filePath);

    WidgetDialog.loadedHtml(this);
}

WidgetDialog.onClickOneInputConfirm = function () {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    if (!jsonObjCtrl) {
        return;
    }
    var exec = jsonObjCtrl._exec;
    if (!exec) {
        return;
    }
    var value = exec._oneInput.value;
    if (exec._callback) {
        exec._callback(WidgetKey._ok, value);
    }
    exec.close();
}

WidgetDialog.onClickFileBrowserOpen = function () {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    if (!jsonObjCtrl) {
        return;
    }
    var exec = jsonObjCtrl._exec;
    if (!exec) {
        return;
    }

    var folder = exec._elementInputFilePath.value;
    var fileName = exec._elementInputFileTitle.value;
    var extend = getFileExtend(fileName);
    if (extend.length <= 0) {
        extend = exec._elementInputFileExtend.value;
    }

    var value = folder + fileName + extend;
    if (exec._callback) {
        exec._callback(WidgetKey._ok, value);
    }
    exec.close();
}
WidgetDialog.onClickFileBrowserSave = function () {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    if (!jsonObjCtrl) {
        return;
    }
    var exec = jsonObjCtrl._exec;
    if (!exec) {
        return;
    }

    var folder = exec._elementInputFilePath.value;
    var fileName = exec._elementInputFileTitle.value;
    var extend = getFileExtend(fileName);
    if (extend.length <= 0) {
        extend = exec._elementInputFileExtend.value;
    }
    var jsonObjFolder = WidgetFileBrowser.getJsonObjPath(folder);
    APIUtil.fileBrowser.addFile(jsonObjFolder, fileName, extend);
    WidgetHistory.setFileBrowser(WidgetFileBrowser._jsonFileBrowser);

    gPanelFileBrowser._widgetFileBrowser.refreshFileBrowserLeft();

    if (exec._callback) {
        exec._callback(WidgetKey._ok, value);
    }
    exec.close();
}
