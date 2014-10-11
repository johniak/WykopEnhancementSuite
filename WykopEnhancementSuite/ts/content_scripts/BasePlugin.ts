/**
 * Created by johniak on 10/11/14.
 */

class BasePlugin{
    public runningPoint :RunningPoint[];
    public constructor(Set){

    }
}

enum RunningPoint {
    LOADING_STARETED,
    DOM_CREATED,
    DOM_MODIFIED
}