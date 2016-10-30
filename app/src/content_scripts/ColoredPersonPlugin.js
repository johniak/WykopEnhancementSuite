/**
 * Created by johniak on 10/11/14.
 */
import $ from 'jquery';
import BasePlugin from './BasePlugin';

export default class ColoredPersonPlugin extends BasePlugin {
  constructor(settings, personName, colorClass, settingName) {
    super(settings);
    this.runningPoints = [
      BasePlugin.RunningPoint.DOM_CREATED,
      BasePlugin.RunningPoint.DOM_MODIFIED,
    ];
    this.personName = personName;
    this.colorClass = colorClass;
    this.settingName = settingName;
  }

  runAction(runningPoint) {
    const personName = this.personName;
    const colorClass = this.colorClass;
    if (this.settings[this.settingName]) {
      $('.author.ellipsis a b').each((index, item) => {
        if ($(item).text() === personName) {
          $(item).parent().attr('class', colorClass);
        }
      });
      if (window.location.pathname === `/ludzie/${personName}/`) {
        $('h2>span').attr('class', this.colorClass);
      }
      const pmUrlRegexp = new RegExp('^/wiadomosc-prywatna/');
      if (pmUrlRegexp.test(window.location.pathname)) {
        $('.usercard>a>span>b').filter((index, item) =>
          $(item).text() === personName
        ).closest('span').attr('class', colorClass);
        $('h4>a[class*="color"]').filter((index, item) =>
           $(item).text() === personName
        ).attr('class', colorClass);
      }
    }
  }
}
