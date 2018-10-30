// dock
var gDock = null;

var gPanelMenu = null;
var gPanelToolBar = null;
var gPanelState = null;
var gPanelFileBrowser = null;

var gPanelFileEditor = null;
var gPanelFileMould = null;
var gPanelFileLink = null;

function initWidgetDock() {
    gDock = DSXDFUtil.createDSXDFUtil();
    loadDockLayout();
    initDockPanel();
    initDockLayout();
}

function onBeforeUnload() {
    saveDockLayout();
}

function loadDockLayout() {
    var sessionStorage = window['sessionStorage'];
    if (sessionStorage != null) {
        var item = sessionStorage.getItem(confDockLayoutKey);
        if (item != null) {
            gDock.loadStatesFromKey(confDockLayoutKey);
        }
    }
}
function loadDockLayoutFromUser() {
    var jsonData = {};
    jsonData[APIData._module] = API._module._dock;
    jsonData[APIData._func] = API._func._dock._layoutLoad;
    WidgetHttpAJAX.createPost(null, jsonData, this, ajaxCompleteLayoutLoad);
}
function ajaxCompleteLayoutLoad(exec, error, jsonData) {
    if (!error) {
        if (jsonData[APIData._data]) {
            var sessionStorage = window['sessionStorage'];
            if (sessionStorage != null) {
                sessionStorage.setItem(confDockLayoutKey, jsonData[APIData._data]);
            }
        }
    }
    loadDockLayout();
}
function saveDockLayout() {
    if (gDock != null) {
        gDock.saveStatesIntoKey(confDockLayoutKey);
        // 发送给服务器
        var sessionStorage = window['sessionStorage'];
        if (sessionStorage != null) {
            var item = sessionStorage.getItem(confDockLayoutKey);

            var jsonData = {};
            jsonData[APIData._module] = API._module._dock;
            jsonData[APIData._func] = API._func._dock._layoutSave;
            jsonData[APIData._data] = item;
            WidgetHttpAJAX.createPost(null, jsonData, this, ajaxCompleteLayoutSave);
        }
    }
}
function ajaxCompleteLayoutSave(exec, error, jsonData) {
    if (error) {
    } else {
    }
}

function initDockPanel() {
    gDock.addFixedPanel(getElementById(confPanelFixedTop), DSXDFUtil.fixedTop);
    gDock.addFixedPanel(getElementById(confPanelFixedBottom), DSXDFUtil.fixedBottom);

    gDock._panelFileBrowser = gDock.createDFPanel("文件浏览器", "");
    gDock._panelFileBrowser.addContentDiv(getElementById(confPanelFileBrowser));

    gDock.addFixedPanel(getElementById(confPanelFileEditor), DSXDFUtil.fixedCenter);

    gDock._panelFileMould = gDock.createDFPanel("文件模版", "");
    gDock._panelFileMould.addContentDiv(getElementById(confPanelFileMould));

    gDock._panelFileLink = gDock.createDFPanel("文件链接", "");
    gDock._panelFileLink.addContentDiv(getElementById(confPanelFileLink));
}
function initDockLayout() {
    gDock._panelFileMould.initLayout(0, 0, 300, 1, DSXDFPanel.dockLeft);
    gDock._panelFileMould.enableNormalHiddenButton(false);

    gDock._panelFileLink.initLayout(0, 0, 300, 1, DSXDFPanel.dockRight);
    gDock._panelFileLink.enableNormalHiddenButton(false);

    gDock._panelFileBrowser.initLayout(0, 0, 1, 200, DSXDFPanel.dockBottom);
    gDock._panelFileBrowser.enableNormalHiddenButton(false);

    // gDock._panelFileBrowser.setInitialLayoutReference(panelView);
}

function getDockPanelVisible(panel) {
    var com = panel._$hT._$hu;
    var isVisible = true;
    if (com.style.visibility == "hidden") {
        isVisible = false;
    }
    return isVisible;
}
function changeDockPanelVisible(panel) {
    var isVisible = !getDockPanelVisible(panel);
    panel.setVisible(isVisible);
    return isVisible;
}

function initPanel() {
    gPanelMenu = new PanelMenu();
    gPanelToolBar = new PanelToolBar();
    gPanelState = new PanelState();
    gPanelFileBrowser = new PanelFileBrowser();

    gPanelFileEditor = new PanelFileEditor();
    gPanelFileMould = new PanelFileMould();
    gPanelFileLink = new PanelFileLink();
}

// document
function onClickDocument() {
    WidgetMenu.hideMenuAll();
    // WidgetSearch.hideSearchAll();
    return true;
}

function onContextMenuDocument() {
    WidgetMenu.hideMenuAll();
    return false;
}

function onResizeWindow() {
    // window.location.reload();
    // window.history.go(0);
    // initDockLayout();
    WidgetDialog.resizeWindow();
    return true;
}

// exe
$(document).ready(function () {
    console.log("[dock] start");
    WidgetLog.init();
    WidgetHistory.init();

    initPanel();

    $('#panelFixedTop').load("../panel/panelMenu.html", function () {
        gPanelMenu.init(confPanelMenu);
        gPanelToolBar.init(confPanelToolBar);
    });
    $('#panelFixedBottom').load("../panel/panelState.html", function () {
        gPanelState.init(confPanelState);
    });
    gPanelFileBrowser.init(confPanelFileBrowser);

    gPanelFileEditor.init(confPanelFileEditor);
    gPanelFileMould.init(confPanelFileMould);
    gPanelFileLink.init(confPanelFileLink);

    // blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu
    document.onclick = onClickDocument;
    document.oncontextmenu = onContextMenuDocument;
    window.onresize = onResizeWindow;

    console.log("[dock] end");
})
