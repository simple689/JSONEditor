// var widgetHttpXHR = new WidgetHttpXHR();
// widgetHttpXHR.createRequest(this, null, null);
// widgetHttpXHR.sendRequestGet(url);
// widgetHttpXHR.sendRequestGet(url + "?t=" + Math.random());
// widgetHttpXHR.sendRequestPost(url, "a");
function WidgetHttpXHR() {
}
WidgetHttpXHR._enumOpenType = {
    get: 0,
    post: 1
}

WidgetHttpXHR.prototype.createRequest = function (exec, funcSuccess, funcError) {
    this._request = new XMLHttpRequest(); // 创建对象
    this._request._exec = exec;
    this._request.onreadystatechange = function (ev) {
        // 状态从 0 到 4 发生变化
        // 0: 请求未初始化
        // 1: 服务器连接已建立
        // 2: 请求已接收
        // 3: 请求处理中
        // 4: 请求已完成，且响应已就绪
        console.log("WidgetHttpXHR[readyState] :", this.readyState);
        if (this.readyState == 4) {
            console.log("WidgetHttpXHR[status] :", this.status);
            if (this.status == 200) {
                var str = this.responseText;
                console.log(str);
                if (funcSuccess) funcSuccess(exec, this);
            } else if (this.status == 404) {
                if (funcError) funcError(exec, this);
            }
        }
    }
}
WidgetHttpXHR.prototype.sendRequestGet = function (url) {
    this.sendRequest(WidgetHttpXHR._enumOpenType.get, url, null);
}
WidgetHttpXHR.prototype.sendRequestPost = function (url, postStr) {
    this.sendRequest(WidgetHttpXHR._enumOpenType.post, url, postStr);
}
WidgetHttpXHR.prototype.sendRequest = function (openType, url, postStr) {
    if (!this._request) {
        return false;
    }
    switch (openType) {
        case WidgetHttpXHR._enumOpenType.get: {
            // 固定url可能得到的是缓存的结果
            // 避免得到缓存，URL 添加一个唯一的 ID：
            // "demo_get.asp?t=" + Math.random()
            // 发送信息，URL 添加信息
            // "demo_get2.asp?fname=Bill&lname=Gates"
            this._request.open("GET", url); // 请求
            break;
        }
        case WidgetHttpXHR._enumOpenType.post: {
            // 以下情况，用 POST
            // 无法使用缓存文件（更新服务器上的文件或数据库）
            // 向服务器发送大量数据（POST 没有数据量限制）
            // 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
            this._request.open("POST", url); // 请求
            break;
        }
    }

    if (openType == WidgetHttpXHR._enumOpenType.post && postStr) {
        // POST 数据，用 setRequestHeader() 添加 HTTP 头。然后在 send() 中发送数据
        // 不加 setRequestHeader，后台 Request.Form 获取不到数据
        this._request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        this._request.send(postStr); // 请求，string：仅用于 POST 请求
    } else {
        this._request.send(); // 请求
    }
    return true;
}
