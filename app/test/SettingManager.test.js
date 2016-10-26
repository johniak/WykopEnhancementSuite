/**
 * Created by johniak on 26/10/2016.
 */
import chrome from 'sinon-chrome';
import {assert} from 'chai';

import SettingManager from '../src/SettingManager';
import Settings from '../src/Settings';

describe('SettingManager.js', function () {
  before(function () {
    global.chrome = chrome;
    this.settingManager = new SettingManager();
  });

  beforeEach(function () {
    chrome.storage.sync.clear();
  });

  it('Should save settings to sync storage', function () {
    this.settingManager.save();
    assert.ok(
      chrome.storage.sync.set.calledOnce,
      'storage.sync.set should be called'
    );
    assert.ok(
      chrome.storage.sync.set.withArgs(new Settings()).calledOnce,
      'storage.sync.set should be called with settings object'
    );
  });

  it('Should read settings from sync storage', function () {
    this.settingManager.read();
    assert.ok(
      chrome.storage.sync.get.calledOnce,
      'storage.sync.set should be called'
    );
  });

});
