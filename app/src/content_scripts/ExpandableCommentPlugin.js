/**
 * Created by johniak on 29/10/2016.
 */
import $ from 'jquery';
import lazyIninitializer from 'jquery.lazyload.cjs';
import BasePlugin from './BasePlugin';

lazyIninitializer($);

export default class AdsBlockPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints = [
      BasePlugin.RunningPoint.DOM_CREATED,
    ];
  }

  runAction(runningPoint) {
    if (this.settings.expandableComments && window.location.pathname.startsWith('/link/')) {
      this.initExpand();
    }
  }

  initExpand() {
    $('.iC').each((index, item) => {
      const mainComments = $(item);
      const subComments = mainComments.find('.sub>li');
      const bar = mainComments.find('.wblock>div>.author').first();
      if (subComments.length > 2) {
        bar.append(`<a class="expandable" href="#" data-toggle=false>[ - ]<a/> <span>(${subComments.length} odpowiedzi)</span>`);
      }
    });
    $('.expandable').click(this.onExpandClick);
  }

  onExpandClick(event) {
    event.stopPropagation();
    const toggle = this.dataset.toggle === 'true';
    if (toggle) {
      $(this).html('[ - ]');
      this.dataset.toggle = false;
    } else {
      $(this).html('[ + ]');
      this.dataset.toggle = true;
    }
    $(this).closest('.iC').find('.sub').toggle();
    $('img.lazy').lazyload();
    return false;
  }
}
