// / <reference path="../dts/chrome.d.ts" />
// / <reference path="Settings.ts" />
class SettingManager {
  constructor() {
    this.settings = new Settings();
  }
  read(complete) {
    chrome.storage.sync.get(this.settings, (items) => {
      this.settings = items;
      complete();
    });
  }
  save() {
    chrome.storage.sync.set(this.settings, () => {
      console.log('saved');
    });
  }
}
