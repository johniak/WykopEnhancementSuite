/// <reference path="../dts/jquery.d.ts" />
/// <reference path="../dts/chrome.d.ts" />
/// <reference path="SettingManager.ts" />


var settingManager;

window.onload = () => {
    settingManager = new SettingManager();
    $("#hide-users").change(() => {
        settingManager.hiddenUsers = <any>$("#hide-users").is(':checked');
        settingManager.save();
    });
    $("#hide-ads").change(() => {
        settingManager.hideAds = <any>$("#hide-ads").is(':checked');
        settingManager.save();
    });
    $("#ban-calka").change(() => {
        settingManager.permDlaCalki = <any>$("#ban-calka").is(':checked');
        settingManager.save();
    });
    $("#green-raja").change(() => {
        settingManager.greenRaja = <any>$("#green-raja").is(':checked');
        settingManager.save();
    });
    $("#bordo-kicioch").change(() => {
        settingManager.bordoKicioch = <any>$("#bordo-kicioch").is(':checked');
        settingManager.save();
    });
    settingManager.read(() => {
        console.log(settingManager.hiddenUsers);
        console.log(settingManager.permDlaCalki);
        console.log(settingManager.greenRaja);
        console.log(settingManager.bordoKicioch);
        $("#hide-users").attr('checked', settingManager.hiddenUsers);
        $("#hide-ads").attr('checked', settingManager.hideAds);
        $("#ban-calka").attr('checked', settingManager.permDlaCalki);
        $("#green-raja").attr('checked', settingManager.greenRaja);
        $("#bordo-kicioch").attr('checked', settingManager.bordoKicioch);
    });

};