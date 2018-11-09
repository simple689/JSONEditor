function PanelFileMould() {
    WidgetPanelFileBase.call(this);
}

PanelFileMould.prototype = new WidgetPanelFileBase();
PanelFileMould.prototype.constructor = PanelFileMould;

PanelFileMould.prototype.init = function (elementParentID) {
    WidgetPanelFileBase.prototype.init.apply(this, arguments);

    this._historyItem = confPanelFileMould;
    this._widgetTab.init(this._elementDrop, this,
                         "../../editor/home/homeFileMould.html", PanelFileMould.loadedHome,
                         this._historyItem);

    this._menuRightTitle.createMenuWithHtml(document.body, "../../editor/menu/menuFileMouldTitle.html");
    this._menuRightContent.createMenuWithHtml(document.body, null);
}

PanelFileMould.loadedHome = function (exec, htmlRoot) {

}

PanelFileMould.prototype.loadedJson = function (fileReader) {
    var fileName = fileReader._elementTabTitle._title;
    var obj = WidgetFileBrowser._jsonFileBrowser[APIData._jsonMould];

    var extend = getFileExtend(fileName);
    if (!WidgetHistory.existFileBrowserFile(obj, fileName, extend)) {
        APIUtil.fileBrowser.addFile(obj, fileName, extend);
        WidgetHistory.setFileBrowser(WidgetFileBrowser._jsonFileBrowser);
    }
    gPanelFileBrowser.refreshFileBrowserRight(obj);
}
