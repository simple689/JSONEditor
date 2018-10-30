function PanelToolBar() {
    WidgetPanelBase.call(this);
}

PanelToolBar.prototype = new WidgetPanelBase();
PanelToolBar.prototype.constructor = PanelToolBar;

PanelToolBar.prototype.init = function (elementParentID) {
    WidgetPanelBase.prototype.init.apply(this, arguments);

    var elementParent = getElementById(this._elementParentID);

    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "新建";
    jsonObjCtrl._valueList = new MenuListCtrl();
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json文件", PanelMenu.onClickCreateFile, APIData._extendJson));
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json模版文件", PanelMenu.onClickCreateFile, APIData._extendJsonMd));
    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._buttonMenu);

    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "打开";
    jsonObjCtrl._valueList = new MenuListCtrl();
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json文件", PanelMenu.onClickOpenFile, APIData._extendJson));
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json模版文件", PanelMenu.onClickOpenFile, APIData._extendJsonMd));
    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._buttonMenu);

    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "保存当前";
    jsonObjCtrl._valueList = new MenuListCtrl();
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json文件", PanelMenu.onClickSaveFileNow, APIData._extendJson));
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json模版文件", PanelMenu.onClickSaveFileNow, APIData._extendJsonMd));
    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._buttonMenu);

    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "保存当前所有";
    jsonObjCtrl._onClick = PanelMenu.onClickSaveFileNowAll;
    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._button);

    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "保存所有";
    jsonObjCtrl._onClick = PanelMenu.onClickSaveFileAll;
    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._button);

    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "下载当前";
    jsonObjCtrl._valueList = new MenuListCtrl();
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json文件", PanelMenu.onClickDownloadFileNow, APIData._extendJson));
    jsonObjCtrl._valueList.insertItem(new MenuListItem("Json模版文件", PanelMenu.onClickDownloadFileNow, APIData._extendJsonMd));
    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._buttonMenu);
}
