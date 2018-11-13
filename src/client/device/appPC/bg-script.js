chrome.developerPrivate.openDevTools({
    renderViewId: -1,
    renderProcessId: -1,
    extensionId: chrome.runtime.id
});

console.log("bg-script");