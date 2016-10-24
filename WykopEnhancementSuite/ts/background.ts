/// <reference path="../dts/chrome.d.ts" />
/// <reference path="SettingManager.ts" />

var settingManager = new SettingManager();
settingManager.read(()=> {
});
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var value = changes[key].newValue;
        settingManager.settings[key]=value;
    }
    console.log(settingManager.settings);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.method == "getSettings") {
        console.log("Load settings");
        settingManager.settings.path = chrome.extension.getURL('');
        console.log(settingManager.settings);
        sendResponse(settingManager.settings);
    }
    if (request.method == "saveSettings") {

        console.log("Save settings");
        console.log(request.data);
        settingManager.settings=request.data;
        settingManager.save();
    }
});



