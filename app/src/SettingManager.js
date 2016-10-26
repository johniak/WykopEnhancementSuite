import Settings from './Settings';

export default class SettingManager {
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
    });
  }
}
