/**
 * Created by johniak on 10/11/14.
 */
import $ from 'jquery';

import BasePlugin from './BasePlugin';

export default class NsfwPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints = [
      BasePlugin.RunningPoint.DOM_CREATED,
      BasePlugin.RunningPoint.DOM_MODIFIED,
      BasePlugin.RunningPoint.LOADING_STARTED,
    ];
  }

  runAction(runningPoint) {
    if (!this.settings.nsfwSwitch) {
      return;
    }
    require('../../css/switch.css');
    const settings = this.settings;
    if (runningPoint === BasePlugin.RunningPoint.DOM_CREATED) {
      $($('ul.clearfix')[0])
        .append('<li style ="padding: 10px 10px; color: #fff;line-height: 27px;font-size: 13px;' +
          'font-weight: bold; height: 50px;">NSFW</li><li><div class="onoffswitch">' +
          '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" ' +
          'id="myonoffswitch"><label class="onoffswitch-label" for="myonoffswitch">' +
          '</label></div></li>');
      const onOffSwitch = $('[name=onoffswitch]');
      onOffSwitch.change(() => {
        settings.isNsfwDisabled = onOffSwitch.prop('checked');
        chrome.runtime.sendMessage({ method: 'saveSettings', data: settings });
        if (this.settings.isNsfwDisabled) {
          this.hideNsfwPosts();
        } else {
          this.unHideNsfwPosts();
        }
      });
      if (this.settings.isNsfwDisabled) {
        onOffSwitch.prop('checked', true);
      }
    }
    if (this.settings.isNsfwDisabled) {
      this.hideNsfwPosts();
    } else {
      this.unHideNsfwPosts();
    }
  }

  unHideNsfwPosts() {
    const blacklisted = $('.entry.iC>>>.text').contents().filter((index, item) => {
      const text = $(item).text();
      return text.toLowerCase().indexOf('#nsfw') > -1;
    });
    $.each(blacklisted, (index, post) => {
      $(post)
        .parent()
        .parent()
        .parent()
        .parent()
        .css('display', 'block');
    });
  }

  hideNsfwPosts() {
    const blacklisted = $('.entry.iC>>>.text').contents().filter((index, item) => {
      const text = $(item).text();
      return text.toLowerCase().indexOf('#nsfw') > -1;
    });
    $.each(blacklisted, (index, post) => {
      $(post)
        .parent()
        .parent()
        .parent()
        .parent()
        .css('display', 'none');
    });
  }
}
