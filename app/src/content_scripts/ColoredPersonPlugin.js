/**
 * Created by johniak on 10/11/14.
 */
// / <reference path="../../dts/chrome.d.ts" />
// / <reference path="../Settings.ts" />
// / <reference path="BasePlugin.ts" />
class ColoredPersonPlugin extends BasePlugin {
  constructor(settings, personName, colorClass, settingName) {
    super(settings);
    this.runningPoints =
    [
      RunningPoint.DOM_CREATED,
      RunningPoint.DOM_MODIFIED,
    ];
    this.personName = personName;
    this.colorClass = colorClass;
    this.settingName = settingName;
  }
  runAction(runningPoint) {
    const personName = this.personName;
    const colorClass = this.colorClass;
    if (this.settings[this.settingName]) {
      $('.author.ellipsis a b').each(function () {
        if ($(this).text() == personName)
                    { $(this).parent().attr('class', colorClass); }
      });
      if (window.location.pathname == `/ludzie/${personName}/`) {
        $('h2>span').attr('class', this.colorClass);
      }
      const pmUrlRegexp = new RegExp('^/wiadomosc-prywatna/');
      if (pmUrlRegexp.test(window.location.pathname)) {
        $('.usercard>a>span>b').filter(function () {
          return $(this).text() == personName;
        }).closest('span').attr('class', colorClass);
        $('h4>a[class*="color"]').filter(function () {
          return $(this).text() == personName;
        }).attr('class', colorClass);
      }
    }
  }
}
