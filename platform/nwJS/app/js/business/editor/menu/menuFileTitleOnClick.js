function MenuFileTitleOnClick() {
}

MenuFileTitleOnClick.onClickRefresh = function (e) {
    if (e && e._menu && e._menu._exec) {
        var elementTabTitle = e._menu._exec;
        var widgetTab = elementTabTitle._widgetTab;
        var panel = widgetTab._exec;
        var elementTabContent = elementTabTitle._elementTabContent;
        var widgetFileBase = elementTabContent._widgetFileBase;
        widgetFileBase.refreshContent();
        // var func = widgetFileBase.onClickRefresh;
        // if (func) func(this);
    }
}
MenuFileTitleOnClick.onClickSave = function (e) {
    // var func = WidgetFileUtil.getExec(this).onClickSave;
    // if (func) func(this);
}
MenuFileTitleOnClick.onClickSaveAs = function (e) {
    // var func = WidgetFileUtil.getExec(this).onClickSaveAs;
    // if (func) func(this);
}
MenuFileTitleOnClick.onClickDownLoad = function (e) {
    // var func = WidgetFileUtil.getExec(this).onClickDownLoad;
    // if (func) func(this);
}
MenuFileTitleOnClick.closeTitle = function (e) {
    if (e._menu._exec) {
        var elementTabTitle = e._menu._exec;
        elementTabTitle._widgetTab.closeTitle(elementTabTitle);
    }
}
