import Settings from './Settings';

export default class SettingManager {
  constructor() {
    this.settings = new Settings();
    this.storageArea = chrome.storage.sync;
    if (!this.storageArea) {
      this.storageArea = chrome.storage.local;
    }
  }

  read(complete) {
    this.storageArea.get(this.settings, (items) => {
      this.settings = items;
      complete();
    });
  }

  save() {
    this.storageArea.set(this.settings);
  }
}
