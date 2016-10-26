/**
 * Created by johniak on 10/11/14.
 */
import BasePlugin from './BasePlugin';
import $ from 'jquery';

export default class ColoredPlusPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    console.log("TEEEEST")
    this.runningPoints =
    [
      BasePlugin.RunningPoint.LOADING_STARTED,
    ];
  }
  runAction(runningPoint) {
    console.log('colored plus',this.settings.coloredPlus);
    if (this.settings.coloredPlus) {
      require('../../css/colored_nicks.css');
    }
  }
}
