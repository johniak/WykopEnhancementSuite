import SettingManager from './SettingManager';

const settingManager = new SettingManager();

settingManager.read(() => {
});

chrome.storage.onChanged.addListener((changes) => {
  for (const key of Object.keys(changes)) {
    const value = changes[key].newValue;
    settingManager.settings[key] = value;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'getSettings') {
    settingManager.settings.path = chrome.extension.getURL('');
    sendResponse(settingManager.settings);
  }
  if (request.method === 'saveSettings') {
    settingManager.settings = request.data;
    settingManager.save();
  }
});
