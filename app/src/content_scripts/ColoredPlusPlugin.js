/**
 * Created by johniak on 10/11/14.
 */
import BasePlugin from './BasePlugin';

export default class ColoredPlusPlugin extends BasePlugin {
  constructor(settings) {
    super(settings);
    this.runningPoints =
    [
      BasePlugin.RunningPoint.LOADING_STARTED,
    ];
  }
  runAction(runningPoint) {
    if (this.settings.coloredPlus) {
      require('../../css/colored_nicks.css');
    }
  }
}
