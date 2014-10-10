/// <reference path="../dts/jquery.d.ts" />
/// <reference path="../dts/chrome.d.ts" />
/// <reference path="SettingManager.ts" />
/// <reference path="../dts/jquery.d.ts"/>
/// <reference path="../dts/select2.d.ts"/>

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
    $("#colored-plus").change(() => {
        settingManager.coloredPlus = <any>$("#colored-plus").is(':checked');
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
    $("#blacklist-words").change(()=> {
        var words=$("#blacklist-words").val().split(',');
        settingManager.blacklistedWords=words;
        settingManager.save();
    });
    settingManager.read(() => {
        console.log(settingManager.hiddenUsers);
        console.log(settingManager.permDlaCalki);
        console.log(settingManager.greenRaja);
        console.log(settingManager.bordoKicioch);
        $("#hide-users").attr('checked', settingManager.hiddenUsers);
        $("#hide-ads").attr('checked', settingManager.hideAds);
        $("#colored-plus").attr('checked', settingManager.coloredPlus);
        $("#ban-calka").attr('checked', settingManager.permDlaCalki);
        $("#green-raja").attr('checked', settingManager.greenRaja);
        $("#bordo-kicioch").attr('checked', settingManager.bordoKicioch);
        $("#blacklist-words").val(settingManager.blacklistedWords.join());
        $("#blacklist-words").select2({
            tags: [],
            tokenSeparators: [","]});
    });

};