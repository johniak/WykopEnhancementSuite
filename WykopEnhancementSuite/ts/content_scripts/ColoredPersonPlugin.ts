/**
 * Created by johniak on 10/11/14.
 */
/// <reference path="../Settings.ts" />
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/chrome.d.ts" />
/// <reference path="../Settings.ts" />
/// <reference path="BasePlugin.ts" />

class ColoredPersonPlugin extends BasePlugin {
    personName:string;
    colorClass:string;
    settingName:string;

    public constructor(settings:Settings, personName:string, colorClass:string, settingName:string) {
        super(settings);
        this.runningPoints =
            [
                RunningPoint.DOM_CREATED,
                RunningPoint.DOM_MODIFIED
            ];
        this.personName = personName;
        this.colorClass = colorClass;
        this.settingName = settingName;
    }

    public runAction(runningPoint:RunningPoint):void {
        var personName =this.personName;
        var colorClass =this.colorClass;
        if (this.settings[this.settingName]) {
            $(".author.ellipsis a b").each(function () {
                if ($(this).text() == personName)
                    $(this).parent().attr("class", colorClass);
            });
            if (window.location.pathname == "/ludzie/"+personName+"/") {
                $('h2>span').attr("class", this.colorClass);
            }
        }
    }


}