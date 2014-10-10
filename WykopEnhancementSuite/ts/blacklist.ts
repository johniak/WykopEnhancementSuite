/**
 * Created by johniak on 10/4/2014.
 */
/// <reference path="../dts/jquery.d.ts" />
/// <reference path="../dts/chrome.d.ts" />
var domExist = null;
console.log("kopytko");
var interval = window.setInterval(()=> {
    if ($('body').html() != null) {
        window.clearInterval(interval);
        console.log("exist");
        domExist();
    }
}, 5);
class BlacklistManager {

    users:string[];
    tags:string[];
    settings:Settings;

    constructor(settings:Settings) {
        this.users = [];
        this.tags = [];
        this.settings = settings;
        this.initialize();
    }


    private initialize():void {

        $.get("http://www.wykop.pl/ustawienia/czarne-listy/", (data) => {
            var jqueryData = $(data);
            var htmlUsers = jqueryData.find(".usercard a span b");
            var hthmlTags = jqueryData.find(".tagcard span a.lcontrast");
            $.each(htmlUsers, (index, user) => {
                this.users.push($(user).text());
            });
            $.each(hthmlTags, (index, tag) => {
                this.tags.push($(tag).text().trim());
            });
            domExist = this.initDom();
            $(document).ready(()=> {
                console.log("ready")

            });
        });
    }

    initDom() {
        if (this.settings.hideAds) {
            this.hideAds();
        }
        this.hideAllActivity();
        $('body').bind("DOMSubtreeModified", () => {
            this.hideAllActivity();
        });
        this.heheszki();
    }

    public hideAllActivity():void {
        if (this.settings.hiddenUsers) {
            this.hideUserActivity();
        }
    }

    public hideUserActivity() {
        var users = this.users;
        var blacklisted = $(".author.ellipsis a b").contents().filter(function () {
            return $.inArray($(this).text(), users) != -1;
        });
        $.each(blacklisted, (index, author) => {
            var post = $(author).parent().parent().parent().parent().parent().parent();
            post.css("display", "none");
        });
    }

    public hideAds() {
        if (window.location.pathname == "/") {
            $('div[class="diggbox"]>a>span:contains("S")').parent().parent().parent().parent().css('display', 'none');
        }
    }

    public heheszki() {
        if (this.settings.greenRaja) {
            $(".author.ellipsis a b").each(function () {
                if ($(this).text() == "Raja")$(this).parent().attr("class", "color-0");
            });
            if (window.location.pathname == "/ludzie/Raja/") {
                $('h2>span').attr("class", "color-0");
            }
        }
        if (this.settings.permDlaCalki) {
            $(".author.ellipsis a b").each(function () {
                if ($(this).text() == "FilozofujacaCalka")$(this).parent().attr("class", "color-4");
            });
            if (window.location.pathname == "/ludzie/FilozofujacaCalka/") {
                $('.grid-main>.rbl-block').append(banHtml);
                $('h2>span').attr("class", "color-4");
                $('.rank-number').css('cssText', 'display:none !important');
            }
        }
        if (this.settings.bordoKicioch) {
            $(".author.ellipsis a b").each(function () {
                if ($(this).text() == "kicioch")$(this).parent().attr("class", "color-2");
            });
            if (window.location.pathname == "/ludzie/kicioch/") {
                $('h2>span').attr("class", "color-2");
            }
        }
    }
}

class Settings {
    public hiddenUsers:boolean;
    public hideAds:boolean;
    public greenRaja:boolean;
    public permDlaCalki:boolean;
    public bordoKicioch:boolean;
}


chrome.runtime.sendMessage({ method: "getSettings" }, function (response) {
    console.log(response);
    var manager = new BlacklistManager(response);
});


var banHtml = '<div class="annotation type-light-alert space"><i class="fa fa-info-circle"></i><p>Użytkownik zbanowany permanentnie</p><p>za zbrodnie na Wołyniu		</p></div>';