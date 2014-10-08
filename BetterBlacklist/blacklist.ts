/**
 * Created by johniak on 10/4/2014.
 */

/// <reference path="jquery.d.ts" />
/// <reference path="chrome.d.ts" />
console.log("test");
class BlacklistManager {

    users: string[];
    tags: string[];
    constructor() {
        this.users = [];
        this.tags = [];
        this.initialize();
    }


    private initialize(): void {
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
            this.hideAllActivity();
            $('body').bind("DOMSubtreeModified", () => { this.hideAllActivity(); });
        });
    }
    public hideAllActivity(): void {
        console.log("hiding blacklisted users");
        var users = this.users;
        var blacklisted = $(".author.ellipsis a b").contents().filter(function () {
            return $.inArray($(this).text(), users)!=-1;
        });
        $.each(blacklisted,(index, author) => {
            var post = $(author).parent().parent().parent().parent().parent().parent();
            post.css("display", "none");
        });
    }
}
//window.onload = () => {
    var manager = new BlacklistManager();
//}

chrome.runtime.sendMessage({ method: "getSettings" }, function (response) {
    console.log(response);
});



