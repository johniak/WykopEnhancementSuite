/// <reference path="../dts/chrome.d.ts" />
/// <reference path="Settings.ts" />
class SettingManager {
    public settings: Settings;
    constructor() {
        this.settings = new Settings();
    }

    read(complete:any):void {
        chrome.storage.sync.get(this.settings, (items:any) => {
            this.settings=items;
            complete();
        });
    }

    save():void {
        chrome.storage.sync.set(this.settings, () => {
            console.log("saved");
        });
    }
} 