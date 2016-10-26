import $ from 'jquery';
import 'select2/dist/js/select2.full';
import 'select2/dist/css/select2.css';
import SettingManager from './SettingManager';
import '../css/widgets.css';
import '../css/chrome_shared.css';

let settingManager;
window.onload = () => {
  settingManager = new SettingManager();
  $('#hide-users').change(() => {
    settingManager.settings.hiddenUsers = $('#hide-users').is(':checked');
    settingManager.save();
  });
  $('#hide-ads').change(() => {
    settingManager.settings.hideAds = $('#hide-ads').is(':checked');
    settingManager.save();
  });
  $('#colored-plus').change(() => {
    settingManager.settings.coloredPlus = $('#colored-plus').is(':checked');
    settingManager.save();
  });
  $('#ban-calka').change(() => {
    settingManager.settings.permDlaCalki = $('#ban-calka').is(':checked');
    settingManager.save();
  });
  $('#green-raja').change(() => {
    settingManager.settings.greenRaja = $('#green-raja').is(':checked');
    settingManager.save();
  });
  $('#bordo-kicioch').change(() => {
    settingManager.settings.bordoKicioch = $('#bordo-kicioch').is(':checked');
    settingManager.save();
  });
  $('#blacklist-words').change(() => {
    console.log($('#blacklist-words').val())
    if ($('#blacklist-words').val().length == 0) {
      settingManager.settings.blacklistedWords = [];
      settingManager.save();
      return;
    }
    const words = $('#blacklist-words').val();
    settingManager.settings.blacklistedWords = words;
    settingManager.save();
  });
  settingManager.read(() => {
    console.log(settingManager.settings);
    $('#hide-users').attr('checked', settingManager.settings.hiddenUsers);
    $('#hide-ads').attr('checked', settingManager.settings.hideAds);
    $('#colored-plus').attr('checked', settingManager.settings.coloredPlus);
    $('#ban-calka').attr('checked', settingManager.settings.permDlaCalki);
    $('#green-raja').attr('checked', settingManager.settings.greenRaja);
    $('#bordo-kicioch').attr('checked', settingManager.settings.bordoKicioch);
    $('#blacklist-words').select2({
      tags: settingManager.settings.blacklistedWords,
      tokenSeparators: [',',],
    });
    $('#blacklist-words').val(settingManager.settings.blacklistedWords);
    $('#blacklist-words').trigger('change');
  });
};
