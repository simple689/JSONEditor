WidgetFileJson.onMenu = function (menu, ul, jsonObjCtrl) {
    var li = null;
    var type = jsonObjCtrl._type;
    if (type == WidgetKey._object) {
        li = menu.addLi(ul, "添加对象成员", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
        li = menu.addLi(ul, "清空对象成员", WidgetFileOnClick.onClickObjectToolClear, jsonObjCtrl);
    } else {
        li = menu.addLi(ul, "复制Key：", WidgetFileOnClick.onClickListToolDel, jsonObjCtrl);
    }
    return li;
}
