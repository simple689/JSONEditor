var nw = require('nw.gui');
var win = nw.Window.get();
var dataPath = nw.App.dataPath; // 数据存储路径
console.log(dataPath);
var userDataDir = '/user'; // 用户数据存储文件夹
var userDataPath = dataPath + userDataDir; // 用户数据存储路径

var execConfPath  = userDataPath + '/exec.conf'; // 配置文件路径
var execConfJsonObj = {};

var reloadConfPath  = userDataPath + '/reload.conf'; // 配置文件路径

function DeviceExecAppPC() {
    DeviceExecBase.call(this);
}

DeviceExecAppPC.prototype = new DeviceExecBase();
DeviceExecAppPC.prototype.constructor = DeviceExecAppPC;

DeviceExecAppPC.prototype.init = function () {
    DeviceExecBase.prototype.init.apply(this, arguments);
    // win.showDevTools();
    // 获取本地历史记录文件

    gDeviceUtil.fileSystem.mkDirs(userDataPath, function() {
        gDeviceUtil.fileSystem.exists(execConfPath, function(exists) {
            if (!exists) {
                execConfJsonObj.fileBrowser = {};
                execConfJsonObj.fileBrowser.projectList = new Array();

                execConfJsonObj.fileBrowser.projectList[0] = {};
                execConfJsonObj.fileBrowser.projectList[0].name = "project";
                execConfJsonObj.fileBrowser.projectList[0].path = "/Users/workTeddy/JSONEditor/user/project";

                execConfJsonObj.fileBrowser.projectList[1] = {};
                execConfJsonObj.fileBrowser.projectList[1].name = "project_1";
                execConfJsonObj.fileBrowser.projectList[1].path = "/Users/workTeddy/JSONEditor/user/project_1";

                execConfJsonObj.fileBrowser.projectList[2] = {};
                execConfJsonObj.fileBrowser.projectList[2].name = "project_2";
                execConfJsonObj.fileBrowser.projectList[2].path = "/Users/workTeddy/JSONEditor/user/project_2";

                execConfJsonObj.fileBrowser.projectList[3] = {};
                execConfJsonObj.fileBrowser.projectList[3].name = "project_3";
                execConfJsonObj.fileBrowser.projectList[3].path = "/Users/workTeddy/JSONEditor/user/project_3";

                var fileData = JSON.stringify(execConfJsonObj, null, 2)
                // LogBase.log(fileData);
                gDeviceUtil.fileSystem.writeFileFromRootSync(execConfPath, fileData);
            } else {
                var fileData = gDeviceUtil.fileSystem.readFileFromRootSync(execConfPath);
                // console.log(fileData);
                execConfJsonObj = JSON.parse(fileData);
            }

            gDeviceExec.initExecConf();
        });
    });
}

DeviceExecAppPC.prototype.initExecConf = function () {
    // 最大化回调，窗口重载
    win.on('maximize', function () {
        console.log('Window is maximized');
        gDeviceUtil.fileSystem.writeFileFromRootSync(reloadConfPath, "");
        win.reload();
    });

    gDeviceUtil.fileSystem.exists(reloadConfPath, function(exists) {
        if (exists) {
            console.log("reload");
            gDeviceUtil.fileSystem.delFileFromRoot(reloadConfPath);
            // 把窗口配置信息存入文件
            if (!execConfJsonObj.hasOwnProperty("window")) {
                execConfJsonObj.window = {};
            }
            execConfJsonObj.window.x = win.x;
            execConfJsonObj.window.y = win.y;
            execConfJsonObj.window.width = win.width;
            execConfJsonObj.window.height = win.height;
            execConfJsonObj.window.isMaximize = true;
        } else {
            console.log("first load");
            // 获取文件中的窗口配置 x y width height
            if (execConfJsonObj.hasOwnProperty("window")) {
                console.log("execConfJsonObj.window");
                if (execConfJsonObj.window.x !== win.x ||
                    execConfJsonObj.window.y !== win.y ||
                    execConfJsonObj.window.width !== win.width ||
                    execConfJsonObj.window.height !== win.height) {
                    if (execConfJsonObj.window.isMaximize) {
                        console.log("maximize");
                        win.maximize();
                    } else {
                        console.log("moveTo resizeTo");
                        win.moveTo(execConfJsonObj.window.x, execConfJsonObj.window.y);
                        win.resizeTo(execConfJsonObj.window.width, execConfJsonObj.window.height);
                    }
                }
            } else { // 如果为空，窗口最大化
                console.log("maximize");
                win.maximize();
            }
        }
    });


    // 窗口关闭，回调中把窗口配置信息记录到文件
    // win.on('close', function(event) {
    //     var fileData = JSON.stringify(execConfJsonObj, null, 2)
    //     LogBase.log(fileData);
    //     gDeviceUtil.fileSystem.writeFileFromRootSync(execConfPath, fileData);
    //     if (global.tray && event != 'quit') {
    //         win.hide();
    //     } else {
    //         win.close(true);
    //         nw.App.quit();
    //     }
    //     console.log("We're closing...");
    //     var x = win.x;
    //     var y = win.y;
    //     var width = win.width;
    //     var height = win.height;
    //     var isFullscreen = win.isFullscreen;
    //     console.log(x, " ", y, " ", width, " ", height, " ", isFullscreen);
    //     this.close(true); // then close it forcely
    // });

    // 获取本地历史记录文件
    // 获取文件中的文件夹配置
    // DeviceUtilAppPC.fileBrowser.a();
    // DeviceUtilAppPC.fileBrowser.addFolder();
    // gDeviceUtil.a();
    // gDeviceUtil.fileBrowser.b();
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
