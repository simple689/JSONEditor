function PanelFileEditor() {
    WidgetPanelFileBase.call(this);
}

PanelFileEditor.prototype = new WidgetPanelFileBase();
PanelFileEditor.prototype.constructor = PanelFileEditor;

PanelFileEditor.prototype.init = function (elementParentID) {
    WidgetPanelFileBase.prototype.init.apply(this, arguments);

    this._historyItem = confPanelFileEditor;
    this._widgetTab.init(this._elementDrop, this,
                         "../../editor/home/homeFileEditor.html", PanelFileEditor.loadedHome,
                         this._historyItem);

    this._menuRightTitle.createMenuWithHtml(document.body, "../../editor/menu/menuFileEditorTitle.html");
    this._menuRightContent.createMenuWithHtml(document.body, null);
}

PanelFileEditor.loadedHome = function (exec, htmlRoot) {
    var homeFileEditor = getElementById("homeFileEditor");
    var elementFileRoot = homeFileEditor;
    var isShowDemo = false;
    if (isShowDemo) {
        WidgetHtml.addLabel(elementFileRoot, exec, "demo", "demo", null, null);
        WidgetHtml.addInput(elementFileRoot, exec, "demo", WidgetHtml._enumInputType._textString, null, null, null);
        WidgetHtml.addInput(elementFileRoot, exec, 689, WidgetHtml._enumInputType._textNumber, null, null, null);
        WidgetHtml.addInput(elementFileRoot, exec, "demo", WidgetHtml._enumInputType._button, null, null, null);
        WidgetHtml.addInput(elementFileRoot, exec, false, WidgetHtml._enumInputType._checkbox, null, null, null);
        WidgetHtml.addInput(elementFileRoot, exec, false, WidgetHtml._enumInputType._radio, null, null, null);
        // WidgetHtml.addInput(elementFileRoot, this, "demo", WidgetHtml._enumInputType._file, null, null, null);
        // WidgetHtml.addInput(elementFileRoot, this, "demo", WidgetHtml._enumInputType._image, null, null, null);
        // WidgetHtml.addInput(elementFileRoot, this, "demo", WidgetHtml._enumInputType._password, null, null, null);
        // WidgetHtml.addInput(elementFileRoot, this, "demo", WidgetHtml._enumInputType._submit, null, null, null);
        // WidgetHtml.addInput(elementFileRoot, this, "demo", WidgetHtml._enumInputType._reset, null, null, null);
        WidgetHtml.addInput(elementFileRoot, exec, "#336699", WidgetHtml._enumInputType._color, null, null, null);
        WidgetHtml.addInput(elementFileRoot, exec, "rgba(0, 255, 0, 0.6)", WidgetHtml._enumInputType._color, null, null, null);
        WidgetHtml.addSelect(elementFileRoot, exec, "0123456", 6, null, null);
    }
}

PanelFileEditor.prototype.loadedJson = function (fileReader) {
    return;
    var fileName = fileReader._elementTabContent._elementTabTitle._title;
    var obj = WidgetFileBrowser._jsonFileBrowser[APIData._json];

    var extend = getFileExtend(fileName);
    if (!WidgetHistory.existFileBrowserFile(obj, fileName, extend)) {
        APIUtil.fileBrowser.addFile(obj, fileName, extend);
        WidgetHistory.setFileBrowser(WidgetFileBrowser._jsonFileBrowser);
    }
    gPanelFileBrowser._widgetFileBrowser.refreshFileBrowserRight(obj);
}
