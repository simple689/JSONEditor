function WidgetVerify() {
}
WidgetVerify._w = 300; // canvas宽度
WidgetVerify._h = 150; // canvas高度
WidgetVerify._r = 10; // 滑块半径
WidgetVerify._l = 42; // 滑块边长
WidgetVerify._L = WidgetVerify._l + WidgetVerify._r * 2; // 滑块实际边长
WidgetVerify._PI = Math.PI;

WidgetVerify.prototype.create = function (elementParent, funcSuccess, funcFail) {
    this._elementParent = elementParent;
    this._funcSuccess = funcSuccess;
    this._funcFail = funcFail;

    this.initHtml();
    this.initImg();
    this.draw();
    this.bindEvent();
}
WidgetVerify.prototype.initHtml = function () {
    var canvas = WidgetHtml.createCanvas(WidgetVerify._w, WidgetVerify._h); // 画布

    var canvasBlock = canvas.cloneNode(true); // 滑块
    canvasBlock.className = 'WidgetVerifyCanvasBlock';

    var refreshIcon = WidgetHtml.createElement('div');
    refreshIcon.className = 'WidgetVerifyRefreshIcon';

    var sliderContainer = WidgetHtml.createElement('div');
    sliderContainer.className = 'WidgetVerifySliderContainer';

    var sliderMask = WidgetHtml.createElement('div');
    sliderMask.className = 'WidgetVerifySliderMask';

    var sliderBlock = WidgetHtml.createElement('div');
    sliderBlock.className = 'WidgetVerifySliderBlock';

    var sliderIcon = WidgetHtml.createElement('span');
    sliderIcon.className = 'WidgetVerifySliderIcon';

    var sliderText = WidgetHtml.createElement('span');
    sliderText.className = 'WidgetVerifySliderText';
    sliderText.innerHTML = '向右滑动滑块填充拼图';

    this._elementParent.appendChild(canvas);
    this._elementParent.appendChild(canvasBlock);
    this._elementParent.appendChild(refreshIcon);

    this._elementParent.appendChild(sliderContainer);

    sliderContainer.appendChild(sliderMask);
    sliderMask.appendChild(sliderBlock);
    sliderBlock.appendChild(sliderIcon);

    sliderContainer.appendChild(sliderText);

    Object.assign(this, {
        _canvas: canvas,
        _canvasCtx: canvas.getContext('2d'),
        _canvasBlock: canvasBlock,
        _canvasBlockCtx: canvasBlock.getContext('2d'),
        _refreshIcon: refreshIcon,
        _sliderContainer: sliderContainer,
        _sliderMask: sliderMask,
        _sliderBlock: sliderBlock,
        _sliderIcon: sliderIcon,
        _sliderText: sliderText
    })
}
WidgetVerify.prototype.initImg = function () {
    var img = WidgetVerify.createImg(this, function () {
        var widgetVerify = this._exec;
        widgetVerify._canvasCtx.drawImage(this, 0, 0, WidgetVerify._w, WidgetVerify._h);
        widgetVerify._canvasBlockCtx.drawImage(this, 0, 0, WidgetVerify._w, WidgetVerify._h);

        var y = widgetVerify.y - WidgetVerify._r * 2 + 2;
        var imageData = widgetVerify._canvasBlockCtx.getImageData(widgetVerify.x, y, WidgetVerify._L, WidgetVerify._L);

        widgetVerify._canvasBlock.width = WidgetVerify._L;
        widgetVerify._canvasBlockCtx.putImageData(imageData, 0, y);
    });
    this._img = img;
}
WidgetVerify.createImg = function(exec, onload) {
    var img = WidgetHtml.createElement('img');
    img._exec = exec;
    img.crossOrigin = "Anonymous";
    img.onload = onload;
    img.onerror = () => {
        img.src = WidgetVerify.getRandomImg();
    };
    img.src = WidgetVerify.getRandomImg();
    return img;
}
WidgetVerify.getRandomImg = function() {
    return "/html5/img/widget/widgetVerify/imgVerify/imgVerify_" + WidgetVerify.getRandomNumberByRange(0, 100) + ".jpg";
}

WidgetVerify.getRandomImgWeb = function() {
    return 'https://picsum.photos/300/150/?image=' + WidgetVerify.getRandomNumberByRange(0, 100);
}
WidgetVerify.getRandomNumberByRange = function(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}
WidgetVerify.prototype.draw = function () {
    // 随机创建滑块的位置
    this.x = WidgetVerify.getRandomNumberByRange(WidgetVerify._L + 10, WidgetVerify._w - (WidgetVerify._L + 10));
    this.y = WidgetVerify.getRandomNumberByRange(10 + WidgetVerify._r * 2, WidgetVerify._h - (WidgetVerify._L + 10));
    WidgetVerify.draw(this._canvasCtx, 'fill', this.x, this.y);
    WidgetVerify.draw(this._canvasBlockCtx, 'clip', this.x, this.y);
}
WidgetVerify.draw = function(ctx, operation, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + WidgetVerify._l / 2, y);
    ctx.arc(x + WidgetVerify._l / 2, y - WidgetVerify._r + 2, WidgetVerify._r, 0, 2 * WidgetVerify._PI);
    ctx.lineTo(x + WidgetVerify._l / 2, y);
    ctx.lineTo(x + WidgetVerify._l, y);
    ctx.lineTo(x + WidgetVerify._l, y + WidgetVerify._l / 2);
    ctx.arc(x + WidgetVerify._l + WidgetVerify._r - 2, y + WidgetVerify._l / 2, WidgetVerify._r, 0, 2 * WidgetVerify._PI);
    ctx.lineTo(x + WidgetVerify._l, y + WidgetVerify._l / 2);
    ctx.lineTo(x + WidgetVerify._l, y + WidgetVerify._l);
    ctx.lineTo(x, y + WidgetVerify._l);
    ctx.lineTo(x, y);
    ctx.fillStyle = '#fff';
    ctx[operation]();
    ctx.beginPath();
    ctx.arc(x, y + WidgetVerify._l / 2, WidgetVerify._r, 1.5 * WidgetVerify._PI, 0.5 * WidgetVerify._PI);
    ctx.globalCompositeOperation = "xor";
    ctx.fill();
}
WidgetVerify.prototype.bindEvent = function () {
    this._elementParent.onselectstart = () => false;
    this._refreshIcon.onclick = () => {
        this.reset()
    };
    var originX, originY, trail = [], isMouseDown = false;
    this._sliderBlock.addEventListener('mousedown', function (e) {
        originX = e.x, originY = e.y;
        isMouseDown = true;
    });
    document.addEventListener('mousemove', (e) => {
        if(!isMouseDown) {
            return false;
        }
        var moveX = e.x - originX;
        var moveY = e.y - originY;
        if (moveX < 0 || moveX + 38 >= WidgetVerify._w) {
            return false;
        }
        this._sliderBlock.style.left = moveX + 'px';
        var blockLeft = (WidgetVerify._w - 40 - 20) / (WidgetVerify._w - 40) * moveX;
        this._canvasBlock.style.left = blockLeft + 'px';

        WidgetHtml.classAdd(this._sliderContainer, 'WidgetVerifySliderContainer_active');
        this._sliderMask.style.width = moveX + 'px';
        trail.push(moveY);
    });
    document.addEventListener('mouseup', (e) => {
        if(!isMouseDown) {
            return false;
        }
        isMouseDown = false;
        if (e.x == originX) {
            return false;
        }
        WidgetHtml.classRemove(this._sliderContainer, 'WidgetVerifySliderContainer_active');
        this.trail = trail;
        const {spliced, TuringTest} = this.verify();
        if (spliced) {
            if (TuringTest) {
                WidgetHtml.classAdd(this._sliderContainer, 'WidgetVerifySliderContainer_success');
                this._funcSuccess && this._funcSuccess();
            } else {
                WidgetHtml.classAdd(this._sliderContainer, 'WidgetVerifySliderContainer_fail');
                this.text.innerHTML = '再试一次';
                this.reset();
            }
        } else {
            WidgetHtml.classAdd(this._sliderContainer, 'WidgetVerifySliderContainer_fail');
            this._funcFail && this._funcFail();
            setTimeout(() => {
                this.reset();
            }, 1000);
        }
    });
}
function sum(x, y) {
    return x + y;
}
function square(x) {
    return x * x;
}
WidgetVerify.prototype.verify = function () {
    var arr = this.trail; // 拖动时y轴的移动距离
    var average = arr.reduce(sum) / arr.length; // 平均值
    var deviations = arr.map(x => x - average); // 偏差数组
    var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // 标准差
    var left = parseInt(this._canvasBlock.style.left);
    return {
        spliced: Math.abs(left - this.x) < 10,
        TuringTest: average !== stddev, // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
    }
}
WidgetVerify.prototype.reset = function () {
    this._sliderContainer.className = 'WidgetVerifySliderContainer';
    this._sliderBlock.style.left = 0;
    this._canvasBlock.style.left = 0;
    this._sliderMask.style.width = 0;
    this.clean();
    this._img.src = WidgetVerify.getRandomImg();
    this.draw();
}
WidgetVerify.prototype.clean = function () {
    this._canvasCtx.clearRect(0, 0, WidgetVerify._w, WidgetVerify._h);
    this._canvasBlockCtx.clearRect(0, 0, WidgetVerify._w, WidgetVerify._h);
    this._canvasBlock.width = WidgetVerify._w;
}
