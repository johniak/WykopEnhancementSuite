/**
 * Created by johniak on 10/11/14.
 */
/// <reference path="../Settings.ts" />

class BasePlugin {
    public runningPoints:RunningPoint[];
    public settings:Settings;

    public constructor(settings:Settings) {
        this.settings = settings;
    }

    public initialize():void {
    }

    public runAction(runningPoint:RunningPoint):void {
    }

    public hasRunningPoint(runningPoint:RunningPoint):boolean {
        for (var index in this.runningPoints) {
            if (this.runningPoints[index] == runningPoint)
                return true;
        }
        return false;
    }
}

enum RunningPoint {
    LOADING_STARETED,
    DOM_CREATED,
    DOM_MODIFIED
}