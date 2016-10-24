/**
 * Created by johniak on 10/11/14.
 */
// / <reference path="../Settings.ts" />
// / <reference path="../../dts/jquery.d.ts" />
// / <reference path="../../dts/chrome.d.ts" />
// / <reference path="../Settings.ts" />
// / <reference path="BasePlugin.ts" />
class WordsBlacklistPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints =
    [
      RunningPoint.DOM_CREATED,
      RunningPoint.DOM_MODIFIED,
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
      for (const i in words) {
        const word = words[i];
        if (text.indexOf(word) > -1)
                    { return true; }
      }
            // return $.inArray(, words) != -1;
    });
    $.each(blacklisted, (index, post) => {
      $(post).parent().parent().parent().parent().css('display', 'none');
    });
  }
}
