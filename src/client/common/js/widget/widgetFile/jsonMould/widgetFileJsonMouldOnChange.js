WidgetFileJsonMould.onChangeSelect = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var key = jsonObjCtrl._key;
    if (key == KeyBase._valueType) {
        WidgetFileJsonMould.changeSelectValueType(e);
    } else if (key == KeyBase._enumTypeDefault) {
        WidgetFileJsonMould.changeSelectEnumDefault(e);
    }
}
