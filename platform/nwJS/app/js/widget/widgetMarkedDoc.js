function WidgetMarkedDoc() {
}

WidgetMarkedDoc.prototype.create = function (elementParent, pageRoot, page) {
    this._divMain = WidgetHtml.addDiv(elementParent);
    WidgetHtml.classAdd(this._divMain, "widgetMarkedDocMain");

    this._divLeft = WidgetHtml.addDiv(this._divMain);
    this._divLeft._widgetMarkedDoc = this;
    WidgetHtml.classAdd(this._divLeft, "widgetMarkedDocLeft");

    this._divMiddle = WidgetHtml.addDiv(this._divMain);
    WidgetHtml.classAdd(this._divMiddle, "widgetMarkedDocMiddle");

    this._divRight = WidgetHtml.addDiv(this._divMain);
    WidgetHtml.classAdd(this._divRight, "widgetMarkedDocRight");

    this._currentPageRoot = pageRoot;
    this._currentPage = page;

    this._currentHash = '';
    this._renderedPage = '';

    this.init(this._divLeft, this._divMiddle, this._divRight);
}

WidgetMarkedDoc.prototype.init = function (left, middle, right) {
    middle.onmousedown = function (e) {
        var x = (e || event).clientX;
        middle.left = middle.offsetLeft;
        document.onmousemove = function (e) {
            var iT = middle.left + ((e || event).clientX - x);
            var maxT = document.body.clientWidth;
            iT < 30 && (iT = 30);
            iT > maxT && (iT = maxT);
            middle.style.left = left.style.width = iT + "px";
            return false
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
};
WidgetMarkedDoc.prototype.initLeft = function (left) {
    $(left).load("../menu/menuHelp.html", function () {
        if (!window.Promise) {
            window.Promise = ES6Promise;
        }
        if (!window.fetch) {
            window.fetch = unfetch;
        }
        var widgetMarkedDoc = this._widgetMarkedDoc;
        widgetMarkedDoc._linkList = this.querySelectorAll('a');
        widgetMarkedDoc._linkList.forEach(function(link) {
            link._widgetMarkedDoc = this;
            link.onclick = function () {
                var hashStr = decodeURI(this.hash);
                this._widgetMarkedDoc.hashChange(hashStr);
            }
        }, widgetMarkedDoc);

        widgetMarkedDoc.hashChange();
    });
};
WidgetMarkedDoc.prototype.initRight = function (right) {
    this._divRightContent = WidgetHtml.addDiv(right);
    WidgetHtml.classAdd(this._divRightContent, "widgetMarkedDocRightContent");
    WidgetHtml.classAdd(this._divRightContent, "markdown-body");
};
WidgetMarkedDoc.prototype.hashChange = function(elementHash) {
    var hash = elementHash;
    if (elementHash) {
        hash = elementHash.substr(1);
    }
    // var hash = location.hash.slice(1);
    if (!hash) {
        hash = 'README.md';
    }
    var uri = hash.split('#');
    if (uri[0].match(/^\//)) {
        this._currentPage = uri[0].slice(1);
        if (uri.length > 1) {
            this._currentHash = uri[1];
        } else {
            this._currentHash = '';
        }
    } else {
        this._currentHash = uri[0];
    }
    var widgetMarkedDoc = this;
    this.fetchPage(this._currentPage).then(function () {
        widgetMarkedDoc.fetchAnchor(widgetMarkedDoc._currentHash)
    }, widgetMarkedDoc);

    var url = '#/' + this._currentPage + (this._currentHash ? '#' + this._currentHash : '');
    var fullUrl = window.location.origin + '/' + url;

    this._linkList.forEach(function(link) {
        link.className = link.href === fullUrl ? 'selected' : '';
    });

    // history.replaceState('', document.title, url);
}
WidgetMarkedDoc.prototype.fetchPage = function(page) {
    if (page === this._renderedPage) {
        return Promise.resolve();
    }
    var widgetMarkedDoc = this;
    var fetchPage = this._currentPageRoot + page;
    return fetch(fetchPage, widgetMarkedDoc)
        .then(function (res) {
            if (!res.ok) {
                throw new Error('Error ' + res.status + ': ' + res.statusText);
            }
            return res.text();
        })
        .then(function (text) {
            widgetMarkedDoc._renderedPage = page;
            widgetMarkedDoc._divRightContent.innerHTML = marked(text);
            widgetMarkedDoc._divRightContent.scrollTop = 0;
        }).catch(function (e) {
            widgetMarkedDoc._divRightContent.innerHTML = '<p>Oops! There was a problem rendering the page.</p>'
                + '<p>' + e.message + '</p>';
        });
}
WidgetMarkedDoc.prototype.fetchAnchor = function(anchor) {
    if (!anchor) {
        this._divRightContent.scrollTo(0, 0);
        return;
    }
    var hashElement = getElementById(anchor);
    if (hashElement) {
        hashElement.scrollIntoView();
    }
    var y = this._divRightContent.scrollTop;
    this._divRightContent.scrollTo(0, y);
}
