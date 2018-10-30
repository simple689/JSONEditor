function JsonObjCtrl(exec, obj, key) {
    this._exec = exec;

    this._obj = obj;
    this._objMd = null;

    this._key = key;
    this._keyShow = null;

    this._type = WidgetKey._none;

    this._value = null;
    this._valueList = null;

    this._placeholder = null;

    this._onClick = null;
    this._onChange = null;
    this._onKeyUp = null;
    this._onFocus = null;
    this._onMouseEnter = null;
};
function JsonListItem(key, keyShow) {
    this._key = key;
    this._keyShow = keyShow;
};
function JsonListCtrlStatic() {
    var list = new Array();
    for(var i = 0; i < arguments.length; i++){
        list.push(arguments[i]);
    }
    return list;
}
function JsonListCtrl(len) {
    this._list = new Array();
    for(var i = 0; i < len; i++){
        this._list.push(new JsonListItem(i,i));
    }
    return this;
}
JsonListCtrl.prototype.getList = function() {
    return this._list;
}
JsonListCtrl.prototype.insertItem = function(item) {
    this._list.push(item);
}
JsonObjCtrl._valueTypeList = JsonListCtrlStatic(
    new JsonListItem(WidgetKey._object,"对象"),
    new JsonListItem(WidgetKey._objectHorizon,"对象（水平排列）"),
    new JsonListItem(WidgetKey._array,"列表"),
    new JsonListItem(WidgetKey._string,"字符串"),
    new JsonListItem(WidgetKey._number,"数字"),
    new JsonListItem(WidgetKey._boolean,"真假"),
    new JsonListItem(WidgetKey._enum,"枚举"),
    new JsonListItem(WidgetKey._link,"链接"));

JsonObjCtrl._fileBrowserTypeList = JsonListCtrlStatic(
    new JsonListItem(WidgetKey._animationClip,"AnimationClip"),
    new JsonListItem(WidgetKey._audioClip,"AudioClip"),
    new JsonListItem(WidgetKey._audioMixer,"AudioMixer"),
    new JsonListItem(WidgetKey._font,"Font"));
