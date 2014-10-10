/// <reference path="../dts/chrome.d.ts" />

class SettingManager {
    public hiddenUsers:boolean;
    public hideAds:boolean;
    public coloredPlus:boolean;
    public permDlaCalki:boolean;
    public greenRaja:boolean;
    public bordoKicioch:boolean;


    constructor() {

    }

    read(complete:any):void {
        chrome.storage.sync.get({
            hiddenUsers: true,
            hideAds: false,
            coloredPlus: true,
            permDlaCalki: false,
            greenRaja: false,
            bordoKicioch: false
        }, (items:any) => {
            this.hiddenUsers = items["hiddenUsers"];
            this.hideAds = items["hideAds"];
            this.coloredPlus = items["coloredPlus"];
            this.permDlaCalki = items["permDlaCalki"];
            this.greenRaja = items["greenRaja"];
            this.bordoKicioch = items["bordoKicioch"];
            console.log(items);
            complete();
        });
    }

    save():void {
        var dict = [];
        chrome.storage.sync.set({
            hiddenUsers: this.hiddenUsers,
            hideAds: this.hideAds,
            coloredPlus: this.coloredPlus,
            permDlaCalki: this.permDlaCalki,
            greenRaja: this.greenRaja,
            bordoKicioch: this.bordoKicioch
        }, () => {
            console.log("saved");
        });
    }
} 