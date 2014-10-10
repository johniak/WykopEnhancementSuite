/// <reference path="../dts/chrome.d.ts" />

class SettingManager {
    public hiddenUsers:boolean;
    public hideAds:boolean;
    public coloredPlus:boolean;
    public permDlaCalki:boolean;
    public greenRaja:boolean;
    public bordoKicioch:boolean;
    public blacklistedWords:String[];

    constructor() {

    }

    read(complete:any):void {
        chrome.storage.sync.get({
            hiddenUsers: true,
            hideAds: false,
            coloredPlus: true,
            permDlaCalki: false,
            greenRaja: false,
            bordoKicioch: false,
            blacklistedWords:[]
        }, (items:any) => {
            this.hiddenUsers = items["hiddenUsers"];
            this.hideAds = items["hideAds"];
            this.coloredPlus = items["coloredPlus"];
            this.permDlaCalki = items["permDlaCalki"];
            this.greenRaja = items["greenRaja"];
            this.bordoKicioch = items["bordoKicioch"];
            this.blacklistedWords=items["blacklistedWords"]
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
            bordoKicioch: this.bordoKicioch,
            blacklistedWords: this.blacklistedWords
        }, () => {
            console.log("saved");
        });
    }
} 