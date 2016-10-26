/**
 * Created by johniak on 10/11/14.
 */

import ColoredPersonPlugin from './ColoredPersonPlugin';
import $ from 'jquery';

export default class BannedPersonPlugin extends ColoredPersonPlugin {
  constructor(settings, personName, settingName, message) {
    super(settings, personName, 'color-4', settingName);
    this.message = message;
    this.banHtml = `<div class="annotation type-light-alert space"><i class="fa fa-info-circle"></i><p>Użytkownik zbanowany permanentnie</p><p>${this.message}</p></div>`;
  }

  runAction(runningPoint) {
    super.runAction(runningPoint);
    if (this.settings[this.settingName]) {
      if (window.location.pathname == `/ludzie/${this.personName}/`) {
        if (runningPoint != RunningPoint.DOM_MODIFIED) {
          $('.grid-main>.rbl-block').append(this.banHtml);
        }
        $('h2>span').attr('class', this.colorClass);
        $('.rank-number').css('cssText', 'display:none !important');
      }
    }
  }
}
