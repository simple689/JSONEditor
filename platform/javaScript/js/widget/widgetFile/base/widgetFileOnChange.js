function WidgetFileOnChange() {
}

WidgetFileOnChange.onChangeInput = function (e) {
    var inputType = this._inputType;
    var value = this.value;
    switch (inputType) {
        case WidgetHtml._enumInputType._checkbox :
        case WidgetHtml._enumInputType._radio : {
            value = this.checked;
            break;
        }
    }

    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    jsonObjCtrl._obj[jsonObjCtrl._key] = value;
    jsonObjCtrl._exec.refreshContent();

    var func = WidgetFileUtil.getExec(this).constructor.onChangeInput;
    if (func) func(this);
}
WidgetFileOnChange.onChangeSelect = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onChangeSelect;
    if (func) func(this);
}
