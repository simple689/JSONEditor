function WidgetFileUtil() {
}

WidgetFileUtil.getKeyShow = function (key) {
    var keyShow = key;
    if (key == KeyBase._ignore) {
        keyShow = "忽略";
    } else if (key == KeyBase._beginList) {
        keyShow = "开头字符串列表";
    } else if (key == KeyBase._file) {
        keyShow = "文件";
    } else if (key == KeyBase._showTitle) {
        keyShow = "显示名字";
    } else if (key == KeyBase._valueType) {
        keyShow = "值类型";
    } else if (key == KeyBase._value) {
        keyShow = "值";
    } else if (key == KeyBase._enumTypeDefault) {
        keyShow = "默认枚举";
    } else if (key == KeyBase._enumList) {
        keyShow = "枚举列表";
    } else if (key == KeyBase._enumParamList) {
        keyShow = "枚举参数列表";
    } else if (key == KeyBase._linkFile) {
        keyShow = "链接文件";
    } else if (key == KeyBase._linkKey) {
        keyShow = "链接key";
    }
    return keyShow;
}
WidgetFileUtil.isKeyMenuNone = function (key) {
    var isNone = false;
    if (key == KeyBase._ignore) {
        isNone = true;
    } else if (key == KeyBase._file) {
        isNone = true;
    } else if (key == KeyBase._value) {
        isNone = true;
    }
    return isNone;
}
WidgetFileUtil.getJsonObjCtrl = function (e) {
    if (e._menu) {
        return e._menu._exec._jsonObjCtrl;
    } else if (e._labelCheck) {
        return e._labelCheck._jsonObjCtrl;
    }
    return e._jsonObjCtrl;
}
WidgetFileUtil.getExec = function (e) {
    return WidgetFileUtil.getJsonObjCtrl(e)._exec;
}
