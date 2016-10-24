/**
 * Created by johniak on 10/11/14.
 */
/// <reference path="../Settings.ts" />
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="../../dts/chrome.d.ts" />
/// <reference path="BasePlugin.ts" />
/// <reference path="BlacklistPersonPlugin.ts" />
/// <reference path="AdsBlockPlugin.ts" />
/// <reference path="WordsBlacklistPlugin.ts" />
/// <reference path="ColoredPersonPlugin.ts" />
/// <reference path="BannedPersonPlugin.ts" />
/// <reference path="ColoredPlusPlugin.ts" />
/// <reference path="NsfwPlugin.ts" />

class PluginsManager{

    public plugins:BasePlugin[];
    settings:Settings;
    public constructor(settings:Settings){
        this.settings=settings;
        this.plugins =[
            new BlacklistPersonPlugin(settings),
            new AdsBlockPlugin(settings),
            new ColoredPlusPlugin(settings),
            new WordsBlacklistPlugin(settings),
            new NsfwPlugin(settings),
            new ColoredPersonPlugin(settings,'Raja','color-0','greenRaja'),
            new ColoredPersonPlugin(settings,'kicioch','color-2','bordoKicioch'),
            new BannedPersonPlugin(settings,'FilozofujacaCalka','permDlaCalki','za zbrodnię na Wołyniu'),
        ];
    }
    public initialize():void{
        for (var index in this.plugins){
            var plugin = this.plugins[index];
            plugin.initialize();
            if(plugin.hasRunningPoint(RunningPoint.LOADING_STARETED)){
                plugin.runAction(RunningPoint.LOADING_STARETED);
            }
        }
        var interval = window.setInterval(()=> {
            if ($('body').html() != null) {
                window.clearInterval(interval);
                this.onDOMCreated();
            }
        }, 5);
    }

    private onDOMCreated():void{
        for (var index in this.plugins){
            var plugin = this.plugins[index];
            if(plugin.hasRunningPoint(RunningPoint.DOM_CREATED)){
                plugin.runAction(RunningPoint.DOM_CREATED);
            }
        }
        $('body').bind("DOMSubtreeModified", () => {
            this.onDOMModified();
        });
    }

    private onDOMModified():void{
        for (var index in this.plugins){
            var plugin = this.plugins[index];
            if(plugin.hasRunningPoint(RunningPoint.DOM_MODIFIED)){
                plugin.runAction(RunningPoint.DOM_MODIFIED);
            }
        }
    }


}


