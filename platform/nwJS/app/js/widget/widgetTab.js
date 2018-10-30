function WidgetTab() {
}

WidgetTab._classIsActive = "isActive";

WidgetTab._slideSpeed = 200;
WidgetTab._enumAddContentType = {
    string: 0,
    html: 1,
    file: 2,
    fileContent: 3,
    fileJsonObj: 4
}
WidgetTab._enumOnContextMenuType = {
    tabTitle: 0,
    tabContent: 1
}

WidgetTab.prototype.init = function (elementParent, exec, htmlHome, callbackLoadedHome, historyItemFile) {
    this._elementTab = WidgetHtml.createElement("figure");
    elementParent.appendChild(this._elementTab);
    WidgetHtml.classAdd(this._elementTab, "widgetTab");
    this._elementTab._widgetTab = this;

    this.initTitleGroup();
    this.initContentGroup();

    this._exec = exec;
    this._elementTabList = new Array();
    this.addHomePage(htmlHome, callbackLoadedHome);
    if (historyItemFile) {
        // this.addHistoryPage(historyItemFile);
    }
}
WidgetTab.prototype.initTitleGroup = function () {
    this._elementTabTitleGroup = WidgetHtml.createElement("ul");
    this._elementTab.appendChild(this._elementTabTitleGroup);
    WidgetHtml.classAdd(this._elementTabTitleGroup, "widgetTabTitleGroup");
    this._elementTabTitleGroup._widgetTab = this;
}
WidgetTab.prototype.initContentGroup = function () {
    this._elementTabContentGroup = WidgetHtml.addDiv(this._elementTab);
    WidgetHtml.classAdd(this._elementTabContentGroup, "widgetTabContentGroup");
    this._elementTabContentGroup._widgetTab = this;
}
WidgetTab.prototype.addHomePage = function (html, callbackLoaded) {
    var elementTabTitle = this.addTitle("首页");
    this.addContent(elementTabTitle, html, WidgetTab._enumAddContentType.html, callbackLoaded);
}
WidgetTab.prototype.addHistoryPage = function (historyItemFile) {
    var fileList = WidgetHistory.getFile(historyItemFile);
    if (!fileList) {
        return;
    }
    for (var o in fileList) {
        var key = o;
        if (key == 0) {
            continue;
        }
        var value = fileList[key]
        var elementTabTitle = this.addTitle(value[WidgetKey._fileName]);
        // this.addContent(elementTabTitle, value[WidgetKey._fileContent], WidgetTab._enumAddContentType.fileContent);
        this.addContent(elementTabTitle, value[WidgetKey._fileContent], WidgetTab._enumAddContentType.fileJsonObj);
    }
}
WidgetTab.prototype.addTabWithFile = function (file) {
    var elementTabTitle = this.addTitle(file.name);
    this.addContent(elementTabTitle, file, WidgetTab._enumAddContentType.file);
}
WidgetTab.prototype.addTabWithFileJsonObj = function (title, fileJsonObj) {
    var elementTabTitle = this.addTitle(title);
    this.addContent(elementTabTitle, fileJsonObj, WidgetTab._enumAddContentType.fileJsonObj);
}
WidgetTab.prototype.addTitle = function (title) {
    var elementTabTitle = WidgetHtml.createElement("li");
    this._elementTabTitleGroup.appendChild(elementTabTitle);
    WidgetHtml.classAdd(elementTabTitle, "widgetTabTitle");
    elementTabTitle._widgetTab = this;
    elementTabTitle.onclick = WidgetTab.onClickTabTitle;
    elementTabTitle.oncontextmenu = WidgetTab.onContextMenuTabTitle;
    this.setActiveElement(elementTabTitle);

    elementTabTitle._title = title;
    elementTabTitle.innerHTML = title;

    this._elementTabList.push(elementTabTitle);
    return elementTabTitle;
}
WidgetTab.prototype.closeTitle = function (elementTabTitle) {
    var index = this._elementTabList.indexOf(elementTabTitle);
    var indexActive;
    if (index == (this._elementTabList.length - 1)) { // 最后一位，找前一位
        indexActive = index - 1;
    } else { // 不是最后一位，找后一位
        indexActive = index + 1;
    }
    if (indexActive >= 0) {
        this.setActiveElement(this._elementTabList[indexActive]);
    }
    this._elementTabList.splice(index, 1);
    this._elementTabContentGroup.removeChild(elementTabTitle._elementTabContent);
    this._elementTabTitleGroup.removeChild(elementTabTitle);

    WidgetHistory.delFile(elementTabTitle, this._exec._historyItem);
}
WidgetTab.prototype.addContent = function (elementTabTitle, content, contentType, callbackLoaded) {
    var elementTabContent = WidgetHtml.addDiv(this._elementTabContentGroup);
    WidgetHtml.classAdd(elementTabContent, "widgetTabContent");
    elementTabContent._elementTabTitle = elementTabTitle;
    elementTabContent._callbackLoaded = callbackLoaded;
    elementTabContent.onclick = WidgetTab.onClickTabContent;
    elementTabContent.oncontextmenu = WidgetTab.onContextMenuTabContent;

    elementTabTitle._elementTabContent = elementTabContent;

    this.refreshContent(elementTabContent, content, contentType);
}
WidgetTab.prototype.refreshContent = function (elementTabContent, content, contentType) {
    removeElementChild(elementTabContent);
    if (contentType == WidgetTab._enumAddContentType.string) {
        elementTabContent.innerHTML = content;
    } else if (contentType == WidgetTab._enumAddContentType.html) {
        if (content) {
            $(elementTabContent).load(content, function () {
                WidgetTab.loadedContent(this);
            });
        } else {
            WidgetTab.loadedContent(elementTabContent);
        }
    } else if (contentType == WidgetTab._enumAddContentType.file) {
        WidgetFile.readFile(content, elementTabContent);
    } else if (contentType == WidgetTab._enumAddContentType.fileContent || contentType == WidgetTab._enumAddContentType.fileJsonObj) {
        WidgetFile.readFileContent(content, elementTabContent, contentType);
    }
}
WidgetTab.loadedContent = function (elementTabContent) {
    if (elementTabContent._callbackLoaded) {
        elementTabContent._callbackLoaded(elementTabContent._elementTabTitle._widgetTab._exec, elementTabContent);
    }
}
WidgetTab.prototype.getActiveElement = function () {
    return this._elementActive;
}
WidgetTab.prototype.setActiveElement = function (elementActive) {
    this.hideActiveElement();
    this._elementActive = elementActive;
    this.showActiveElement();
}
WidgetTab.prototype.hideActiveElement = function () {
    if (this._elementActive && WidgetHtml.classContains(this._elementActive, WidgetTab._classIsActive)) {
        WidgetHtml.classRemove(this._elementActive, WidgetTab._classIsActive);
        // $(this._elementActive._elementTabContent).hide();
        $(this._elementActive._elementTabContent).slideUp(WidgetTab._slideSpeed);
    }
}
WidgetTab.prototype.showActiveElement = function () {
    WidgetHtml.classAdd(this._elementActive, WidgetTab._classIsActive);
    // $(elementActive._elementTabContent).show();
    $(this._elementActive._elementTabContent).slideDown(WidgetTab._slideSpeed);
}
WidgetTab.onClickTabTitle = function (e) {
    if (!WidgetHtml.classContains(this.classList, WidgetTab._classIsActive)) {
        this._widgetTab.setActiveElement(this);
    }
    WidgetMenu.hideMenuAll();
}
WidgetTab.onClickTabContent = function (e) {
    WidgetMenu.hideMenuAll();
}
WidgetTab.onContextMenuTabTitle = function (e) {
    if (this._widgetTab && this._widgetTab._exec) {
        this._widgetTab._exec.tabOnContextMenu(this, e, WidgetTab._enumOnContextMenuType.tabTitle);
    }
    return false; // 取消右键点击的默认事件
}
WidgetTab.onContextMenuTabContent = function (e) {
    if (this._elementTabTitle && this._elementTabTitle._widgetTab && this._elementTabTitle._widgetTab._exec) {
        this._elementTabTitle._widgetTab._exec.tabOnContextMenu(this, e, WidgetTab._enumOnContextMenuType.tabContent);
    }
    return false; // 取消右键点击的默认事件
}
