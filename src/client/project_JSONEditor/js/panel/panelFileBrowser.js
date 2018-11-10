function PanelFileBrowser() {
    WidgetPanelBase.call(this);
}

PanelFileBrowser.prototype = new WidgetPanelBase();
PanelFileBrowser.prototype.constructor = PanelFileBrowser;

PanelFileBrowser.prototype.init = function (elementParentID) {
    WidgetPanelBase.prototype.init.apply(this, arguments);

    var elementParent = getElementById(this._elementParentID);

    this._divMain = WidgetHtml.addDiv(elementParent);
    this._divMain.id = "panelFileBrowserMain";
    this._divTool = WidgetHtml.addDiv(this._divMain);
    this._divFileBrowser = WidgetHtml.addDiv(this._divMain);
    this._divFileBrowser.id = "panelFileBrowserBottom";

    this.initTool();
    this.initFileBrowser();
}
PanelFileBrowser.prototype.initTool = function () {
    // todo 以后扩展
    // this.initCreate();

    // todo 以后扩展
    this._widgetSearch = new WidgetSearch();
    this._widgetSearch.createSearch(this, this._divTool);

    // todo 以后扩展
    // var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    // jsonObjCtrl._valueList = JsonObjCtrl._fileBrowserTypeList;
    // jsonObjCtrl._onChange = WidgetFileOnChange.onChangeSelect;
    // WidgetHtml.addSelect(this._divTool, jsonObjCtrl);
}
PanelFileBrowser.prototype.initCreate = function () { // todo 以后扩展
    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "创建";
    jsonObjCtrl._valueList = new MenuListCtrl();

    var menuListItem = new MenuListItem("1", PanelFileBrowser.saveAs, APIData._extendJson);
    jsonObjCtrl._valueList.insertItem(menuListItem);
    menuListItem = new MenuListItem("2", PanelFileBrowser.saveAs, APIData._extendJsonMd);
    jsonObjCtrl._valueList.insertItem(menuListItem);

    menuListItem = new MenuListItem("3", PanelFileBrowser.saveAs, APIData._extendJson);
    var listSub = jsonObjCtrl._valueList.insertItemList(menuListItem);

    menuListItem = new MenuListItem("31", PanelFileBrowser.saveAs, APIData._extendJson);
    menuListItem.setListParent(listSub);
    jsonObjCtrl._valueList.insertItem(menuListItem);

    menuListItem = new MenuListItem("32", PanelFileBrowser.saveAs, APIData._extendJson);
    menuListItem.setListParent(listSub);
    listSub = jsonObjCtrl._valueList.insertItemList(menuListItem);

    menuListItem = new MenuListItem("321", PanelFileBrowser.saveAs, APIData._extendJson);
    menuListItem.setListParent(listSub);
    jsonObjCtrl._valueList.insertItem(menuListItem);

    WidgetHtml.addInput(this._divTool, jsonObjCtrl, WidgetHtml._enumInputType._buttonMenu);
}
PanelFileBrowser.prototype.initFileBrowser = function () {
    this._widgetFileBrowser = new WidgetFileBrowser();
    this._widgetFileBrowser.create(this._divFileBrowser, API._fileBrowser._type._all, confPanelFileBrowser);
}
