function WidgetDrop() {
}

WidgetDrop._borderColorNormal = "rgba(102,102,102,0)";
WidgetDrop._borderColorFocus = "rgba(102,102,102,1)";

WidgetDrop.createDrop = function (elementParent, exec, callback) {
    var elementDrop = WidgetHtml.addDiv(elementParent);
    return WidgetDrop.addDrop(elementDrop, exec, callback);
}
WidgetDrop.addDrop = function (elementParent, exec, callback) {
    WidgetHtml.classAdd(elementParent, "widgetDrop");
    elementParent._exec = exec;
    elementParent._callback = callback;

    // 拖拽的目标对象document监听drop并防止浏览器打开客户端的图片
    document.ondragover = WidgetDrop.onDragOverDocument;
    document.ondrop = WidgetDrop.onDropDocument;
    elementParent.ondragover = WidgetDrop.onDragOverItem;
    elementParent.ondragenter = WidgetDrop.onDragEnterItem;
    elementParent.ondragleave = WidgetDrop.onDragLeaveItem;
    elementParent.ondrop = WidgetDrop.onDropItem;

    return elementParent;
}

WidgetDrop.onDragOverDocument = function (e) {
    e.preventDefault(); // 只有在onDragOver中阻止默认行为才能触发onDrop而不是onDragLeave
}
WidgetDrop.onDropDocument = function (e) {
    e.preventDefault(); // 阻止onDrop的默认行为（在新窗口中打开拖进的图片）
}
WidgetDrop.onDragOverItem = function (e) {
    this.style.borderColor = WidgetDrop._borderColorFocus;
    e.stopPropagation();
    e.preventDefault();
}
WidgetDrop.onDragEnterItem = function (e) {
    this.style.borderColor = WidgetDrop._borderColorFocus;
    e.stopPropagation();
    e.preventDefault();
}
WidgetDrop.onDragLeaveItem = function (e) {
    this.style.borderColor = WidgetDrop._borderColorNormal;
    e.stopPropagation();
    e.preventDefault();
}
WidgetDrop.onDropItem = function (e) {
    this.style.borderColor = WidgetDrop._borderColorNormal;
    e.stopPropagation();
    e.preventDefault();
    if (this._callback) {
        this._callback(this._exec, e.dataTransfer.files);
    }
}
