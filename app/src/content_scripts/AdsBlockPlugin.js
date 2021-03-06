/**
 * Created by johniak on 10/11/14.
 */
import $ from 'jquery';
import BasePlugin from './BasePlugin';

export default class AdsBlockPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints = [
      BasePlugin.RunningPoint.DOM_CREATED,
    ];
  }

  runAction(runningPoint) {
    if (this.settings.hideAds) {
      if (window.location.pathname === '/') {
        $('div[class="diggbox"]>a>span:contains("S")').closest('li').css('display', 'none');
      }
    }
  }
}
