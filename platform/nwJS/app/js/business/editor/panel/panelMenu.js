function PanelMenu() {
    WidgetPanelBase.call(this);
}

PanelMenu.prototype = new WidgetPanelBase();
PanelMenu.prototype.constructor = PanelMenu;

PanelMenu.prototype.init = function (elementParentID) {
    WidgetPanelBase.prototype.init.apply(this, arguments);

    var elementParent = getElementById(this._elementParentID);

    var widgetUserRoot = WidgetHtml.addDiv(elementParent);
    WidgetHtml.classAdd(widgetUserRoot, "widgetUser");
    WidgetUser.init(widgetUserRoot);

    // 根据用户使用设备调整按钮的可见性
    switch (WidgetUser._client) {
        case WidgetUser._enumClientType.appPc:
        case WidgetUser._enumClientType.appMobile: {
            this._fileExitSpan = getElementById("panelMenuExitSpan");
            this._fileExit = getElementById("panelMenuExit");

            WidgetHtml.classRemove(this._fileExitSpan, "widgetMenuHide");
            WidgetHtml.classRemove(this._fileExit, "widgetMenuHide");
            break;
        }
    }
    // 是否选中设置
    this._panelFileBrowserCheckbox = getElementById("panelMenuPanelFileBrowserCheckbox");
    this._panelFileMouldCheckbox = getElementById("panelMenuPanelFileMouldCheckbox");
    this._panelFileLinkCheckbox = getElementById("panelMenuPanelFileLinkCheckbox");

    var isVisible = getDockPanelVisible(gDock._panelFileBrowser);
    this._panelFileBrowserCheckbox.checked = isVisible;
    isVisible = getDockPanelVisible(gDock._panelFileMould);
    this._panelFileMouldCheckbox.checked = isVisible;
    isVisible = getDockPanelVisible(gDock._panelFileLink);
    this._panelFileLinkCheckbox.checked = isVisible;
}

// onClickCreateFile
PanelMenu.onClickCreateFile = function (fileExtend) {
    var createFileStr = "新建文件_";
    var createFileNum = 0;
    // 获取打开了哪些文件，重新赋值createFileNum
    var widgetTab = getWidgetTabWithExtend(fileExtend);
    if (!widgetTab) {
        return;
    }
    var tabList = widgetTab._elementTabList;
    for (var i in tabList) {
        var item = tabList[i];
        var title = item._title;
        var index = title.indexOf(createFileStr);
        if (index == 0) { //以''开头
            var titleList = title.split(createFileStr);
            if (titleList.length > 1) {
                var str = titleList[1];
                if (str.length > 1) {
                    var num = parseInt(str[0]);
                    if (createFileNum <= num) {
                        createFileNum = num + 1;
                    }
                }
            }
        }
    }
    var name = createFileStr + createFileNum + fileExtend;
    var jsonObjCtrl = new JsonObjCtrl(this, null, name);
    widgetTab.addTabWithFileJsonObj(name, jsonObjCtrl._obj);
}

// onClickOpenFile
PanelMenu.onClickOpenFile = function (fileExtend) {
    openFile(fileExtend, PanelMenu.openedFile);
}
PanelMenu.openedFile = function (e) {
    var fileExtend = this._fileExtend;
    var widgetTab = getWidgetTabWithExtend(fileExtend);
    if (!widgetTab) {
        return;
    }
    //e.currentTarget.files 是一个数组，如果支持多个文件，则需要遍历
    var fileList = e.currentTarget.files;
    for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        widgetTab.addTabWithFile(file);
    }
}

// onClickSaveFile
PanelMenu.onClickSaveFileNow = function (fileExtend) {
    // 考虑link
    var widgetTab = getWidgetTabWithExtend(fileExtend);
    if (!widgetTab) {
        return;
    }
    // todo
    var widgetDialog = new WidgetDialog();
    widgetDialog.createDialogFileBrowser(document.body, "另存为", PanelMenu.showDialogSaveFileNow);
}
PanelMenu.onClickSaveFileNowAll = function () {
    // todo
}
PanelMenu.onClickSaveFileAll = function () {
    // todo
}

PanelMenu.showDialogSaveFileNow = function (widgetDialog) {
    // 路径
    var name = widgetDialog._jsonObjCtrl._key;
    var elementTabTitle = widgetDialog._jsonObjCtrl._exec._elementTabTitle;
    if (elementTabTitle) {
        name = elementTabTitle._title;
    }
    var title = getFileTitle(name)
    var extend = getFileExtend(name);

    jsonObjCtrl = new JsonObjCtrl(widgetDialog, null, null);
    var path = "/" + APIData._personalShow + "/";
    if (extend.length > 0) {
        if (equalFileExtend(extend, APIData._extendJson)) {
            path += APIData._jsonShow;
        } else if (equalFileExtend(extend, APIData._extendJsonMd)) {
            path += APIData._jsonMouldShow;
        }
        path += "/";
    }
    jsonObjCtrl._value = path;
    var input = WidgetHtml.addInput(widgetDialog._elementDialogContent, jsonObjCtrl, WidgetHtml._enumInputType._textString);
    widgetDialog._elementInputFilePath = input;
    input.style.width = bodyW * 0.5 + "px";

    // 间隔
    WidgetHtml.addBr(widgetDialog._elementDialogContent);
    WidgetHtml.addBr(widgetDialog._elementDialogContent);

    // 文件浏览
    var widgetFileBrowser = new WidgetFileBrowser();
    widgetDialog._widgetFileBrowser = widgetFileBrowser;
    widgetFileBrowser._nowElementInputFilePath = input;
    widgetFileBrowser.create(widgetDialog._elementDialogContent, API._fileBrowser._type._all, "dialogSaveFile");
    widgetFileBrowser._divMain.style.height = bodyH * 0.8 + "px";
    widgetFileBrowser._divMain.style.width = bodyW * 0.8 + "px";
    widgetFileBrowser._divLeft.style.width = bodyW * 0.2 + "px";

    // 间隔
    WidgetHtml.addBr(widgetDialog._elementDialogContent);

    // 保存路径
    jsonObjCtrl = new JsonObjCtrl(widgetDialog, null, null);
    jsonObjCtrl._keyShow = "文件名：";
    WidgetHtml.addLabel(widgetDialog._elementDialogContent, jsonObjCtrl);
    jsonObjCtrl = new JsonObjCtrl(widgetDialog, null, null);
    jsonObjCtrl._value = title;
    input = WidgetHtml.addInput(widgetDialog._elementDialogContent, jsonObjCtrl, WidgetHtml._enumInputType._textString);
    widgetDialog._elementInputFileTitle = input;
    input.style.width = bodyW * 0.3 + "px";

    // 间隔
    WidgetHtml.addBr(widgetDialog._elementDialogContent);

    // 保存类型
    jsonObjCtrl = new JsonObjCtrl(widgetDialog, null, null);
    jsonObjCtrl._keyShow = "保存类型：";
    WidgetHtml.addLabel(widgetDialog._elementDialogContent, jsonObjCtrl);
    jsonObjCtrl = new JsonObjCtrl(widgetDialog, null, null);
    jsonObjCtrl._value = extend;
    input = WidgetHtml.addInput(widgetDialog._elementDialogContent, jsonObjCtrl, WidgetHtml._enumInputType._textString);
    widgetDialog._elementInputFileExtend = input;
    input.style.width = bodyW * 0.3 + "px";

    // 间隔
    WidgetHtml.addBr(widgetDialog._elementDialogContent);

    // 按钮
    var divButton = WidgetHtml.addDiv(widgetDialog._elementDialogContent);
    divButton.style.float = "right";

    jsonObjCtrl = new JsonObjCtrl(widgetDialog, null, null);
    jsonObjCtrl._value = "保存";
    jsonObjCtrl._onClick = PanelMenu.onClickSaveAsButtonSave;
    WidgetHtml.addInput(divButton, jsonObjCtrl, WidgetHtml._enumInputType._button);

    jsonObjCtrl = new JsonObjCtrl(widgetDialog, null, null);
    jsonObjCtrl._value = "取消";
    jsonObjCtrl._onClick = PanelMenu.onClickSaveAsButtonCancel;
    WidgetHtml.addInput(divButton, jsonObjCtrl, WidgetHtml._enumInputType._button);

    // 刷新
    widgetFileBrowser.refreshFileBrowserRightPath(path);
};
PanelMenu.onClickSaveAsButtonSave = function () {
    var widgetDialog = this._jsonObjCtrl._exec;
    var folder = widgetDialog._elementInputFilePath.value;
    var fileName = widgetDialog._elementInputFileTitle.value;
    var extend = getFileExtend(fileName);
    if (extend.length <= 0) {
        extend = widgetDialog._elementInputFileExtend.value;
    }

    var jsonObjFolder = WidgetFileBrowser.getJsonObjPath(folder);
    APIUtil.fileBrowser.addFile(jsonObjFolder, fileName, extend);
    WidgetHistory.setFileBrowser(WidgetFileBrowser._jsonFileBrowser);

    gPanelFileBrowser._widgetFileBrowser.refreshFileBrowserLeft();
    widgetDialog.close();
}
PanelMenu.onClickSaveAsButtonCancel = function () {
    this._jsonObjCtrl._exec.close();
}

// onClickDownloadFile
PanelMenu.onClickDownloadFileNow = function (fileExtend) {
    // 考虑link
    var widgetTab = getWidgetTabWithExtend(fileExtend);
    if (!widgetTab) {
        return;
    }
    // todo
    // downloadFileJson(jsonObjCtrl);
}

// onClickSetting
PanelMenu.onClickSetting = function () {
    var widgetDialog = new WidgetDialog();
    widgetDialog.createDialogWithHtml(document.body, "设置", null, null, PanelMenu.showDialogSetting);
}
PanelMenu.showDialogSetting = function (widgetDialog) {
};

// onClickExit
PanelMenu.onClickExit = function () {
    // todo
}

// onClickUndo
PanelMenu.onClickUndo = function () {
}

// onClickRedo
PanelMenu.onClickRedo = function () {
}

// onClickCut
PanelMenu.onClickCut = function () {
}

// onClickCopy
PanelMenu.onClickCopy = function () {
}

// onClickPaste
PanelMenu.onClickPaste = function () {
}

// onClickFind
PanelMenu.onClickFind = function () {
}

// onClickVisiblePanel
PanelMenu.onClickVisiblePanel = function (panel) {
    var isVisible = true;
    if (panel == confPanelToolBar) {
    } else if (panel == confPanelState) {
    } else if (panel == confPanelFileEditor) {
    } else if (panel == confPanelFileMould) {
        isVisible = changeDockPanelVisible(gDock._panelFileMould);
        gPanelMenu._panelFileMouldCheckbox.checked = isVisible;
    } else if (panel == confPanelFileLink) {
        isVisible = changeDockPanelVisible(gDock._panelFileLink);
        gPanelMenu._panelFileLinkCheckbox.checked = isVisible;
    } else if (panel == confPanelFileBrowser) {
        isVisible = changeDockPanelVisible(gDock._panelFileBrowser);
        gPanelMenu._panelFileBrowserCheckbox.checked = isVisible;
    }
}

// onClickHistoryClear
PanelMenu.onClickHistoryClearAll = function () {
    WidgetHistory.clearAll();
}
PanelMenu.onClickHistoryClear = function (key) {
    var element = window.event.target;
    WidgetHistory.clear(key, element.innerHTML);
}

// onClickHelp
PanelMenu.onClickHelp = function () {
    var widgetDialog = new WidgetDialog();
    widgetDialog.createDialogWithHtml(document.body, "帮助", null, null, PanelMenu.showDialogHelp);
}
PanelMenu.showDialogHelp = function (widgetDialog) {
    // 获取可见窗口大小
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var widgetMarkedDoc = new WidgetMarkedDoc();
    widgetDialog._widgetMarkedDoc = widgetMarkedDoc;
    widgetMarkedDoc.create(widgetDialog._elementDialogContent, confProjectRoot + '/doc/', '/README.md');
    widgetMarkedDoc._divMain.style.height = bodyH * 0.8 + "px";
    widgetMarkedDoc._divMain.style.width = bodyW * 0.8 + "px";
    widgetMarkedDoc._divLeft.style.width = bodyW * 0.2 + "px";
};
