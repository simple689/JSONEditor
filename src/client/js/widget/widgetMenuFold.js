/**
 * 菜单折叠
 **/
function WidgetMenuFold() {
}

WidgetMenuFold.prototype.createMenuFold = function (elementParent, jsonObjCtrl, isCheck) {
    this._menuFold = WidgetHtml.addDiv(elementParent);
    WidgetHtml.classAdd(this._menuFold, "widgetMenuFold");
    var dd = this.addFoldAndItem(this._menuFold, jsonObjCtrl, isCheck);
    return dd;
}
WidgetMenuFold.prototype.addFoldAndItem = function (elementParent, jsonObjCtrl, isCheck) {
    var dt = this.addFold(elementParent, jsonObjCtrl);
    var dd = this.addFoldItem(dt, isCheck);
    return dd;
}
WidgetMenuFold.prototype.addFold = function (elementParent, jsonObjCtrl) {
    var dl = WidgetHtml.createElement("dl");
    elementParent.appendChild(dl);

    var dt = WidgetHtml.createElement("dt");
    dl.appendChild(dt);

    var jsonObjCtrlSub = new JsonObjCtrl(jsonObjCtrl._exec, jsonObjCtrl._obj, null);
    jsonObjCtrlSub._onClick = WidgetMenuFold.onClickDt;
    var labelCheck = WidgetHtml.addLabel(dt, jsonObjCtrlSub);
    WidgetHtml.classAdd(labelCheck, "widgetMenuFoldLabelCheck");

    jsonObjCtrlSub = new JsonObjCtrl(jsonObjCtrl._exec, null, null);
    jsonObjCtrlSub._keyShow = jsonObjCtrl._keyShow;
    jsonObjCtrlSub._value = jsonObjCtrl._value;
    jsonObjCtrlSub._onClick = jsonObjCtrl._onClick;
    var labelTitle = WidgetHtml.addLabel(dt, jsonObjCtrl);
    WidgetHtml.classAdd(labelTitle, "widgetMenuFoldLabelTitle");

    dt._dl = dl;
    dt._labelCheck = labelCheck;
    dt.onmouseenter = jsonObjCtrl._onMouseEnter;
    labelCheck._dt = dt;
    return dt;
}
WidgetMenuFold.prototype.addFoldItem = function (dt, isCheck) {
    var dd = WidgetHtml.createElement("dd");
    dt._dl.appendChild(dd);
    dd._dt = dt;
    dd._isCheck = isCheck;
    WidgetMenuFold.setDdDisplay(dd, dt._labelCheck, isCheck);
    return dd;
}
WidgetMenuFold.setDdDisplay = function (dd, labelCheck, isCheck) {
    //展开和收齐的不同状态下更换小图标
    if (isCheck) {
        dd.style.display = WidgetKey._block;
        $(labelCheck).css(
            "background-image", "url(/html5/img/widget/widgetMenuFold/menuFold_arrowBottom.jpg)"
        );
    } else {
        dd.style.display = WidgetKey._none;
        $(labelCheck).css(
            "background-image", "url(/html5/img/widget/widgetMenuFold/menuFold_arrowTop.jpg)"
        );
    }
}
WidgetMenuFold.setDdCheck = function (elementDd, elementLabel, isCheck) {
    var tagName = elementDd.tagName;
    if (tagName == "DD") {
        var labelCheck = elementLabel;
        if (!labelCheck) {
            labelCheck = elementDd._dt._labelCheck;
        }
        var exec = labelCheck._jsonObjCtrl._exec;
        var execType = exec.constructor.name;
        if (execType == WidgetFileBrowser.name) {
            if (exec._jsonStateMenuFold) {
                var path = labelCheck._jsonObjCtrl._obj["path"];
                exec._jsonStateMenuFold[path] = isCheck;
                WidgetHistory.setFileBrowser(WidgetFileBrowser._jsonStore, WidgetFileBrowser._jsonPersonal, exec._widgetID, exec._jsonStateMenuFold, exec._jsonStateFlex);
            }
        } else if (execType == WidgetFileJsonMould.name) {
            // todo 记录状态
            var a = 0;
        }
        WidgetMenuFold.setDdDisplay(elementDd, labelCheck, isCheck);
    }
}
WidgetMenuFold.onClickDt = function (e) {
    // // 与触发事件的对象相关的鼠标位置的XY坐标;
    // var x = e.x;
    // var y = e.y;
    // // 获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算位置。
    // var offsetTop = e.offsetTop;
    // var offsetLeft = e.offsetLeft;
    // var offsetHeight = e.offsetHeight;
    // var offsetWidth = e.offsetWidth;
    // // 获取定义对象 offsetTop 和 offsetLeft 属性的容器对象的引用。
    // var offsetParent = e.offsetParent;
    // // 获取对象的高度，不计算任何边距、边框、滚动条或可能应用到该对象的补白。
    // var clientHeight = e.clientHeight;
    // var clientWidth = e.clientWidth;
    // // 获取 offsetLeft 属性和客户区域的实际左边之间的距离。
    // var clientLeft = e.clientLeft;
    // var clientTop = e.clientTop;
    // // 设置或获取获取鼠标指针位置相对于用户屏幕的 x 坐标
    // var screenX = e.screenX;
    // // 设置或获取鼠标指针位置相对于触发事件的对象的 x 坐标。
    // var offsetX = e.offsetX;
    // var offsetY = e.offsetY;
    // // 设置或获取鼠标指针位置相对于窗口客户区域的 x 坐标，其中客户区域不包括窗口自身的控件和滚动条
    // var clientX = e.clientX;

    if (!e) {
        return;
    }
    var nextNode = this._dt.nextSibling;
    while (nextNode) {
        var tagName = nextNode.tagName;
        if (tagName == "DD") {
            nextNode._isCheck = !nextNode._isCheck;
            WidgetMenuFold.setDdCheck(nextNode, this, nextNode._isCheck);
        } else if (tagName == "DT") {
            break;
        }
        nextNode = nextNode.nextSibling;
    }
}
