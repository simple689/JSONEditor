WidgetFileJsonMould.onChangeSelect = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var key = jsonObjCtrl._key;
    if (key == WidgetKey._valueType) {
        WidgetFileJsonMould.changeSelectValueType(e);
    } else if (key == WidgetKey._enumTypeDefault) {
        WidgetFileJsonMould.changeSelectEnumDefault(e);
    }
}
