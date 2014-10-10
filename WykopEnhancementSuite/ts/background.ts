/// <reference path="../dts/chrome.d.ts" />
/// <reference path="SettingManager.ts" />

var settingManager = new SettingManager();
settingManager.read(()=> {
});
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var value = changes[key].newValue;
        switch (key) {
            case 'hiddenUsers':
                settingManager.hiddenUsers = value;
                break;
            case 'hideAds':
                settingManager.hideAds = value;
                break;
            case 'coloredPlus':
                settingManager.coloredPlus = value;
                break;
            case 'permDlaCalki':
                settingManager.permDlaCalki = value;
                break;
            case 'greenRaja':
                settingManager.greenRaja = value;
                break;
            case 'bordoKicioch':
                settingManager.bordoKicioch = value;
                break;
            case 'blacklistedWords':
                settingManager.blacklistedWords = value;
                break;
        }
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {


    if (request.method == "getSettings") {
        var response = {
            hiddenUsers: settingManager.hiddenUsers,
            hideAds: settingManager.hideAds,
            coloredPlus: settingManager.coloredPlus,
            permDlaCalki: settingManager.permDlaCalki,
            greenRaja: settingManager.greenRaja,
            bordoKicioch: settingManager.bordoKicioch,
            blacklistedWords:settingManager.blacklistedWords,
            path: chrome.extension.getURL('')
        };
        console.log(response);
        sendResponse(response);
    }  // snub them.
});



