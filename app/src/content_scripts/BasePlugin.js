/**
 * Created by johniak on 10/11/14.
 */
// / <reference path="../Settings.ts" />
class BasePlugin {
  constructor(settings) {
    this.settings = settings;
  }
  initialize() {
  }
  runAction(runningPoint) {
  }
  hasRunningPoint(runningPoint) {
    for (const index in this.runningPoints) {
      if (this.runningPoints[index] == runningPoint)
                { return true; }
    }
    return false;
  }
}
let RunningPoint;
(function (RunningPoint) {
  RunningPoint[RunningPoint.LOADING_STARETED = 0] = 'LOADING_STARETED';
  RunningPoint[RunningPoint.DOM_CREATED = 1] = 'DOM_CREATED';
  RunningPoint[RunningPoint.DOM_MODIFIED = 2] = 'DOM_MODIFIED';
}(RunningPoint || (RunningPoint = {})));
