WidgetFileJson.onChangeSelect = function (e) {
    var value = e.value;

    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var enumObj = jsonObjCtrl._obj[jsonObjCtrl._key];
    enumObj[WidgetKey._enumType] = value;
    enumObj[WidgetKey._enumParamList] = {};
    jsonObjCtrl._exec.refreshContent();
}
