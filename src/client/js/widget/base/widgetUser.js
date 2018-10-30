function WidgetUser() {
}

WidgetUser._enumClientType = {
    webPC: 0,
    webMobile: 1,
    appPc: 2,
    appMobile: 3
}
WidgetUser._client = WidgetUser._enumClientType.webPC;

WidgetUser._jsonLoginCache = null;
WidgetUser._widgetUserDialog = null;

WidgetUser.init = function (elementParent) {
    WidgetUser._elementParent = elementParent;
    if (WidgetUser._jsonLoginCache) {
        WidgetUser.initMenuLogout();
    } else {
        WidgetUser.initMenuLogin();
    }
}
WidgetUser.initMenuLogin = function () {
    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "登录";
    jsonObjCtrl._onClick = WidgetUser.onClickMenuLogin;
    WidgetHtml.addInput(WidgetUser._elementParent, jsonObjCtrl, WidgetHtml._enumInputType._button);
}
WidgetUser.initMenuLogout = function () {
    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "用户";
    jsonObjCtrl._valueList = new MenuListCtrl();
    jsonObjCtrl._valueList.insertItem(new MenuListItem("个人中心", WidgetUser.onClickMenuLogout, APIData._extendJson));
    jsonObjCtrl._valueList.insertItem(new MenuListItem("退出", WidgetUser.onClickMenuLogout, APIData._extendJsonMd));
    WidgetHtml.addInput(WidgetUser._elementParent, jsonObjCtrl, WidgetHtml._enumInputType._buttonMenu);
}
// 点击事件 menu
WidgetUser.onClickMenuLogin = function () {
    WidgetUser._widgetUserDialog = new WidgetUserDialog();
    WidgetUser._widgetUserDialog.createDialogLogin();
}
WidgetUser.onClickMenuLogout = function () {
}
// 点击事件
WidgetUser.onClickLogin = function () {
    var userName = WidgetUser._widgetUserDialog.getUserName();
    var userPWD = WidgetUser._widgetUserDialog.getUserPWD();

    var jsonData = {};
    jsonData[APIData._module] = API._module._user;
    jsonData[APIData._func] = API._func._user._login;
    jsonData[APIData._userName] = userName;
    jsonData[APIData._userPWD] = userPWD;
    WidgetHttpAJAX.createPost(null, jsonData, WidgetUser._widgetUserDialog, WidgetUser.ajaxCompleteLogin);
}
WidgetUser.ajaxCompleteLogin = function (widgetUserDialog, error, jsonData) {
    if (error) {
    } else {
        if (jsonData[APIData._token]) {
            // WidgetFileBrowser._jsonFileBrowser = jsonData[APIData._data];
            WidgetUser._jsonLoginCache = jsonData[APIData._token];
        }

        if (widgetUserDialog._callback) {
            widgetUserDialog._callback(widgetUserDialog._completeJsonObjCtrl);
        }
        widgetUserDialog._widgetDialog.close();
    }
}
WidgetUser.onClickForgetPWD = function () {
    // WidgetUser._widgetUserDialog.createDialogLogin();
}
WidgetUser.onClickRegister = function () {
    // WidgetUser._widgetUserDialog.createDialogLogin();
}
