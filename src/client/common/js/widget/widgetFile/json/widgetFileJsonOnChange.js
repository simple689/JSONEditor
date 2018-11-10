WidgetFileJson.onChangeSelect = function (e) {
    var value = e.value;

    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var enumObj = jsonObjCtrl._obj[jsonObjCtrl._key];
    enumObj[KeyBase._enumType] = value;
    enumObj[KeyBase._enumParamList] = {};
    jsonObjCtrl._exec.refreshContent();
}
