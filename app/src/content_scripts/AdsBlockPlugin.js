/**
 * Created by johniak on 10/11/14.
 */
// / <reference path="../Settings.ts" />
// / <reference path="../../dts/jquery.d.ts" />
// / <reference path="../../dts/chrome.d.ts" />
// / <reference path="../Settings.ts" />
// / <reference path="BasePlugin.ts" />
class AdsBlockPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints =
    [
      RunningPoint.DOM_CREATED,
    ];
  }
  runAction(runningPoint) {
    if (this.settings.hideAds) {
      if (window.location.pathname == '/') {
        $('div[class="diggbox"]>a>span:contains("S")').closest('li').css('display', 'none');
      }
    }
  }
}
