
class SettingManager {
    public hiddenUsers: boolean;
    public hiddenTags: boolean;
    public greenRaja: boolean;
    constructor() {
        
    }
    read(complete:any): void {
        chrome.storage.sync.get({
            users: true,
            tags: true,
            raja: false
        }, (items: any) => {
                this.hiddenUsers = items["users"];
                this.hiddenTags = items["tags"];
                this.greenRaja = items["raja"];
                complete();
        });
    }
    save(): void {
        chrome.storage.sync.set({
            users: this.hiddenUsers,
            tags: this.hiddenTags,
            raja: this.greenRaja
        }, () => { console.log("saved"); });
    }
} 