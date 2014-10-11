/**
 * Created by johniak on 10/11/14.
 */
/// <reference path="../Settings.ts" />
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/chrome.d.ts" />
/// <reference path="../Settings.ts" />
/// <reference path="ColoredPersonPlugin.ts" />

class BannedPersonPlugin extends ColoredPersonPlugin {

    message:string;
    banHtml:string;

    public constructor(settings:Settings, personName:string, settingName:string, message:string) {
        super(settings, personName, "color-4", settingName);
        this.message = message;
        this.banHtml = '<div class="annotation type-light-alert space"><i class="fa fa-info-circle"></i><p>Użytkownik zbanowany permanentnie</p><p>' + this.message + '</p></div>';
    }

    public runAction(runningPoint:RunningPoint):void {
        super.runAction(runningPoint)
        if (this.settings[this.settingName]) {
            if (window.location.pathname == "/ludzie/" + this.personName + "/") {
                if(runningPoint!=RunningPoint.DOM_MODIFIED) {
                    $('.grid-main>.rbl-block').append(this.banHtml);
                }
                $('h2>span').attr("class", this.colorClass);
                $('.rank-number').css('cssText', 'display:none !important');
            }
        }
    }

}