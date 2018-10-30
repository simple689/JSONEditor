function WidgetPanelFileBase() {
    WidgetPanelBase.call(this);
}

WidgetPanelFileBase.prototype = new WidgetPanelBase();
WidgetPanelFileBase.prototype.constructor = WidgetPanelFileBase;

WidgetPanelFileBase.prototype.init = function (elementParentID) {
    WidgetPanelBase.prototype.init.apply(this, arguments);

    var elementParent = getElementById(this._elementParentID);

    this._elementDrop = WidgetDrop.addDrop(elementParent, this, WidgetPanelFileBase.handleFiles);

    this._widgetTab = new WidgetTab();

    this._menuRightTitle = new WidgetMenu();
    this._menuRightContent = new WidgetMenu();
}
WidgetPanelFileBase.handleFiles = function (exec, fileList) {
    for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        exec._widgetTab.addTabWithFile(file);
    }
}
WidgetPanelFileBase.prototype.tabOnContextMenu = function (ele, e, onContextMenuType) {
    switch (onContextMenuType) {
        case WidgetTab._enumOnContextMenuType.tabTitle : {
            WidgetMenu.showMenu(this._menuRightTitle, e, ele);
            break;
        }
        case WidgetTab._enumOnContextMenuType.tabContent : {
            WidgetMenu.showMenu(this._menuRightContent, e, ele);
            break;
        }
    }
}
WidgetPanelFileBase.prototype.loadedJson = function (fileReader) {
}
