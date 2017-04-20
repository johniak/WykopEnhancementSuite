/**
 * Created by johniak on 10/11/14.
 */
import 'whatwg-fetch';
import $ from 'jquery';
import moment from 'moment';
import BasePlugin from './BasePlugin';

export default class FixedTagsPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints = [
      BasePlugin.RunningPoint.DOM_CREATED,
    ];
    this.today = moment();
    this.monthCount = 132;
    this.monthOffset = 3;
  }

  async runAction(runningPoint) {
    if (!this.settings.fixedTags) {
      return;
    }
    const reg = /tag\/(.*)\/autor\/(.*)\//g;
    const path = reg.exec(window.location.pathname);
    if (!path) {
      return;
    }
    $('#itemsStream').prepend('<div id="tagsLoaderIndicator">Trwa ładowanie...</div>');
    this.tag = path[1];
    this.autor = path[2];
    this.today.subtract(this.monthOffset, 'month');
    for (let i = this.monthOffset; i < this.monthCount; i++) {
      const date = this.today.subtract(1, 'month');
      const url = `//www.wykop.pl/tag/${this.tag}/autor/${this.autor}/archiwum/${date.format('YYYY-MM')}`;
      const response = await fetch(url);
      const data = await response.text();
      $('#itemsStream').append($(data).find('#itemsStream>li'));
    }
    $('#tagsLoaderIndicator').remove();
  }
}
