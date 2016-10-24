/**
 * Created by johniak on 10/11/14.
 */

import Settings from '../Settings';
import BasePlugin from './BasePlugin';
import BlacklistPersonPlugin from './BlacklistPersonPlugin';
import AdsBlockPlugin from './AdsBlockPlugin';
import WordsBlacklistPlugin from './WordsBlacklistPlugin';
import ColoredPersonPlugin from './ColoredPersonPlugin';
import BannedPersonPlugin from './BannedPersonPlugin';
import ColoredPlusPlugin from './ColoredPlusPlugin';
import NsfwPlugin from './NsfwPlugin';

export default class PluginsManager {
  constructor(settings) {
    this.settings = settings;
    this.plugins = [
      new BlacklistPersonPlugin(settings),
      new AdsBlockPlugin(settings),
      new ColoredPlusPlugin(settings),
      new WordsBlacklistPlugin(settings),
      new NsfwPlugin(settings),
      new ColoredPersonPlugin(settings, 'Raja', 'color-0', 'greenRaja'),
      new ColoredPersonPlugin(settings, 'kicioch', 'color-2', 'bordoKicioch'),
      new BannedPersonPlugin(settings, 'FilozofujacaCalka', 'permDlaCalki', 'za zbrodnię na Wołyniu'),
    ];
  }
  initialize() {
    for (const index in this.plugins) {
      const plugin = this.plugins[index];
      plugin.initialize();
      if (plugin.hasRunningPoint(RunningPoint.LOADING_STARETED)) {
        plugin.runAction(RunningPoint.LOADING_STARETED);
      }
    }
    const interval = window.setInterval(() => {
      if ($('body').html() != null) {
        window.clearInterval(interval);
        this.onDOMCreated();
      }
    }, 5);
  }
  onDOMCreated() {
    for (const index in this.plugins) {
      const plugin = this.plugins[index];
      if (plugin.hasRunningPoint(RunningPoint.DOM_CREATED)) {
        plugin.runAction(RunningPoint.DOM_CREATED);
      }
    }
    $('body').bind('DOMSubtreeModified', () => {
      this.onDOMModified();
    });
  }
  onDOMModified() {
    for (const index in this.plugins) {
      const plugin = this.plugins[index];
      if (plugin.hasRunningPoint(RunningPoint.DOM_MODIFIED)) {
        plugin.runAction(RunningPoint.DOM_MODIFIED);
      }
    }
  }
}
