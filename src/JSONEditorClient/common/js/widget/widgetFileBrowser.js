function WidgetFileBrowser() {
}

WidgetFileBrowser._jsonStore = null;
WidgetFileBrowser._jsonPersonal = null;

WidgetFileBrowser.prototype.create = function (elementParent, type, widgetID) {
    this._divMain = WidgetHtml.addDiv(elementParent);
    WidgetHtml.classAdd(this._divMain, "widgetFileBrowserMain");

    this._divLeft = WidgetHtml.addDiv(this._divMain);
    WidgetHtml.classAdd(this._divLeft, "widgetFileBrowserLeft");

    this._divMiddle = WidgetHtml.addDiv(this._divMain);
    WidgetHtml.classAdd(this._divMiddle, "widgetFileBrowserMiddle");

    this._divRight = WidgetHtml.addDiv(this._divMain);
    WidgetHtml.classAdd(this._divRight, "widgetFileBrowserRight");

    this._widgetID = widgetID;

    this._menuFoldCtrl = new WidgetMenuFold();
    this._flexCtrl = new WidgetFlex();

    // 从服务器获取
    this._jsonStateMenuFold = {};
    this._jsonStateFlex = {};
    this._nowFolder = "/";

    // 从服务器获取数据，如果失败，从历史获取数据
    var jsonData = {};
    jsonData[APIData._module] = API._module._fileBrowser;
    jsonData[APIData._func] = API._func._fileBrowser._query;
    jsonData[APIData._type] = type;
    jsonData[APIData._widgetID] = widgetID;
    WidgetHttpAJAX.createPost(null, jsonData, this, WidgetFileBrowser.ajaxCompleteJsonFileBrowser);
}
WidgetFileBrowser.ajaxCompleteJsonFileBrowser = function (widgetFileBrowser, error, jsonData) {
    var jsonObj = null;
    if (error) {
        jsonObj = WidgetHistory.getFileBrowser(widgetFileBrowser._widgetID);
    } else {
        if (jsonData[APIData._data]) {
            jsonObj = jsonData[APIData._data];
        }
    }
    if (jsonObj) {
        WidgetFileBrowser._jsonStore = jsonObj[APIData._storeShow];
        WidgetFileBrowser._jsonPersonal = jsonObj[APIData._personalShow];
        if (jsonObj[APIData._widgetID] && jsonObj[APIData._widgetID][widgetFileBrowser._widgetID]) {
            var jsonObjWidget = jsonObj[APIData._widgetID][widgetFileBrowser._widgetID];
            widgetFileBrowser._jsonStateMenuFold = jsonObjWidget[APIData._stateMenuFold];
            widgetFileBrowser._jsonStateFlex = jsonObjWidget[APIData._stateFlex];
        }
    }
    widgetFileBrowser.init();
}
WidgetFileBrowser.prototype.init = function () {
    // WidgetLog.log(JSON.stringify(WidgetFileBrowser._jsonFileBrowser, null, 2));
    var left = this._divLeft;
    var middle = this._divMiddle;
    var right = this._divRight;
    middle.onmousedown = function (e) {
        var x = (e || event).clientX;
        middle.left = middle.offsetLeft;
        document.onmousemove = function (e) {
            var iT = middle.left + ((e || event).clientX - x);
            var maxT = document.body.clientWidth;
            iT < 30 && (iT = 30);
            iT > maxT && (iT = maxT);
            middle.style.left = left.style.width = iT + "px";
            return false;
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            middle.releaseCapture && middle.releaseCapture()
        };
        middle.setCapture && middle.setCapture();
        return false
    };

    this.initLeft(left);
    this.initRight(right);
}
WidgetFileBrowser.prototype.initLeft = function (left) {
    var obj = {};
    obj["path"] = "/" + APIData._storeShow;
    var jsonObjCtrl = new JsonObjCtrl(this, obj, null);
    jsonObjCtrl._keyShow = APIData._storeShow;
    jsonObjCtrl._onClick = WidgetFileBrowser.onClickFolderName;
    var isCheck = this._jsonStateMenuFold[obj["path"]]; // 展开状态
    var dd = this._menuFoldCtrl.createMenuFold(left, jsonObjCtrl, isCheck);
    this.readFileBrowser(WidgetFileBrowser._jsonStore, obj["path"], dd);

    obj = {};
    obj["path"] = "/" + APIData._personalShow;
    jsonObjCtrl = new JsonObjCtrl(this, obj, null);
    jsonObjCtrl._keyShow = APIData._personalShow;
    jsonObjCtrl._onClick = WidgetFileBrowser.onClickFolderName;
    isCheck = this._jsonStateMenuFold[obj["path"]]; // 展开状态
    dd = this._menuFoldCtrl.createMenuFold(left, jsonObjCtrl, isCheck);
    this.readFileBrowser(WidgetFileBrowser._jsonPersonal, obj["path"], dd);
}
WidgetFileBrowser.prototype.initRight = function (right) {
    this._flexCtrl.createFlex(right, '全部文件');
}
WidgetFileBrowser.prototype.readFileBrowser = function (jsonObj, pathParent, elementParent) {
    var jsonObjFolderList = jsonObj[APIData._folderList];
    if (!jsonObjFolderList) {
        return;
    }
    for (var key in jsonObjFolderList) {
        var value = jsonObjFolderList[key];

        if (typeof(value) == WidgetKey._object) {
            var pathChild = pathParent;
            var dd = elementParent;
            var type = value[APIData._type];

            if (type == APIData._folder) {
                pathChild += "/";
                pathChild += key;
                value["path"] = pathChild;

                var jsonObjCtrl = new JsonObjCtrl(this, value, key);
                jsonObjCtrl._keyShow = key;
                jsonObjCtrl._onClick = WidgetFileBrowser.onClickFolderName;
                var dt = this._menuFoldCtrl.addFold(elementParent, jsonObjCtrl);

                WidgetHtml.addBr(dt);
                // 展开状态
                if (this._jsonStateMenuFold[pathChild]) {
                    dd = this._menuFoldCtrl.addFoldItem(dt, true);
                } else {
                    dd = this._menuFoldCtrl.addFoldItem(dt, false);
                }
            }
            this.readFileBrowser(value, pathChild, dd);
        }
    }
}
WidgetFileBrowser.prototype.refreshFileBrowserLeft = function () {
    removeElementChild(this._divLeft);
    this.initLeft(this._divLeft);

    var jsonObjFolder = WidgetFileBrowser.getJsonObjPath(this._nowFolder);
    this.refreshFileBrowserRight(jsonObjFolder); // 记住当前选中文件夹，刷新
}
WidgetFileBrowser.prototype.refreshFileBrowserRight = function (jsonObj) {
    this._flexCtrl.clearFlexItem();

    if (typeof(jsonObj) == WidgetKey._object) {
        var path = jsonObj["path"];

        var folderList = jsonObj[APIData._folderList];
        for (var o in folderList) {
            var key = o;
            var value = folderList[o];
            if (typeof(value) == WidgetKey._object) {
                var rightContent = WidgetHtml.createElement("div");
                // rightContent.innerHTML = path + key;
                rightContent.innerHTML = key;
                var flexItem = this._flexCtrl.addFlexItem(rightContent);
                WidgetHtml.classAdd(flexItem, "widgetFileBrowserRightContent");
            }
        }

        var fileList = jsonObj[APIData._fileList];
        for (var o in fileList) {
            var key = o;
            var value = fileList[o];
            if (typeof(value) == WidgetKey._object) {
                var rightContent = WidgetHtml.createElement("div");
                // rightContent.innerHTML = path + key;
                rightContent.innerHTML = key;
                var flexItem = this._flexCtrl.addFlexItem(rightContent);
                WidgetHtml.classAdd(flexItem, "widgetFileBrowserRightContent");
            }
        }
    }
}
WidgetFileBrowser.prototype.refreshFileBrowserRightPath = function (path) {
    this._nowFolder = path;
    var jsonObj = WidgetFileBrowser.getJsonObjPath(path);
    this.refreshFileBrowserRight(jsonObj);
}
// WidgetFileBrowser.getJsonObjFolder = function (folderList, jsonObj, jsonObjOrg) {
//     for (var i = 0; i < folderList.length; i++) {
//         var item = folderList[i];
//         if (item.length > 0) {
//             for (var o in jsonObj) {
//                 var key = o;
//                 var value = jsonObj[key];
//                 var keyShow = value[WidgetKey._title];
//                 if (item == keyShow) {
//                     var folderListNew = folderList.slice(i + 1, folderList.length + 1);
//                     var jsonObjNew = value[APIData._folderList];
//                     return WidgetFileBrowser.getJsonObjFolder(folderListNew, jsonObjNew, value);
//                 }
//             }
//         }
//         if (i == folderList.length - 1) {
//             return jsonObjOrg;
//         }
//     }
//     return null;
// }

WidgetFileBrowser.getJsonObjPath = function (folder) {
    var folderList = folder.split("/");
    return WidgetFileBrowser.getJsonObjFolder(folderList, WidgetFileBrowser._jsonFileBrowser, WidgetFileBrowser._jsonFileBrowser);
}
WidgetFileBrowser.getJsonObjFolder = function (folderList, jsonObj, jsonObjOrg) {
    for (var i = 0; i < folderList.length; i++) {
        var item = folderList[i];
        if (item.length > 0) {
            var value = jsonObj[item];
            if (value) {
                var folderListNew = folderList.slice(i + 1, folderList.length + 1);
                if (folderListNew.length == 0) {
                    return value;
                }
                var jsonObjNew = value[APIData._folderList];
                return WidgetFileBrowser.getJsonObjFolder(folderListNew, jsonObjNew, value);
            }
        }
        if (i == folderList.length - 1) {
            return jsonObjOrg;
        }
    }
    return null;
}
WidgetFileBrowser.onClickFolderName = function () {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    var widgetFileBrowser = jsonObjCtrl._exec;

    widgetFileBrowser._nowFolder = this._jsonObjCtrl._obj["path"];
    widgetFileBrowser.refreshFileBrowserRight(this._jsonObjCtrl._obj);
    if (widgetFileBrowser._nowElementInputFilePath) {
        widgetFileBrowser._nowElementInputFilePath.value = widgetFileBrowser._nowFolder;
    }
}
WidgetFileBrowser.onClickFolderPath = function () {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    var widgetFileBrowser = jsonObjCtrl._exec;

    widgetFileBrowser.refreshFileBrowserRight(jsonObjCtrl._obj);
}
WidgetFileBrowser.onClickRefreshDir = function () {
    // todo
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    var widgetFileBrowser = jsonObjCtrl._exec;

}
WidgetFileBrowser.onClickCreateDir = function () {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);

    if (WidgetUser._jsonLoginCache) {
        WidgetFileBrowser.createDir(jsonObjCtrl);
    } else {
        WidgetUser._widgetUserDialog = new WidgetUserDialog();
        WidgetUser._widgetUserDialog.createDialogLogin(WidgetFileBrowser.createDir, jsonObjCtrl);
    }
}
WidgetFileBrowser.createDir = function (jsonObjCtrl) {
    var widgetDialog = new WidgetDialog();
    widgetDialog.createDialogOneInput(document.body, "新建文件夹", "请输入文件夹名字：", WidgetFileBrowser.callbackCreateDir);
    widgetDialog._jsonObjCtrl = jsonObjCtrl;
}
WidgetFileBrowser.callbackCreateDir = function (ok, value) {
    if (ok) {
        var jsonObjCtrl = this._jsonObjCtrl;
        var widgetFileBrowser = jsonObjCtrl._exec;

        var path = jsonObjCtrl._obj.path;
        var isPersonal = path.indexOf(APIData._personalShow);
        if (isPersonal != -1) {
            var folderList = path.split("/");
            var jsonObj = WidgetFileBrowser.getJsonObjFolder(folderList, WidgetFileBrowser._jsonFileBrowser, WidgetFileBrowser._jsonFileBrowser);
            if (!jsonObj) {
                return;
            }
            APIUtil.fileBrowser.addFolder(jsonObj, value);
        }
        widgetFileBrowser.refreshFileBrowserLeft();
        // todo 发送给服务器
        var jsonData = {};
        jsonData[APIData._module] = API._module._fileBrowser;
        jsonData[APIData._func] = API._func._fileBrowser._up;
        jsonData[APIData._type] = API._fileBrowser._type._personal;
        jsonData[APIData._data] = WidgetFileBrowser._jsonFileBrowser[APIData._personalShow];
        WidgetHttpAJAX.createPost(null, jsonData, this, WidgetFileBrowser.ajaxCompleteCreateDir);
    }
}
WidgetFileBrowser.ajaxCompleteCreateDir = function (widgetFileBrowser, error, jsonData) {
    if (error) {
        WidgetFileBrowser._jsonFileBrowser = WidgetHistory.getFileBrowser();
    } else {
        if (jsonData[APIData._data]) {
            WidgetFileBrowser._jsonFileBrowser = jsonData[APIData._data];
        }
    }
    widgetFileBrowser.initDefault();
}
WidgetFileBrowser.onContextMenuRoot = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    var menu = WidgetFileMenu.createMenu();
    var ul = menu.addUl(menu._elementParent);
    var li = null;

    li = menu.addLi(ul, "刷新", WidgetFileBrowser.onClickRefreshDir, null);

    if (jsonObjCtrl._keyShow == APIData._personalShow) {
        li = menu.addLi(ul, "新建文件夹", WidgetFileBrowser.onClickCreateDir, null);
    }

    var func = WidgetFileUtil.getExec(this).onContextMenuRoot;
    if (func) func(menu, ul);
    WidgetMenu.showMenu(menu, e, this);
    return false; // 取消右键点击的默认事件
}
WidgetFileBrowser.onContextMenuObject = function (e) {
    var jsonObjCtrl = WidgetFileUtil.getJsonObjCtrl(this);
    var menu = WidgetFileMenu.createMenu();
    var ul = menu.addUl(menu._elementParent);
    var li = null;

    var path = jsonObjCtrl._obj.path;
    var isPersonal = path.indexOf(APIData._personalShow);
    if (isPersonal != -1) {
        li = menu.addLi(ul, "新建文件夹", WidgetFileBrowser.onClickCreateDir, null);
    }

    if (!li) {
        return false;
    }
    var func = WidgetFileUtil.getExec(this).onContextMenuObject;
    if (func) func(menu, ul);
    WidgetMenu.showMenu(menu, e, this);
    return false; // 取消右键点击的默认事件
}
