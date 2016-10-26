/**
 * Created by johniak on 10/11/14.
 */
import $ from 'jquery';

import BasePlugin from './BasePlugin';

export default class WordsBlacklistPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints = [
      BasePlugin.RunningPoint.DOM_CREATED,
      BasePlugin.RunningPoint.DOM_MODIFIED,
    ];
  }

  runAction(runningPoint) {
    if (this.settings.blacklistedWords.length > 0) {
      this.hidePostsWithBlackListedWords();
    }
  }

  hidePostsWithBlackListedWords() {
    const words = this.settings.blacklistedWords;
    const blacklisted = $('.entry.iC>>>.text').contents().filter(function () {
      const text = $(this).text();
      for (const word of words) {
        if (text.indexOf(word) > -1) {
          return true;
        }
      }
      return false;
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
