/**
 * Created by johniak on 10/11/14.
 */
import BasePlugin from './BasePlugin';
import $ from 'jquery';

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
    require('../../css/switch.css')
    const settings = this.settings;
    const _this = this;
    if (runningPoint == BasePlugin.RunningPoint.DOM_CREATED) {
     // $('head').append(`<link rel="stylesheet" href="${this.settings.path}css/switch.css" type="text/css" />`);
      $($('ul.clearfix')[0]).append('<li style ="padding: 10px 10px; color: #fff;line-height: 27px;font-size: 13px;font-weight: bold; height: 50px;">NSFW</li><li><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch"><label class="onoffswitch-label" for="myonoffswitch"></label></div></li>');
      $('[name=onoffswitch]').change(function () {
        settings.isNsfwDisabled = this.checked;
        chrome.runtime.sendMessage({method: 'saveSettings', data: settings});
        console.log(settings.isNsfwDisabled);
        if (_this.settings.isNsfwDisabled) {
          console.log(settings.isNsfwDisabled);
          _this.hideNsfwPosts();
        }
        else {
          _this.unHideNsfwPosts();
        }
      });
      if (this.settings.isNsfwDisabled) {
        $('[name=onoffswitch]')[0].checked = true;
      }
    }
    if (this.settings.isNsfwDisabled) {
      console.log(settings.isNsfwDisabled);
      this.hideNsfwPosts();
    }
    else {
      this.unHideNsfwPosts();
    }
  }

  unHideNsfwPosts() {
    const blacklisted = $('.entry.iC>>>.text').contents().filter(function () {
      const text = $(this).text();
      return text.toLowerCase().indexOf('#nsfw') > -1;
      // return $.inArray(, words) != -1;
    });
    $.each(blacklisted, (index, post) => {
      $(post).parent().parent().parent().parent().css('display', 'block');
    });
  }

  hideNsfwPosts() {
    const blacklisted = $('.entry.iC>>>.text').contents().filter(function () {
      const text = $(this).text();
      return text.toLowerCase().indexOf('#nsfw') > -1;
      // return $.inArray(, words) != -1;
    });
    $.each(blacklisted, (index, post) => {
      $(post).parent().parent().parent().parent().css('display', 'none');
    });
  }
}
