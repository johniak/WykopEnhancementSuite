/**
 * Created by johniak on 10/11/14.
 */
/// <reference path="../Settings.ts" />
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/chrome.d.ts" />
/// <reference path="BasePlugin.ts" />

class BlacklistPersonPlugin extends BasePlugin {

    users:string[];
    isDomCreated:boolean;
    public constructor(settings:Settings) {
        super(settings);
        this.runningPoints =
            [
                RunningPoint.DOM_CREATED,
                RunningPoint.DOM_MODIFIED
            ];
        this.users=[];
    }

    public initialize():void{
        $.get("http://www.wykop.pl/ustawienia/czarne-listy/", (data) => {
            var jqueryData = $(data);
            var htmlUsers = jqueryData.find(".usercard a span b");
            $.each(htmlUsers, (index, user) => {
                this.users.push($(user).text());
            });
            if(this.isDomCreated){
                this.hidePersonActivity();
            }
        });
    }

    public runAction(runningPoint:RunningPoint):void{
        if(runningPoint==RunningPoint.DOM_CREATED){
            this.isDomCreated=true;
        }
        this.hidePersonActivity();
    }
    private hidePersonActivity():void{
        if(this.settings.hiddenUsers) {
            var users = this.users;
            var blacklisted = $(".author.ellipsis a b").contents().filter(function () {
                return $.inArray($(this).text(), users) != -1;
            });
            $.each(blacklisted, (index, author) => {
                var post = $(author).closest("li");
                post.css("display", "none");
            });
        }
    }

}