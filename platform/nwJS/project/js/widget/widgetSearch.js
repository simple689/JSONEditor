function WidgetSearch() {
}

WidgetSearch._searchList = new Array();
WidgetSearch.prototype.createSearch = function (exec, elementParent) {
    this._exec = exec;
    // $(elementBrother).after(this._searchText);

    this._searchRoot = WidgetHtml.addSpan(elementParent);
    WidgetHtml.classAdd(this._searchRoot, "searchRoot");

    var jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._onKeyUp = WidgetSearch.onKeyUpSearchText;
    jsonObjCtrl._onFocus = WidgetSearch.onFocusSearchText;
    this._searchText = WidgetHtml.addInput(this._searchRoot, jsonObjCtrl, WidgetHtml._enumInputType._textString);
    this._searchText._widgetSearch = this;
    WidgetHtml.classAdd(this._searchText, "searchText");

    jsonObjCtrl = new JsonObjCtrl(this, null, null);
    jsonObjCtrl._value = "搜索";
    jsonObjCtrl._onClick = WidgetSearch.onClickSearchBtn;
    this._searchBtn = WidgetHtml.addInput(this._searchRoot, jsonObjCtrl, WidgetHtml._enumInputType._button);
    this._searchBtn._widgetSearch = this;
    WidgetHtml.classAdd(this._searchBtn, "searchBtn");

    this._searchHistoryBox = WidgetHtml.addDiv(this._searchRoot);
    WidgetHtml.classAdd(this._searchHistoryBox, "searchHistoryBox");

    this._searchHistory = WidgetHtml.createElement("ul");
    this._searchHistoryBox.appendChild(this._searchHistory);

    this._searchHistoryIndex = 0;

    WidgetSearch._searchList.push(this);
    return this;
}
// 获取历史记录
WidgetSearch.getHistory = function (itemKey) {
    var cookieStr = document.cookie;
    var cookieList = cookieStr.split("; ");
    for (var i = 0; i < cookieList.length; i++) {
        var item = cookieList[i].split("=");
        if (item[0] == itemKey) {
            return item[1];
        }
    }
}
// 点击搜索按钮
WidgetSearch.onClickSearchBtn = function () {
    var res = WidgetSearch.getHistory("searchHistory");
    var list = decodeURI(res).split(',');
    if (list.length > 19) {
        list.pop();
    }
    list = list.join();
    var searchText = this._widgetSearch._searchText;
    var value = searchText.value;
    if (res !== undefined) {
        value = value + "," + list;
    }
    //去重
    var valNew = [];
    value = value.split(',');
    for (var i = 0; i < value.length; i++) {
        if (valNew.indexOf(value[i]) < 0) {
            valNew.push(value[i]);
        }
    }
    valNew = valNew.join();
    var date = new Date();
    date.setTime(date.getTime() + 10 * 24 * 3600 * 1000);
    document.cookie = 'searchHistory=' + encodeURI(valNew) + ';expires=' + date.toGMTString() + ';path=/';
}
WidgetSearch.onKeyUpSearchText = function (event) {
    // 键盘事件 key == 13 (回车) key == 38 (向上) key== 40 (向下)
    var ctrl = this._widgetSearch;
    var searchHistoryItemListLen = ctrl._searchHistoryItemList.length;

    var key = event.keyCode;
    if (key == 13) {
        WidgetSearch.onClickSearchBtn(); // cookie记录
        if (ctrl._searchHistoryIndex < searchHistoryItemListLen) {
            var item = ctrl._searchHistoryItemList[ctrl._searchHistoryIndex];
            var text = item.innerHTML;
            ctrl._searchText.value = text;
        }
        setElementDisplay(ctrl._searchHistoryBox, false);
    } else if (key == 38) {
        var item = ctrl._searchHistoryItemList[ctrl._searchHistoryIndex];
        WidgetHtml.classRemove(item, "choose");
        ctrl._searchHistoryIndex--;
        if (ctrl._searchHistoryIndex < 0) {
            ctrl._searchHistoryIndex = searchHistoryItemListLen - 1;
        }
        item = ctrl._searchHistoryItemList[ctrl._searchHistoryIndex];
        WidgetHtml.classAdd(item, "choose");
        setElementDisplay(ctrl._searchHistoryBox, true);
    } else if (key == 40) {
        var item = ctrl._searchHistoryItemList[ctrl._searchHistoryIndex];
        WidgetHtml.classRemove(item, "choose");
        ctrl._searchHistoryIndex++;
        if (ctrl._searchHistoryIndex > searchHistoryItemListLen - 1) {
            ctrl._searchHistoryIndex = 0;
        }
        item = ctrl._searchHistoryItemList[ctrl._searchHistoryIndex];
        WidgetHtml.classAdd(item, "choose");
        setElementDisplay(ctrl._searchHistoryBox, true);
    } else {
        WidgetSearch.showHistory(ctrl, this.value);
    }
}
// 搜索框聚焦
WidgetSearch.onFocusSearchText = function () {
    WidgetSearch.showHistory(this._widgetSearch, null);
}
// 点击选中搜索词语(后隐藏历史记录)
WidgetSearch.onClickSearchHistoryItem = function () {
    var searchText = this._widgetSearch._searchText;
    var searchHistoryBox = this._widgetSearch._searchHistoryBox;
    var str = this.innerHTML;
    searchText.value = str;
    setElementDisplay(searchHistoryBox, false);
}
WidgetSearch.onMouseEnterSearchHistoryItem = function () {
    var liThis = this;
    WidgetHtml.classAdd(liThis, "active");
}
WidgetSearch.onMouseOutSearchHistoryItem = function () {
    var liThis = this;
    WidgetHtml.classRemove(liThis, "active");
}
// 展示全部记录
WidgetSearch.showHistory = function (ctrl, searchValue) {
    $(ctrl._searchHistory).empty();
    if (ctrl._searchHistoryItemList) {
        var listLen = ctrl._searchHistoryItemList.length;
        if (listLen > 0) {
            ctrl._searchHistoryItemList.splice(0, listLen);
        }
    }
    ctrl._searchHistoryItemList = new Array();

    var list = decodeURI(WidgetSearch.getHistory("searchHistory")).split(',');
    if (list[0] === "undefined" || list[0] === "" || list[0] === "null" || list[0] === null) {
        setElementDisplay(ctrl._searchHistoryBox, false);
    } else {
        var isFind = true;
        if (searchValue === "" || searchValue === "null" || searchValue === null) {
            isFind = false;
        }
        var len = 0;
        for (var i in list) {
            var isAdd = false;
            if (isFind) {
                if (list[i].indexOf(searchValue) > -1) {
                    isAdd = true;
                }
            } else {
                isAdd = true;
            }
            if (isAdd) {
                var li = WidgetHtml.createElement("li");
                ctrl._searchHistory.append(li);
                li._widgetSearch = ctrl;
                $(li).on("click", WidgetSearch.onClickSearchHistoryItem);
                $(li).on("mouseenter", WidgetSearch.onMouseEnterSearchHistoryItem);
                $(li).on("mouseout", WidgetSearch.onMouseOutSearchHistoryItem);
                li.innerHTML = list[i];
                ctrl._searchHistoryItemList.push(li);
                len++;
            }
        }
        ctrl._searchHistoryIndex = 0;
        if (len > 0) {
            setElementDisplay(ctrl._searchHistoryBox, true);
        } else {
            setElementDisplay(ctrl._searchHistoryBox, false);
        }
    }
}
// 搜索框失去焦点
WidgetSearch.stopPropagation = function (e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}
WidgetSearch.hideSearchAll = function () {
    for (var i in WidgetSearch._searchList) {
        WidgetSearch.hideSearch(WidgetSearch._searchList[i]);
    }
}
WidgetSearch.hideSearch = function (search) {
    setElementDisplay(search._searchHistoryBox, false);
}
