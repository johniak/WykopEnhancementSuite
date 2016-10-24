/**
 * Created by johniak on 10/11/14.
 */
// / <reference path="../Settings.ts" />
// / <reference path="../../dts/jquery.d.ts" />
// / <reference path="../../dts/chrome.d.ts" />
// / <reference path="BasePlugin.ts" />
class BlacklistPersonPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints =
    [
      RunningPoint.DOM_CREATED,
      RunningPoint.DOM_MODIFIED,
    ];
    this.users = [];
  }
  initialize() {
    $.get('http://www.wykop.pl/ustawienia/czarne-listy/', (data) => {
      const jqueryData = $(data);
      const htmlUsers = jqueryData.find('.usercard a span b');
      $.each(htmlUsers, (index, user) => {
        this.users.push($(user).text());
      });
      if (this.isDomCreated) {
        this.hidePersonActivity();
      }
    });
  }
  runAction(runningPoint) {
    if (runningPoint == RunningPoint.DOM_CREATED) {
      this.isDomCreated = true;
    }
    this.hidePersonActivity();
  }
  hidePersonActivity() {
    if (this.settings.hiddenUsers) {
      const users = this.users;
      const blacklisted = $('.author.ellipsis a b').contents().filter(function () {
        return $.inArray($(this).text(), users) != -1;
      });
      $.each(blacklisted, (index, author) => {
        const post = $(author).closest('li');
        post.css('display', 'none');
      });
    }
  }
}
