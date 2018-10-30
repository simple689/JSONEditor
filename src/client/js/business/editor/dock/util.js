function getWidgetTab(panel) {
    var widgetTab = null;
    if (panel == confPanelFileEditor) {
        widgetTab = gPanelFileEditor._widgetTab;
    } else if (panel == confPanelFileMould) {
        widgetTab = gPanelFileMould._widgetTab;
    } else if (panel == confPanelFileLink) {
        widgetTab = gPanelFileLink._widgetTab;
    }
    return widgetTab;
}
function getWidgetTabWithExtend(fileExtend) {
    var widgetTab = null;
    if (fileExtend == APIData._extendJson) {
        widgetTab = gPanelFileEditor._widgetTab;
    } else if (fileExtend == APIData._extendJsonMd) {
        widgetTab = gPanelFileMould._widgetTab;
    }
    return widgetTab;
}
