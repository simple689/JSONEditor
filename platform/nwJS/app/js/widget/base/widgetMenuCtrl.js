function MenuListItem(title, event, param) {
    this._title = title;
    this._event = event;
    this._param = param;
    this._listParent = null;
    this._list = null;
}
MenuListItem.prototype.setListParent = function(listParent) {
    this._listParent = listParent;
}

function MenuListCtrlStatic() {
    var list = new Array();
    for(var i = 0; i < arguments.length; i++){
        list.push(arguments[i]);
    }
    return list;
}
function MenuListCtrl() {
    this._list = this.createList();
    return this;
}
MenuListCtrl.prototype.getList = function() {
    return this._list;
}
MenuListCtrl.prototype.createList = function() {
    var list = new Array();
    return list;
}
MenuListCtrl.prototype.insertItem = function(item) {
    if (item._listParent) {
        item._listParent.push(item);
    } else {
        this._list.push(item);
    }
}
MenuListCtrl.prototype.insertItemList = function(item) {
    item._list = this.createList();
    this.insertItem(item);
    return item._list;
}
// MenuListCtrl._valueTypeList = MenuListCtrlStatic(
//     new MenuListItem(WidgetKey._object,"对象"),
//     new MenuListItem(WidgetKey._array,"列表"),
//     new MenuListItem(WidgetKey._string,"字符串"),
//     new MenuListItem(WidgetKey._number,"数字"),
//     new MenuListItem(WidgetKey._boolean,"真假"),
//     new MenuListItem(WidgetKey._enum,"枚举"),
//     new MenuListItem(WidgetKey._link,"链接"));
