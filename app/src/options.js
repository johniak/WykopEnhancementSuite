import $ from 'jquery';
import 'select2/dist/js/select2.full';
import 'select2/dist/css/select2.css';
import SettingManager from './SettingManager';

let settingManager;

function saveBooleanSetting(setting) {
  const { id, field } = setting;
  const checkbox = $(`#${id}`);
  checkbox.change(() => {
    settingManager.settings[field] = checkbox.is(':checked');
    settingManager.save();
  });
}

const settings = [
  { id: 'hide-users', field: 'hiddenUsers' },
  { id: 'hide-ads', field: 'hideAds' },
  { id: 'colored-plus', field: 'coloredPlus' },
  { id: 'ban-calka', field: 'permDlaCalki' },
  { id: 'green-raja', field: 'greenRaja' },
  { id: 'bordo-kicioch', field: 'bordoKicioch' },
  { id: 'nsfwSwitch', field: 'nsfwSwitch' },
  { id: 'expandableComments', field: 'expandableComments' },
  { id: 'fixedTags', field: 'fixedTags' },
];

window.onload = () => {
  settingManager = new SettingManager();
  for (const setting of settings) {
    saveBooleanSetting(setting);
  }
  $('#blacklist-words').change(() => {
    if ($('#blacklist-words').val().length === 0) {
      settingManager.settings.blacklistedWords = [];
      settingManager.save();
      return;
    }
    const words = $('#blacklist-words').val();
    settingManager.settings.blacklistedWords = words;
    settingManager.save();
  });
  settingManager.read(() => {
    for (const setting of settings) {
      $(`#${setting.id}`).attr('checked', settingManager.settings[setting.field]);
    }
    $('#hide-ads').attr('checked', settingManager.settings.hideAds);
    $('#colored-plus').attr('checked', settingManager.settings.coloredPlus);
    $('#ban-calka').attr('checked', settingManager.settings.permDlaCalki);
    $('#green-raja').attr('checked', settingManager.settings.greenRaja);
    $('#bordo-kicioch').attr('checked', settingManager.settings.bordoKicioch);
    $('#blacklist-words').select2({
      tags: settingManager.settings.blacklistedWords,
      tokenSeparators: [','],
    });
    $('#blacklist-words').val(settingManager.settings.blacklistedWords);
    $('#blacklist-words').trigger('change');
  });
};
