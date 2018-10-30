function WidgetHtml() {
}

WidgetHtml._enumInputType = {
    _textString: 0,
    _textNumber: 1,
    _button: 2,
    _buttonMenu: 3,
    _checkbox: 4,
    _radio: 5,
    _file: 6,
    _image: 7,
    _password: 8,
    _submit: 9,
    _reset: 10,
    _color: 11
}

WidgetHtml.createElement = function(tagName) {
    return document.createElement(tagName);
}
WidgetHtml.createCanvas = function(width, height) {
    var canvas = WidgetHtml.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
WidgetHtml.classAdd = function(tag, className) {
    tag.classList.add(className);
}
WidgetHtml.classRemove = function(tag, className) {
    tag.classList.remove(className);
}
WidgetHtml.classContains = function(tag, className) {
    return tag.classList.contains(className);
}

WidgetHtml.onClickInput = function (e) {
    switch (this._inputType) {
        case WidgetHtml._enumInputType._buttonMenu : {
            var menu = new WidgetMenu();
            menu.createMenu(document.body);
            var list = this._jsonObjCtrl._valueList.getList();
            menu.parseList(menu._elementParent, list);
            WidgetMenu.showMenu(menu, null, this._jsonObjCtrl._exec);
            break;
        }
    }
}
WidgetHtml.onChangeInput = function (e) {
    switch (this._inputType) {
        case WidgetHtml._enumInputType._textString : {
            break;
        }
        case WidgetHtml._enumInputType._textNumber : {
            var valueOld = this.value;
            this.value = this.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '');
            if (this.value != valueOld) {
                alert("该控件内容为数字类型。自动修正完毕。");
            }
            break;
        }
        case WidgetHtml._enumInputType._color : {
            this.style.background = this.value;
            break;
        }
    }
    if (this._jsonObjCtrl._onChange) {
        this._jsonObjCtrl._onChange(this);
    }
}
WidgetHtml.addBr = function (nodeParent) {
    var nodeBr = WidgetHtml.createElement("br");
    nodeParent.appendChild(nodeBr);
    WidgetHtml.classAdd(nodeBr, "nodeBr");
    return nodeBr;
}
WidgetHtml.addDiv = function (nodeParent) {
    var nodeDiv = WidgetHtml.createElement("div");
    nodeParent.appendChild(nodeDiv);
    WidgetHtml.classAdd(nodeDiv, "nodeDiv");
    return nodeDiv;
}
WidgetHtml.addSpan = function (nodeParent) {
    var nodeSpan = WidgetHtml.createElement("span");
    nodeParent.appendChild(nodeSpan);
    WidgetHtml.classAdd(nodeSpan, "nodeSpan");
    return nodeSpan;
}
WidgetHtml.addLabel = function (nodeParent, jsonObjCtrl) {
    var nodeLabel = WidgetHtml.createElement("label");
    nodeParent.appendChild(nodeLabel);
    WidgetHtml.classAdd(nodeLabel, "nodeLabel");
    nodeLabel._jsonObjCtrl = jsonObjCtrl;
    nodeLabel.onclick = jsonObjCtrl._onClick;
    nodeLabel.onmouseenter = jsonObjCtrl._onMouseEnter;
    nodeLabel.innerHTML = jsonObjCtrl._keyShow;
    return nodeLabel;
}
WidgetHtml.addInput = function (nodeParent, jsonObjCtrl, inputType) {
    var nodeInput = WidgetHtml.createElement("input");
    nodeParent.appendChild(nodeInput);
    WidgetHtml.classAdd(nodeInput, "nodeInput");
    nodeInput._jsonObjCtrl = jsonObjCtrl;
    nodeInput.onclick = jsonObjCtrl._onClick;
    nodeInput.onchange = WidgetHtml.onChangeInput;
    if (jsonObjCtrl._onKeyUp) {
        nodeInput.onkeyup = jsonObjCtrl._onKeyUp;
    }
    if (jsonObjCtrl._onFocus) {
        nodeInput.onfocus = jsonObjCtrl._onFocus;
    }
    nodeInput._inputType = inputType;
    switch (inputType) {
        case WidgetHtml._enumInputType._button : {
            WidgetHtml.classAdd(nodeInput, "nodeInputButton");
            nodeInput.type = "button";
            nodeInput.value = jsonObjCtrl._value;
            break;
        }
        case WidgetHtml._enumInputType._buttonMenu : {
            nodeInput.onclick = WidgetHtml.onClickInput;
            WidgetHtml.classAdd(nodeInput, "nodeInputButtonMenu");
            nodeInput.type = "button";
            nodeInput.value = jsonObjCtrl._value;
            break;
        }
        case WidgetHtml._enumInputType._checkbox : {
            WidgetHtml.classAdd(nodeInput, "nodeInputCheckbox");
            nodeInput.type = "checkbox";
            if (jsonObjCtrl._value) {
                nodeInput.checked = true;
            } else {
                nodeInput.checked = false;
            }
            break;
        }
        case WidgetHtml._enumInputType._radio : {
            WidgetHtml.classAdd(nodeInput, "nodeInputRadio");
            nodeInput.type = "radio";
            if (jsonObjCtrl._value) {
                nodeInput.checked = true;
            } else {
                nodeInput.checked = false;
            }
            break;
        }
        case WidgetHtml._enumInputType._file : {
            WidgetHtml.classAdd(nodeInput, "nodeInputFile");
            nodeInput.type = WidgetKey._file;
            nodeInput.value = jsonObjCtrl._value;
            break;
        }
        case WidgetHtml._enumInputType._image : {
            WidgetHtml.classAdd(nodeInput, "nodeInputImage");
            nodeInput.type = "image";
            nodeInput.value = jsonObjCtrl._value;
            break;
        }
        case WidgetHtml._enumInputType._password : {
            WidgetHtml.classAdd(nodeInput, "nodeInputPassword");
            nodeInput.type = "password";
            nodeInput.value = jsonObjCtrl._value;
            break;
        }
        case WidgetHtml._enumInputType._submit : {
            WidgetHtml.classAdd(nodeInput, "nodeInputSubmit");
            nodeInput.type = "submit";
            nodeInput.value = jsonObjCtrl._value;
            break;
        }
        case WidgetHtml._enumInputType._reset : {
            WidgetHtml.classAdd(nodeInput, "nodeInputReset");
            nodeInput.type = "reset";
            nodeInput.value = jsonObjCtrl._value;
            break;
        }
        case WidgetHtml._enumInputType._color : {
            WidgetHtml.classAdd(nodeInput, "nodeInputColor");
            nodeInput.value = jsonObjCtrl._value;
            nodeInput.style.background = jsonObjCtrl._value;
            $(nodeInput).colorPicker({
                init: function (element, color) { // colors is a different instance (not connected to colorPicker)
                    element.style.backgroundColor = color;
                    element.style.color = color.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
                },
            }).each(function (idx, elm) {
            });
            break;
        }
        default : {
            WidgetHtml.classAdd(nodeInput, "nodeInputDefault");
            nodeInput.value = jsonObjCtrl._value;
            if (jsonObjCtrl._placeholder) {
                nodeInput.placeholder = jsonObjCtrl._placeholder;
            }
            break
        }
    }
    return nodeInput;
}
WidgetHtml.addSelect = function (nodeParent, jsonObjCtrl) {
    var nodeSelect = WidgetHtml.createElement("select");
    nodeParent.appendChild(nodeSelect);
    WidgetHtml.classAdd(nodeSelect, "nodeSelect");
    nodeSelect._jsonObjCtrl = jsonObjCtrl;
    nodeSelect.onchange = jsonObjCtrl._onChange;
    for (var i = 0; i < jsonObjCtrl._valueList.length; i++) {
        var nodeOption = WidgetHtml.createElement("option");
        nodeSelect.appendChild(nodeOption);
        WidgetHtml.classAdd(nodeOption, "nodeOption");

        nodeOption.value = jsonObjCtrl._valueList[i]._key;
        nodeOption.innerHTML = jsonObjCtrl._valueList[i]._keyShow;

        if (nodeOption.value == jsonObjCtrl._value) {
            nodeOption.selected = true;
        }
    }
    return nodeSelect;
}
