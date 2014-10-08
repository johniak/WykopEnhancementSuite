/// <reference path="chrome.d.ts" />
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    

    if (request.method == "getSettings") {
        console.log(request);
        var settingManager = new SettingManager();
        settingManager.read(() => {
            sendResponse({
                hiddenUsers: settingManager.hiddenUsers,
                hiddenTags: settingManager.hiddenTags,
                greenRaja: settingManager.greenRaja
            });
            console.log("aaaa");
        });
    } else
        sendResponse({}); // snub them.
});