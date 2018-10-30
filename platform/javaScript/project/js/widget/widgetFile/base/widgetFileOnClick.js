function WidgetFileOnClick() {
}

WidgetFileOnClick.onClickRefresh = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickRefresh;
    if (func) func(this);
}
WidgetFileOnClick.onClickSave = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickSave;
    if (func) func(this);
}
WidgetFileOnClick.onClickSaveAs = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickSaveAs;
    if (func) func(this);
}
WidgetFileOnClick.onClickDownLoad = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickDownLoad;
    if (func) func(this);
}
WidgetFileOnClick.onClickObjectAdd = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickObjectAdd;
    if (func) func(this);
}
WidgetFileOnClick.onClickObjectDel = function (e) {
    if (!confirm("确定要 “删除对象” 吗？")) { // 利用对话框返回的值（true 或者 false）
        return;
    }
    var func = WidgetFileUtil.getExec(this).constructor.onClickObjectDel;
    if (func) func(this);
}
WidgetFileOnClick.onClickListAdd = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickListAdd;
    if (func) func(this);
}
WidgetFileOnClick.onClickListDel = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickListDel;
    if (func) func(this);
}
WidgetFileOnClick.onClickListClear = function (e) {
    if (!confirm("确定要 “列表中清空对象” 吗？")) { // 利用对话框返回的值（true 或者 false）
        return;
    }
    var func = WidgetFileUtil.getExec(this).constructor.onClickListClear;
    if (func) func(this);
}
WidgetFileOnClick.onClickRenameKey = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickRenameKey;
    if (func) func(this);
}
WidgetFileOnClick.onClickListToolAdd = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickListToolAdd;
    if (func) func(this);
}
WidgetFileOnClick.onClickListToolClear = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickListToolClear;
    if (func) func(this);
}
WidgetFileOnClick.onClickListToolDel = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickListToolDel;
    if (func) func(this);
}
WidgetFileOnClick.onClickLink = function (e) {
    var func = WidgetFileUtil.getExec(this).constructor.onClickLink;
    if (func) func(this);
}
