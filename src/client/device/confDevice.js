(function () {
    if (typeof require === 'function') {
        confAppPC();
    } else {
        confWebPC();
    }
    if (confDeviceUtil && confDeviceExec) {
        confDeviceExec.init();
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
    confDeviceUtil = new DeviceUtilAppPC();
    confDeviceExec = new DeviceExecAppPC();
}
function confAppMobile() {
    confDeviceType = enumConfDeviceType.appMobile;
}
