/**
 * Created by johniak on 10/11/14.
 */
import $ from 'jquery';

import BasePlugin from './BasePlugin';

export default class BlacklistPersonPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints = [
      BasePlugin.RunningPoint.DOM_CREATED,
      BasePlugin.RunningPoint.DOM_MODIFIED,
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
    if (runningPoint === BasePlugin.RunningPoint.DOM_CREATED) {
      this.isDomCreated = true;
    }
    this.hidePersonActivity();
  }

  hidePersonActivity() {
    if (this.settings.hiddenUsers) {
      const users = this.users;
      const blacklisted = $('.author.ellipsis a b').contents().filter(function () {
        return $.inArray($(this).text(), users) !== -1;
      });
      $.each(blacklisted, (index, author) => {
        const post = $(author).closest('li');
        post.css('display', 'none');
      });
    }
  }
}
