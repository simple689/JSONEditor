function getElementOffsetTopToParent(element, parentElement) {
    // return element.offsetTop + ((element.offsetParent && element.offsetParent != parentElement) ? arguments.callee(element.offsetParent, parentElement) : 0);
    return element.offsetTop + ((element.offsetParent && element.offsetParent != parentElement) ? arguments.callee(element.offsetParent, parentElement) : 0);
}

function getElementOffsetLeftToParent(element, parentElement) {
    // return element.offsetLeft + ((element.offsetParent && element.offsetParent != parentElement) ? arguments.callee(element.offsetParent, parentElement) : 0);
    var left = element.offsetLeft;
    if (element.offsetParent) {
        if (element.offsetParent != parentElement) {
            left += arguments.callee(element.offsetParent, parentElement);
        }
    }
    return left;
}

function getElementParentWithTag(element, parentTag) {
    var parentElement = element.parentNode;
    if (!parentElement) {
        return null;
    }
    var tag = parentElement.tagName; //获取标签类型
    if (tag == parentTag) {
        return parentElement;
    } else {
        return arguments.callee(parentElement, parentTag)
    }
    return null;
}

function setElementDisplay(element, enable) {
    if (enable) {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function removeElementChild(element) {
    var len = element.childNodes.length;
    for (var i = 0; i < len; i++) {
        element.removeChild(element.childNodes[0]);
    }
}
// function setSize(element, elementCheck, elementCheckParent, padding) {
//     var left = getOffsetLeftToParent(elementCheck, elementCheckParent);
//     var top = getOffsetTopToParent(elementCheck, elementCheckParent);
//     var width = elementCheck.offsetWidth;
//     var height = elementCheck.offsetHeight;
//     // WidgetLog.log("top = " + top + " ; left = " + left);
//     element.style.width = left + width + padding + "px";
//     element.style.height = top + height + padding +"px";
// }
