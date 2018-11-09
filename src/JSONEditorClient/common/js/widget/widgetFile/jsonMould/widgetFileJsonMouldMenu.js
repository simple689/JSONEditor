WidgetFileJsonMould.onMenu = function (menu, ul, jsonObjCtrl) {
    var li = null;
    var type = jsonObjCtrl._type;
    if (type == WidgetKey._object) {
        li = menu.addLi(ul, "重命名Key", WidgetFileOnClick.onClickListToolDel, jsonObjCtrl);

        if (jsonObjCtrl._value[WidgetKey._valueType] == WidgetKey._object) {
            li = menu.addLi(ul, "添加对象成员", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
            li = menu.addLi(ul, "清空对象成员", WidgetFileOnClick.onClickObjectToolClear, jsonObjCtrl);
        } else if (jsonObjCtrl._value[WidgetKey._valueType] == WidgetKey._array) {
            li = menu.addLi(ul, "添加列表模版成员", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
            li = menu.addLi(ul, "清空列表模版成员", WidgetFileOnClick.onClickObjectToolClear, jsonObjCtrl);
        }
    }

    if (jsonObjCtrl._key == WidgetKey._enumList) {
        li = menu.addLi(ul, "添加枚举列表成员", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
        li = menu.addLi(ul, "清空枚举列表成员", WidgetFileOnClick.onClickObjectToolClear, jsonObjCtrl);
    } else if (jsonObjCtrl._key == WidgetKey._enumParamList) {
        li = menu.addLi(ul, "添加枚举参数列表成员", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
        li = menu.addLi(ul, "清空枚举参数列表成员", WidgetFileOnClick.onClickObjectToolClear, jsonObjCtrl);
    } else if (jsonObjCtrl._key == WidgetKey._key) {
        li = menu.addLi(ul, "添加枚举参数列表成员", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
        li = menu.addLi(ul, "清空枚举参数列表成员", WidgetFileOnClick.onClickObjectToolClear, jsonObjCtrl);
    } else if (jsonObjCtrl._key == WidgetKey._linkFile) {
        li = menu.addLi(ul, "_linkFile", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
    } else if (jsonObjCtrl._key == WidgetKey._linkKey) {
        li = menu.addLi(ul, "_linkKey", WidgetFileOnClick.onClickObjectToolAdd, jsonObjCtrl);
    }
    return li;
}
