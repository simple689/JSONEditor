(function () {
    if (typeof require === 'function') {
        init();
    }
})();

function init() {
    var nw = require('nw.gui');
    var win = nw.Window.get();
    win.maximize();
    win.show();
    // win.reload();
    // var ismaxmize = true;

    console.log('App start');
    // win.showDevTools();

    // win.on('close', function() {
    //     console.log("We're closing...");
    //     var x = win.x;
    //     var y = win.y;
    //     var width = win.width;
    //     var height = win.height;
    //     var isFullscreen = win.isFullscreen;
    //     console.log(x, " ", y, " ", width, " ", height, " ", isFullscreen);
    //     this.close(true); // then close it forcely
    // });

    // win.on('close', function(event) {
    //     if (global.tray && event != 'quit') {
    //         win.hide();
    //     } else {
    //         win.close(true);
    //         gui.App.quit();
    //     }
    // });
    // gui.App.on('reopen', function(cmd) {
    //     win.show();
    // });

    // win.moveTo(x, y)
    // win.resizeTo(width, height)
    // win.enterFullscreen()
    // win.showDevTools([iframe], [callback])
    // win.setBadgeLabel(label)

    // windowEvent();
}

// function backgroudApp(nw) {
//     win.hide();
// }
// function minimizeApp(nw) {
//     console.log('11');
//     win.on('minimize', function () {
//         console.log('Window is minimized');
//     });
//     win.minimize();
// }
// function expendApp(nw) {
//     win.on('maximize', function () {
//         console.log('Window is maximized');
//     });
//     win.maximize();
// }
// function unexpendApp(nw) {
//     win.on('restore', function () {
//         console.log('Window is restore');
//     });
//     win.restore();
// }
// function windowEvent() {
//     var a = $("#min-btn");
//     var b = document.getElementById("min-btn");
//     var c = document.getElementsByTagName("button");
//     console.log('a = ', a);
//     console.log('b = ', b);
//     console.log('c = ', c);
//     // $("#min-btn").click(function() { minimizeApp(nw); });
//     /*        $("#min-btn").onclick = function() {
//                 console.log('111');
//                 minimizeApp(nw);
//             };*/
//     // $(c).onclick = function() {
//     //     console.log('111');
//     //     minimizeApp(nw);
//     // };
//     // console.log(document.innerHTML);
//     // console.log($b.innerHTML);
//     // console.log($c.innerHTML);
//
//     console.log('3');
//     // $("#max-btn").click(function() {
//     //     if (ismaxmize) {
//     //         expendApp(nw);
//     //         ismaxmize = false;
//     //     } else {
//     //         unexpendApp(nw);
//     //         ismaxmize = true;
//     //     }
//     // });
// }
