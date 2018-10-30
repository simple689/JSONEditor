function WidgetFileJsonMould() {
    WidgetFileBase.call(this);
}
WidgetFileJsonMould.prototype = new WidgetFileBase();
WidgetFileJsonMould.prototype.constructor = WidgetFileJsonMould;

WidgetFileJsonMould._enumParentType = {
    _base: 0,
    _list: 1
}

WidgetFileJsonMould.prototype.initRoot = function () {
    var dd = WidgetFileBase.prototype.initRoot.apply(this, arguments);
    this.readObject(this._jsonObj, "", dd, false);
}
WidgetFileJsonMould.prototype.readObject = function (jsonObj, keyParent, elementParent, isListParent) {
    for (var o in jsonObj) {
        var key = o;
        var keyShow = WidgetFileUtil.getKeyShow(key);
        var value = jsonObj[key];

        var jsonObjCtrl = new JsonObjCtrl(this, jsonObj, key);
        jsonObjCtrl._keyShow = keyShow;
        if (typeof(value) == WidgetKey._object) {
            var keyChild = keyParent;
            keyChild += "->";
            keyChild += key;

            jsonObjCtrl._value = value;

            var isList = false;
            if (Array.isArray(value)) {
                isList = true;
                jsonObjCtrl._type = WidgetKey._array;
            } else {
                jsonObjCtrl._type = WidgetKey._object;
            }
            jsonObjCtrl._onMouseEnter = WidgetFileMenu.onMenu;
            var dd = this._menuFoldCtrl.addFoldAndItem(elementParent, jsonObjCtrl, true);
            this.readObject(value, keyChild, dd, isList);
        } else {
            var valueType = typeof(value);
            jsonObjCtrl._onMouseEnter = WidgetFileMenu.onMenu;
            jsonObjCtrl._type = valueType;
            WidgetHtml.addLabel(elementParent, jsonObjCtrl);
            jsonObjCtrl = new JsonObjCtrl(this, jsonObj, key);
            jsonObjCtrl._value = value;
            jsonObjCtrl._onChange = WidgetFileOnChange.onChangeInput;

            if (key == WidgetKey._valueType) {
                jsonObjCtrl._value = value;
                jsonObjCtrl._valueList = JsonObjCtrl._valueTypeList;
                jsonObjCtrl._onChange = WidgetFileOnChange.onChangeSelect;

                WidgetHtml.addSelect(elementParent, jsonObjCtrl);
            } else if (key == WidgetKey._enumTypeDefault) {
                var enumTypeDefault = jsonObj[WidgetKey._enumTypeDefault];
                var enumList = jsonObj[WidgetKey._enumList];
                var jsonListCtrl = new JsonListCtrl(0);
                for (var oEnum in enumList) {
                    if (enumTypeDefault && enumTypeDefault.length <= 0 || !enumTypeDefault) {
                        jsonObj[WidgetKey._enumTypeDefault] = oEnum;
                        enumTypeDefault = jsonObj[WidgetKey._enumTypeDefault];
                    }
                    var valueItemMd = enumList[oEnum];
                    var item = new JsonListItem(oEnum,valueItemMd[WidgetKey._showTitle]);
                    jsonListCtrl.insertItem(item);
                }
                jsonObjCtrl._value = enumTypeDefault;
                jsonObjCtrl._valueList = jsonListCtrl.getList();
                jsonObjCtrl._onChange = WidgetFileOnChange.onChangeSelect;

                WidgetHtml.addSelect(elementParent, jsonObjCtrl);
            } else {
                if (valueType == WidgetKey._string) {
                    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._textString);
                } else if (valueType == WidgetKey._number) {
                    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._textNumber);
                } else if (valueType == WidgetKey._boolean) {
                    WidgetHtml.addInput(elementParent, jsonObj, WidgetHtml._enumInputType._checkbox);
                } else {
                    // WidgetLog.log("[" + typeof(value) + "]" + keyParent + "->" + key + " = " + value);
                }
            }

            // if (WidgetFileUtil.isAddBr(key)) {
                WidgetHtml.addBr(elementParent);
            // }
        }
    }
}
WidgetFileJsonMould.changeSelectValueType = function (element) {
    var jsonObjCtrl = element._jsonObjCtrl;
    var jsonObj = jsonObjCtrl._obj;
    var jsonObjValue = jsonObj[WidgetKey._value];
    var isHasObj = false;
    if (jsonObjValue) {
        for (var i in jsonObjValue) {
            isHasObj = true;
            break;
        }
    }
    if (isHasObj) {
        if (!confirm("当前 Key 存在值，如果继续改变，值会被清空，确定执行操作吗？")) { //利用对话框返回的值 （true 或者 false）
            return;
        }
    }
    jsonObj[WidgetKey._valueType] = element.value;
    var jsonObjValueType = jsonObj[WidgetKey._valueType];
    if (jsonObjValueType == WidgetKey._object || jsonObjValueType == WidgetKey._objectHorizon || jsonObjValueType == WidgetKey._array) {
        jsonObj[WidgetKey._value] = {};
    } else if (jsonObjValueType == WidgetKey._enum) {
        jsonObj[WidgetKey._value] = {};
        jsonObj[WidgetKey._value][WidgetKey._enumTypeDefault] = "";
        jsonObj[WidgetKey._value][WidgetKey._enumList] = {};
    } else if (jsonObjValueType == WidgetKey._link) {
        jsonObj[WidgetKey._value] = {};
        jsonObjValue = jsonObj[WidgetKey._value];
        jsonObjValue[WidgetKey._linkFile] = "";
        jsonObjValue[WidgetKey._linkKey] = "";
    } else {
        delete jsonObj[WidgetKey._value];
    }
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.changeSelectEnumDefault = function (element) {
    var jsonObjCtrl = element._jsonObjCtrl;
    var jsonObj = jsonObjCtrl._obj;
    var value = element.value;
    jsonObj[WidgetKey._enumTypeDefault] = value;
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.prototype.refreshContent = function () {
    var widgetTab = this._elementTabContent._elementTabTitle._widgetTab;
    widgetTab.refreshContent(this._elementTabContent, this._jsonObj, WidgetTab._enumAddContentType.fileJsonObj);
}
WidgetFileJsonMould.prototype.isMouldIgnore = function (key) {
    for (var ignoreIndex in this._jsonMouldObj[WidgetKey._ignore][WidgetKey._beginList]) {
        var ignoreValue = this._jsonMouldObj[WidgetKey._ignore][WidgetKey._beginList][ignoreIndex];
        var isStart = key.indexOf(ignoreValue);
        if (isStart == 0) {
            return true;
        }
    }
    return false;
}

// 获取mould
WidgetFileJsonMould.prototype.getMouldFromWidgetTab = function (fileName) {
    // 从tab获取
    var widgetTab = getWidgetTab(confPanelFileMould);
    if (widgetTab) {
        var tabList = widgetTab._elementTabList;
        for (var i in tabList) {
            var item = tabList[i];
            var title = item._title;
            if (fileName == title) {
                this._jsonMouldObj = item._elementTabContent._jsonMouldObj;
                return true;
            }
        }
    }
    return false;
}
WidgetFileJsonMould.prototype.getMouldFromFile = function (fileName) {
    // 从文件打开 todo
    return false;
}
WidgetFileJsonMould.prototype.getMouldFromJson = function (jsonObj) {
    // 从json创建 todo 枚举未完
    this.createMould(jsonObj);
    WidgetLog.log("========================================");
    WidgetLog.log(JSON.stringify(this._jsonMouldObj, null, 2));
    WidgetLog.log("========================================");
    return true;
}
// 创建mould
WidgetFileJsonMould.prototype.createMould = function (jsonObj) {
    this._jsonMouldObj = {};
    this._jsonMouldObj[WidgetKey._ignore] = {};
    this._jsonMouldObj[WidgetKey._ignore][WidgetKey._beginList] = new Array();
    this._jsonMouldObj[WidgetKey._ignore][WidgetKey._beginList].push("$");

    this._jsonMouldObj[WidgetKey._file] = {};
    this.createMouldFile(jsonObj, this._jsonMouldObj, "", this._jsonMouldObj[WidgetKey._file], this._jsonMouldObj, WidgetFileJsonMould._enumParentType._base);
}
WidgetFileJsonMould.prototype.createMouldFile = function (jsonObj, jsonMouldObj, keyParent, jsonMouldObjParent, jsonMouldObjGrandParent, parentType) {
    for (var o in jsonObj) {
        if (o == APIData._jsonMould) {
            continue;
        }
        var key = o;

        if (this.isMouldIgnore(key)) {
            continue;
        }

        var value = jsonObj[key];
        var keyChild = keyParent;
        keyChild += "->";
        keyChild += key;
        keyChild += "->";
        var childType = WidgetFileJsonMould._enumParentType._base;

        if (parentType == WidgetFileJsonMould._enumParentType._base) {
            jsonMouldObjParent[key] = {};
            jsonMouldObjParent[key][WidgetKey._showTitle] = key;
            if (typeof(value) == WidgetKey._object) {
                jsonMouldObjParent[key][WidgetKey._valueType] = "";
                jsonMouldObjParent[key][WidgetKey._value] = {};
                var jsonMouldObjChild = jsonMouldObjParent[key][WidgetKey._value];

                if (Array.isArray(value)) {
                    childType = WidgetFileJsonMould._enumParentType._list;
                    jsonMouldObjParent[key][WidgetKey._valueType] = WidgetKey._array;
                } else {
                    var isHave = key.toLowerCase().indexOf("type");
                    if (isHave != -1) {
                        jsonMouldObjParent[key][WidgetKey._valueType] = WidgetKey._enum;
                    } else {
                        jsonMouldObjParent[key][WidgetKey._valueType] = WidgetKey._object;
                    }
                    if (key == WidgetKey._enumParamList) {
                        delete jsonMouldObjParent[key][WidgetKey._showTitle];
                        delete jsonMouldObjParent[key][WidgetKey._valueType];
                        delete jsonMouldObjParent[key][WidgetKey._value];
                        jsonMouldObjChild = jsonMouldObjParent[key];
                    }
                }
                this.createMouldFile(value, jsonMouldObj, keyChild, jsonMouldObjChild, jsonMouldObjParent[key], childType);
            } else {
                // todo 枚举类型未完
                if (typeof(value) == WidgetKey._string) {
                    if (key == WidgetKey._enumType) {
                        jsonMouldObjGrandParent[WidgetKey._valueType] = WidgetKey._enum;
                        delete jsonMouldObjParent[key];
                    } else {
                        jsonMouldObjParent[key][WidgetKey._valueType] = WidgetKey._string;
                    }
                } else if (typeof(value) == WidgetKey._number) {
                    jsonMouldObjParent[key][WidgetKey._valueType] = WidgetKey._number;
                } else if (typeof(value) == WidgetKey._boolean) {
                    jsonMouldObjParent[key][WidgetKey._valueType] = WidgetKey._boolean;
                } else {
                    var strType = typeof(value);
                    jsonMouldObjParent[key][WidgetKey._valueType] = strType;
                    // WidgetLog.log("[" + typeof(value) + "]" + keyParent + "->" + key + " = " + value);
                }
            }
        } else if (parentType == WidgetFileJsonMould._enumParentType._list) {
            this.createMouldFile(value, jsonMouldObj, keyChild, jsonMouldObjParent, jsonMouldObjGrandParent, childType);
        }
    }
}
