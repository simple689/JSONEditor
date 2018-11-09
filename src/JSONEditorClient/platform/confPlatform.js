(function () {
    if (typeof require === 'function') {
        confAppPC();
    } else {
        confWebPC();
    }
})();

function confWebPC() {
    confProjectRoot = "/JSONEditorClient/project_JSONEditor/";
    confCommonRoot = "/JSONEditorClient/common/";
}
function confWebMobile() {
}
function confAppPC() {
    confClientType = enumConfClientType.appPC;
}
function confAppMobile() {
}
