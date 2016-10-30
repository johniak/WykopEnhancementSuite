/**
 * Created by johniak on 10/11/14.
 */
import $ from 'jquery';

import BlacklistPersonPlugin from './BlacklistPersonPlugin';
import AdsBlockPlugin from './AdsBlockPlugin';
import WordsBlacklistPlugin from './WordsBlacklistPlugin';
import ColoredPersonPlugin from './ColoredPersonPlugin';
import BannedPersonPlugin from './BannedPersonPlugin';
import ColoredPlusPlugin from './ColoredPlusPlugin';
import NsfwPlugin from './NsfwPlugin';
import BasePlugin from './BasePlugin';
import ExpandableCommentPlugin from './ExpandableCommentPlugin';

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
      new BannedPersonPlugin(settings,
        'FilozofujacaCalka',
        'permDlaCalki',
        'za zbrodnię na Wołyniu'),
      new ExpandableCommentPlugin(settings),
    ];
  }

  initialize() {
    for (const plugin of this.plugins) {
      plugin.initialize();
      if (plugin.hasRunningPoint(BasePlugin.RunningPoint.LOADING_STARTED)) {
        plugin.runAction(BasePlugin.RunningPoint.LOADING_STARTED);
      }
    }
    const interval = window.setInterval(() => {
      if ($('body').html()) {
        window.clearInterval(interval);
        this.onDOMCreated();
      }
    }, 5);
  }

  onDOMCreated() {
    this.initPlugins(BasePlugin.RunningPoint.DOM_CREATED);
    $('body').bind('DOMSubtreeModified', () => {
      this.onDOMModified();
    });
  }

  onDOMModified() {
    this.initPlugins(BasePlugin.RunningPoint.DOM_MODIFIED);
  }

  initPlugins(runningPoint) {
    for (const plugin of this.plugins) {
      if (plugin.hasRunningPoint(runningPoint)) {
        plugin.runAction(runningPoint);
      }
    }
  }
}
