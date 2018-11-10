WidgetFileJsonMould.onClickRefresh = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.onClickSave = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var title = jsonObjCtrl._exec._elementTabTitle._title;
}
WidgetFileJsonMould.onClickSaveAs = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    PanelFileBrowser.saveAs(jsonObjCtrl);
}
WidgetFileJsonMould.onClickDownLoad = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    downloadFileJson(jsonObjCtrl);
}
WidgetFileJsonMould.onClickObjectAdd = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var jsonObjKey = jsonObjCtrl._key;
    var jsonObjValue = jsonObjCtrl._value;
    if (jsonObjKey == KeyBase._enumList) {
        var keyNew = prompt("请输入添加的 Key ：");
        if (!keyNew) {
            return;
        }
        jsonObjValue[keyNew] = {};
        var jsonItem = jsonObjValue[keyNew];
        jsonItem[KeyBase._showTitle] = keyNew;
        jsonItem[KeyBase._enumParamList] = {};
    } else if (jsonObjKey == KeyBase._enumParamList) {
        var keyNew = prompt("请输入添加的 Key ：");
        if (!keyNew) {
            return;
        }
        jsonObjValue[keyNew] = {};
        var jsonItem = jsonObjValue[keyNew];
        jsonItem[KeyBase._showTitle] = keyNew;
        jsonItem[KeyBase._valueType] = KeyBase._string;
    } else {
        var jsonObj = jsonObjCtrl._obj;
        var valueType = jsonObj[KeyBase._valueType];
        if (valueType) {
        } else {
            jsonObj = jsonObjCtrl._obj[jsonObjCtrl._key];
            valueType = jsonObj[KeyBase._valueType];
        }
        var jsonObjValue = jsonObj;
        if (valueType) {
            if (valueType == KeyBase._object) {
                if (!jsonObj[KeyBase._value]) {
                    jsonObj[KeyBase._value] = {};
                }
            } else if (valueType == KeyBase._objectHorizon) {
                if (!jsonObj[KeyBase._value]) {
                    jsonObj[KeyBase._value] = {};
                }
            } else if (valueType == KeyBase._array) {
                // var jsonObjValue = jsonObj[KeyBase._value];
                // var isHasObj = false;
                // if (jsonObjValue) {
                //     for (var i in jsonObjValue) {
                //         isHasObj = true;
                //         break;
                //     }
                // } else {
                //     jsonObj[KeyBase._value] = {};
                // }
                // if (isHasObj) {
                //     alert("当前 值类型 为 列表，只能存在一个对象作为此列表的模版！");
                //     return;
                // }

                if (!jsonObj[KeyBase._value]) {
                    jsonObj[KeyBase._value] = {};
                }
            } else if (valueType == KeyBase._enum) {
                alert("当前 Key 的值类型是 枚举，此节点不支持添加对象!");
                return;
            } else {
                if (!confirm("当前 Key 的值类型不是对象，如果继续添加，值类型会变成对象，确定执行操作吗？")) { //利用对话框返回的值 （true 或者 false）
                    return;
                }
                jsonObj[KeyBase._valueType] = KeyBase._object;
                jsonObj[KeyBase._value] = {};
            }

            jsonObjValue = jsonObj[KeyBase._value];
        }

        var keyNew = prompt("请输入添加的 Key ：");
        if (!keyNew) {
            return;
        }
        if (jsonObjValue[keyNew]) {
            alert("此 Key 已经存在，请更换 Key 重试！");
            return;
        }

        jsonObjValue[keyNew] = {};
        jsonObjValue[keyNew][KeyBase._showTitle] = keyNew;
        jsonObjValue[keyNew][KeyBase._valueType] = KeyBase._object;
        jsonObjValue[keyNew][KeyBase._value] = {};
    }
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.onClickObjectDel = function (e) {
    if (!confirm("确定要 “删除对象” 吗？")) { //利用对话框返回的值 （true 或者 false）
        return;
    }
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var jsonObj = jsonObjCtrl._obj;
    delete jsonObj[jsonObjCtrl._key];
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.onClickListAdd = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var jsonObjKey = jsonObjCtrl._key;
    var jsonObjValue = jsonObjCtrl._value;
    // if (jsonObjKey == KeyBase._enumList) {
    //     jsonObjValue[jsonObjValue.length] = {};
    //     var jsonItem = jsonObjValue[jsonObjValue.length - 1];
    //     jsonItem[KeyBase._enumParamList] = {};
    // } else if (jsonObjKey == KeyBase._enumParamList) {
    //     var keyNew = prompt("请输入 Key 的新名字 ：");
    //     if (!keyNew) {
    //         return;
    //     }
    //     jsonObjValue[keyNew] = {};
    //     var jsonItem = jsonObjValue[keyNew];
    //     jsonItem[KeyBase._showTitle] = "";
    //     jsonItem[KeyBase._valueType] = KeyBase._string;
    // } else {
        var jsonObjValueType = jsonObjCtrl._obj[KeyBase._valueType];
        jsonObjValue[jsonObjValue.length] = "";
    // }
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.onClickListDel = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var jsonObj = jsonObjCtrl._obj;
    jsonObj.splice(jsonObjCtrl._key, 1);
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.onClickListClear = function (e) {
    if (!confirm("确定要 “列表中清空对象” 吗？")) { //利用对话框返回的值 （true 或者 false）
        return;
    }
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var jsonObj = jsonObjCtrl._value;
    jsonObj.splice(0, jsonObj.length);
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.onClickRenameKey = function (e) {
    var keyNew = prompt("请输入 Key 的新名字 ：");
    if (!keyNew) {
        return;
    }

    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(e);
    var jsonObj = jsonObjCtrl._obj;
    if (jsonObj[keyNew]) {
        alert("此 Key 已经存在，请更换 Key 重试！");
        return;
    }
    jsonObj[keyNew] = jsonObj[jsonObjCtrl._key];
    delete jsonObj[jsonObjCtrl._key];
    jsonObjCtrl._exec.refreshContent();
}
