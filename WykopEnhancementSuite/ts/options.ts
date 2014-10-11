/// <reference path="../dts/jquery.d.ts" />
/// <reference path="../dts/chrome.d.ts" />
/// <reference path="SettingManager.ts" />
/// <reference path="../dts/jquery.d.ts"/>
/// <reference path="../dts/select2.d.ts"/>

var settingManager;


window.onload = () => {
    settingManager = new SettingManager();
    $("#hide-users").change(() => {
        settingManager.settings.hiddenUsers = <any>$("#hide-users").is(':checked');
        settingManager.save();
    });
    $("#hide-ads").change(() => {
        settingManager.settings.hideAds = <any>$("#hide-ads").is(':checked');
        settingManager.save();
    });
    $("#colored-plus").change(() => {
        settingManager.settings.coloredPlus = <any>$("#colored-plus").is(':checked');
        settingManager.save();
    });
    $("#ban-calka").change(() => {
        settingManager.settings.permDlaCalki = <any>$("#ban-calka").is(':checked');
        settingManager.save();
    });
    $("#green-raja").change(() => {
        settingManager.settings.greenRaja = <any>$("#green-raja").is(':checked');
        settingManager.save();
    });
    $("#bordo-kicioch").change(() => {
        settingManager.settings.bordoKicioch = <any>$("#bordo-kicioch").is(':checked');
        settingManager.save();
    });
    $("#blacklist-words").change(()=> {
        if ($("#blacklist-words").val().length == 0) {
            settingManager.settings.blacklistedWords = [];
            settingManager.save();
            return;
        }
        var words = $("#blacklist-words").val().split(',');
        settingManager.settings.blacklistedWords = words;
        settingManager.save();
    });
    settingManager.read(() => {
        console.log(settingManager.settings);
        $("#hide-users").attr('checked', settingManager.settings.hiddenUsers);
        $("#hide-ads").attr('checked', settingManager.settings.hideAds);
        $("#colored-plus").attr('checked', settingManager.settings.coloredPlus);
        $("#ban-calka").attr('checked', settingManager.settings.permDlaCalki);
        $("#green-raja").attr('checked', settingManager.settings.greenRaja);
        $("#bordo-kicioch").attr('checked', settingManager.settings.bordoKicioch);
        $("#blacklist-words").val(settingManager.settings.blacklistedWords.join());
        $("#blacklist-words").select2({
            tags: [],
            tokenSeparators: [","]});
    });

};