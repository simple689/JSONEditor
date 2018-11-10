// 兼容 external
var base64 = typeof base64 === 'object' ? base64 : global.base64;

// dock
var confDockLayoutKey = "dockLayout";

// panel
var confPanelFixedTop = "panelFixedTop";
var confPanelFixedBottom = "panelFixedBottom";

var confPanelMenu = "panelMenu";
var confPanelToolBar = "panelToolBar";
var confPanelState = "panelState";
var confPanelFileBrowser = "panelFileBrowser";

var confPanelFileEditor = "panelFileEditor";
var confPanelFileMould = "panelFileMould";
var confPanelFileLink = "panelFileLink";

// project_JSONEditor
var confProjectRoot = "/project_JSONEditor/";
var confCommonRoot = "/common/";

// http
var confHttpRoot = "http://127.0.0.1:6989/";

// clientType
var enumConfClientType = {
    webPC: 0,
    webMobile: 1,
    appPC: 2,
    appMobile: 3
}
var confClientType = enumConfClientType.webPC;

var platformUtil = null;
