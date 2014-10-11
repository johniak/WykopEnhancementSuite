/**
 * Created by johniak on 10/11/14.
 */
/// <reference path="../Settings.ts" />
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/chrome.d.ts" />
/// <reference path="../Settings.ts" />
/// <reference path="BasePlugin.ts" />

class WordsBlacklistPlugin extends BasePlugin {

    public constructor(settings:Settings) {
        super(settings);
        this.runningPoints =
            [
                RunningPoint.DOM_CREATED,
                RunningPoint.DOM_MODIFIED
            ];
    }

    public runAction(runningPoint:RunningPoint):void{
        if(this.settings.blacklistedWords.length>0) {
            this.hidePostsWithBlackListedWords();
        }
    }

    private hidePostsWithBlackListedWords() {
        var words = this.settings.blacklistedWords;
        var blacklisted = $(".entry.iC>>>.text").contents().filter(function () {
            var text =$(this).text();
            for (var i in words){
                var word=words[i];
                return text.indexOf(word)>-1;
            }
            //return $.inArray(, words) != -1;
        });
        $.each(blacklisted, (index, post) => {
            $(post).parent().parent().parent().parent().css("display", "none");
        });
    }
}