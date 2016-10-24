/**
 * Created by johniak on 10/11/14.
 */
// / <reference path="../Settings.ts" />
// / <reference path="../../dts/jquery.d.ts" />
// / <reference path="../../dts/chrome.d.ts" />
// / <reference path="../Settings.ts" />
// / <reference path="BasePlugin.ts" />
class ColoredPlusPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints =
    [
      RunningPoint.LOADING_STARETED,
    ];
  }
  runAction(runningPoint) {
    if (this.settings.coloredPlus) {
      $('head').append(`<link rel="stylesheet" href="${this.settings.path}css/colored_nicks.css" type="text/css" />`);
    }
  }
}
