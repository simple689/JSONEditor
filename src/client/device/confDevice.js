(function () {
    if (typeof require === 'function') {
        confAppPC();
    } else {
        confWebPC();
    }
    if (gDeviceUtil && gDeviceExec) {
        gDeviceExec.init();
    }
})();

function confWebPC() {
    confProjectRoot = "/client/project_JSONEditor/";
    confCommonRoot = "/client/common/";
}
function confWebMobile() {
    confDeviceType = enumConfDeviceType.webMobile;
}
function confAppPC() {
    confProjectRoot = "/project_JSONEditor/";
    confCommonRoot = "/common/";
    confDeviceType = enumConfDeviceType.appPC;
    gDeviceUtil = new DeviceUtilAppPC();
    gDeviceExec = new DeviceExecAppPC();
}
function confAppMobile() {
    confDeviceType = enumConfDeviceType.appMobile;
}
