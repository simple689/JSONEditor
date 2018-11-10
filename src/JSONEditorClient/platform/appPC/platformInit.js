(function () {
    if (typeof require === 'function') {
        init();
    }
})();

function init() {
    console.log('App start');
    var nw = require('nw.gui');
    var win = nw.Window.get();
    // win.showDevTools();
    // 获取本地历史记录文件
    // 获取文件中的窗口配置 x y width height
    // 如果为空，窗口最大化，回调中把窗口配置信息记录到文件
    // 窗口重载
    win.on('maximize', function () {
        console.log('Window is maximized');
        var x = win.x;
        var y = win.y;
        var width = win.width;
        var height = win.height;
        var isFullscreen = win.isFullscreen;
        console.log(x, " ", y, " ", width, " ", height, " ", isFullscreen);
        win.reload();
    });
    if (win.x) {
        // win.maximize();
        // win.moveTo(0, 100);
        // win.resizeTo(600, 600);
        // win.enterFullscreen()
        // win.reload();
    }
    // 窗口关闭，回调中把窗口配置信息记录到文件
    win.on('close', function(event) {
        if (global.tray && event != 'quit') {
            win.hide();
        } else {
            win.close(true);
            nw.App.quit();
        }
        console.log("We're closing...");
        var x = win.x;
        var y = win.y;
        var width = win.width;
        var height = win.height;
        var isFullscreen = win.isFullscreen;
        console.log(x, " ", y, " ", width, " ", height, " ", isFullscreen);
        this.close(true); // then close it forcely
    });

    // 获取本地历史记录文件
    // 获取文件中的文件夹配置
    // PlatformUtilAppPC.fileBrowser.a();
    // PlatformUtilAppPC.fileBrowser.addFolder();
    platformUtil.a();
    platformUtil.b();
    platformUtil.c();

}
// win.setBadgeLabel(label)

//     win.on('minimize', function () {
//         console.log('Window is minimized');
//     });
//     win.minimize();

//     win.on('restore', function () {
//         console.log('Window is restore');
//     });
//     win.restore();
