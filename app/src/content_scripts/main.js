/**
 * Created by johniak on 10/11/14.
 */
import PluginsManager from './PluginsManager';

chrome.runtime.sendMessage({ method: 'getSettings' }, (response) => {
  const pluginsManager = new PluginsManager(response);
  pluginsManager.initialize();
});
