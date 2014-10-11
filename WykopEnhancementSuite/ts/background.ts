/// <reference path="../dts/chrome.d.ts" />
/// <reference path="SettingManager.ts" />

var settingManager = new SettingManager();
settingManager.read(()=> {
});
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var value = changes[key].newValue;
        settingManager.settings[key]=value;
        console.log(settingManager.settings);
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getSettings") {
        settingManager.settings.path = chrome.extension.getURL('');
        console.log(settingManager.settings);
        sendResponse(settingManager.settings);
    }
});



