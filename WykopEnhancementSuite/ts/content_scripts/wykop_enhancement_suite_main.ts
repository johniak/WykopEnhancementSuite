/**
 * Created by johniak on 10/11/14.
 */
/// <reference path="../../dts/chrome.d.ts" />
/// <reference path="PluginsManager.ts" />
chrome.runtime.sendMessage({ method: "getSettings" }, function (response) {
    var pluginManager = new PluginsManager(response);
    pluginManager.initialize();
});