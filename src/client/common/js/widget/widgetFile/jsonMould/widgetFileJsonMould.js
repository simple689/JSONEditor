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
        if (typeof(value) == KeyBase._object) {
            var keyChild = keyParent;
            keyChild += "->";
            keyChild += key;

            jsonObjCtrl._value = value;

            var isList = false;
            if (Array.isArray(value)) {
                isList = true;
                jsonObjCtrl._type = KeyBase._array;
            } else {
                jsonObjCtrl._type = KeyBase._object;
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

            if (key == KeyBase._valueType) {
                jsonObjCtrl._value = value;
                jsonObjCtrl._valueList = JsonObjCtrl._valueTypeList;
                jsonObjCtrl._onChange = WidgetFileOnChange.onChangeSelect;

                WidgetHtml.addSelect(elementParent, jsonObjCtrl);
            } else if (key == KeyBase._enumTypeDefault) {
                var enumTypeDefault = jsonObj[KeyBase._enumTypeDefault];
                var enumList = jsonObj[KeyBase._enumList];
                var jsonListCtrl = new JsonListCtrl(0);
                for (var oEnum in enumList) {
                    if (enumTypeDefault && enumTypeDefault.length <= 0 || !enumTypeDefault) {
                        jsonObj[KeyBase._enumTypeDefault] = oEnum;
                        enumTypeDefault = jsonObj[KeyBase._enumTypeDefault];
                    }
                    var valueItemMd = enumList[oEnum];
                    var item = new JsonListItem(oEnum,valueItemMd[KeyBase._showTitle]);
                    jsonListCtrl.insertItem(item);
                }
                jsonObjCtrl._value = enumTypeDefault;
                jsonObjCtrl._valueList = jsonListCtrl.getList();
                jsonObjCtrl._onChange = WidgetFileOnChange.onChangeSelect;

                WidgetHtml.addSelect(elementParent, jsonObjCtrl);
            } else {
                if (valueType == KeyBase._string) {
                    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._textString);
                } else if (valueType == KeyBase._number) {
                    WidgetHtml.addInput(elementParent, jsonObjCtrl, WidgetHtml._enumInputType._textNumber);
                } else if (valueType == KeyBase._boolean) {
                    WidgetHtml.addInput(elementParent, jsonObj, WidgetHtml._enumInputType._checkbox);
                } else {
                    // LogBase.log("[" + typeof(value) + "]" + keyParent + "->" + key + " = " + value);
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
    var jsonObjValue = jsonObj[KeyBase._value];
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
    jsonObj[KeyBase._valueType] = element.value;
    var jsonObjValueType = jsonObj[KeyBase._valueType];
    if (jsonObjValueType == KeyBase._object || jsonObjValueType == KeyBase._objectHorizon || jsonObjValueType == KeyBase._array) {
        jsonObj[KeyBase._value] = {};
    } else if (jsonObjValueType == KeyBase._enum) {
        jsonObj[KeyBase._value] = {};
        jsonObj[KeyBase._value][KeyBase._enumTypeDefault] = "";
        jsonObj[KeyBase._value][KeyBase._enumList] = {};
    } else if (jsonObjValueType == KeyBase._link) {
        jsonObj[KeyBase._value] = {};
        jsonObjValue = jsonObj[KeyBase._value];
        jsonObjValue[KeyBase._linkFile] = "";
        jsonObjValue[KeyBase._linkKey] = "";
    } else {
        delete jsonObj[KeyBase._value];
    }
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.changeSelectEnumDefault = function (element) {
    var jsonObjCtrl = element._jsonObjCtrl;
    var jsonObj = jsonObjCtrl._obj;
    var value = element.value;
    jsonObj[KeyBase._enumTypeDefault] = value;
    jsonObjCtrl._exec.refreshContent();
}
WidgetFileJsonMould.prototype.refreshContent = function () {
    var widgetTab = this._elementTabContent._elementTabTitle._widgetTab;
    widgetTab.refreshContent(this._elementTabContent, this._jsonObj, WidgetTab._enumAddContentType.fileJsonObj);
}
WidgetFileJsonMould.prototype.isMouldIgnore = function (key) {
    for (var ignoreIndex in this._jsonMouldObj[KeyBase._ignore][KeyBase._beginList]) {
        var ignoreValue = this._jsonMouldObj[KeyBase._ignore][KeyBase._beginList][ignoreIndex];
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
    LogBase.log("========================================");
    LogBase.log(JSON.stringify(this._jsonMouldObj, null, 2));
    LogBase.log("========================================");
    return true;
}
// 创建mould
WidgetFileJsonMould.prototype.createMould = function (jsonObj) {
    this._jsonMouldObj = {};
    this._jsonMouldObj[KeyBase._ignore] = {};
    this._jsonMouldObj[KeyBase._ignore][KeyBase._beginList] = new Array();
    this._jsonMouldObj[KeyBase._ignore][KeyBase._beginList].push("$");

    this._jsonMouldObj[KeyBase._file] = {};
    this.createMouldFile(jsonObj, this._jsonMouldObj, "", this._jsonMouldObj[KeyBase._file], this._jsonMouldObj, WidgetFileJsonMould._enumParentType._base);
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
            jsonMouldObjParent[key][KeyBase._showTitle] = key;
            if (typeof(value) == KeyBase._object) {
                jsonMouldObjParent[key][KeyBase._valueType] = "";
                jsonMouldObjParent[key][KeyBase._value] = {};
                var jsonMouldObjChild = jsonMouldObjParent[key][KeyBase._value];

                if (Array.isArray(value)) {
                    childType = WidgetFileJsonMould._enumParentType._list;
                    jsonMouldObjParent[key][KeyBase._valueType] = KeyBase._array;
                } else {
                    var isHave = key.toLowerCase().indexOf("type");
                    if (isHave != -1) {
                        jsonMouldObjParent[key][KeyBase._valueType] = KeyBase._enum;
                    } else {
                        jsonMouldObjParent[key][KeyBase._valueType] = KeyBase._object;
                    }
                    if (key == KeyBase._enumParamList) {
                        delete jsonMouldObjParent[key][KeyBase._showTitle];
                        delete jsonMouldObjParent[key][KeyBase._valueType];
                        delete jsonMouldObjParent[key][KeyBase._value];
                        jsonMouldObjChild = jsonMouldObjParent[key];
                    }
                }
                this.createMouldFile(value, jsonMouldObj, keyChild, jsonMouldObjChild, jsonMouldObjParent[key], childType);
            } else {
                // todo 枚举类型未完
                if (typeof(value) == KeyBase._string) {
                    if (key == KeyBase._enumType) {
                        jsonMouldObjGrandParent[KeyBase._valueType] = KeyBase._enum;
                        delete jsonMouldObjParent[key];
                    } else {
                        jsonMouldObjParent[key][KeyBase._valueType] = KeyBase._string;
                    }
                } else if (typeof(value) == KeyBase._number) {
                    jsonMouldObjParent[key][KeyBase._valueType] = KeyBase._number;
                } else if (typeof(value) == KeyBase._boolean) {
                    jsonMouldObjParent[key][KeyBase._valueType] = KeyBase._boolean;
                } else {
                    var strType = typeof(value);
                    jsonMouldObjParent[key][KeyBase._valueType] = strType;
                    // LogBase.log("[" + typeof(value) + "]" + keyParent + "->" + key + " = " + value);
                }
            }
        } else if (parentType == WidgetFileJsonMould._enumParentType._list) {
            this.createMouldFile(value, jsonMouldObj, keyChild, jsonMouldObjParent, jsonMouldObjGrandParent, childType);
        }
    }
}
