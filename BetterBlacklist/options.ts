/// <reference path="jquery.d.ts" />
/// <reference path="chrome.d.ts" />
/// <reference path="SettingManager.ts" />


var settingManager;

window.onload = () => {
    settingManager = new SettingManager();
    $("#hide-users").change(() => {
        settingManager.hiddenUsers = <any>$("#hide-users").is(':checked');
        settingManager.save();
    });
    $("#hide-tags").change(() => {
        settingManager.hiddenTags = <any>$("#hide-tags").is(':checked');
        settingManager.save();
    });
    $("#green-raja").change(() => {
        settingManager.greenRaja = <any>$("#green-raja").is(':checked');
        settingManager.save();
    });
    settingManager.read(() => {
        console.log(settingManager.hiddenUsers);
        console.log(settingManager.hiddenTags);
        console.log(settingManager.greenRaja);
        $("#hide-users").attr('checked', settingManager.hiddenUsers);
        $("#hide-tags").attr('checked', settingManager.hiddenTags);
        $("#green-raja").attr('checked', settingManager.greenRaja);
    });

};