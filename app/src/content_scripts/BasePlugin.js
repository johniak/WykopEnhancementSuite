/**
 * Created by johniak on 10/11/14.
 */

export default class BasePlugin {
  constructor(settings) {
    this.settings = settings;
  }

  initialize() {
  }

  runAction(runningPoint) {
  }

  hasRunningPoint(runningPoint) {
    for (const allowedPoint of this.runningPoints) {
      if (allowedPoint === runningPoint) {
        return true;
      }
    }
    return false;
  }
}

BasePlugin.RunningPoint = {
  LOADING_STARTED: 0,
  DOM_CREATED: 1,
  DOM_MODIFIED: 2,
};

