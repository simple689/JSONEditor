function PanelFileLink() {
    WidgetPanelFileBase.call(this);
}

PanelFileLink.prototype = new WidgetPanelFileBase();
PanelFileLink.prototype.constructor = PanelFileLink;

PanelFileLink.prototype.init = function (elementParentID) {
    WidgetPanelFileBase.prototype.init.apply(this, arguments);

    this._historyItem = confPanelFileLink;
    this._widgetTab.init(this._elementDrop, this,
                         "../../editor/home/homeFileLink.html", PanelFileLink.loadedHome,
                         this._historyItem);

    this._menuRightTitle.createMenuWithHtml(document.body, "../../editor/menu/menuFileLinkTitle.html");
    this._menuRightContent.createMenuWithHtml(document.body, null);
}

PanelFileLink.loadedHome = function (exec, htmlRoot) {
}

PanelFileLink.prototype.loadedJson = function (fileReader) {
    var fileName = fileReader._elementTabTitle._title;
}
