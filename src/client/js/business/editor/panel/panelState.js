function PanelState() {
    WidgetPanelBase.call(this);
}

PanelState.prototype = new WidgetPanelBase();
PanelState.prototype.constructor = PanelState;

PanelState.prototype.init = function (elementParentID) {
    WidgetPanelBase.prototype.init.apply(this, arguments);

    var elementParent = getElementById(this._elementParentID);

    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._keyShow = "信息";
    WidgetHtml.addLabel(elementParent, jsonObjCtrl);
}
