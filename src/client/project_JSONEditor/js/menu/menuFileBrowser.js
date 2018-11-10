function MenuFileBrowser() {
}

MenuFileBrowser.closeTitle = function (li) {
    if (li._menu._exec) {
        var elementTabTitle = li._menu._exec;
        elementTabTitle._widgetTab.closeTitle(elementTabTitle);
    }
}
