import arcgisUtils from 'esri/arcgis/utils';
import {getUrlParams} from 'utils/params';
import Deferred from 'dojo/Deferred';
import resources from 'js/resources';
import lang from 'dojo/_base/lang';
import {urls} from 'js/config';

export default {

  /**
  * Fetch application information from arcgis online and merge it in to our local resources
  * @return {promise} promise
  */
  getAppInfo: () => {
    let promise = new Deferred();
    const urlParams = getUrlParams(location.href);
    const appid = urlParams.appid;

    if (!appid) {
      promise.resolve(resources);
      return promise;
    }

    arcgisUtils.getItem(appid).then(res => {

      let agolValues = res.itemData && res.itemData.values,
          settings = {};

      //- If we dont have agol settings, save the defaults, else merge them in
      if (!agolValues) {
        promise.resolve(resources);
      } else {
        //- This will merge all the settings in, but some things need a little massaging
        lang.mixin(settings, resources, agolValues);

        //- LANGUAGE SETTINGS START
        settings.labels = {};
        settings.labels[settings.defaultLanguage] = {
          title: settings.defaultTitle,
          flagTitle: settings.flagTitle
        };
        //- parse map themes for default laguage if present
        let names = settings.mapThemes ? settings.mapThemes.split(',') : [];
        let appids = settings.mapThemeIds ? settings.mapThemeIds.split(',') : [];
        if (names.length === appids.length && names.length > 0) {
          settings.labels[settings.defaultLanguage].themes = [];
          names.forEach((name, i) => {
            settings.labels[settings.defaultLanguage].themes.push({
              label: name.trim(),
              url: `${urls.liveSite}?appid=${appids[i].trim()}`
            });
          });
        }
        //- Add content for second language if configured
        if (settings.useAdditionalLanguage) {
          settings.labels[settings.secondLanguage] = {
            title: settings.secondLanguageTitle,
            flagTitle: settings.secondLanguageFlagTitle
          };
          //- parse map themes for second laguage if present
          let secondNames = settings.mapThemesAlternate ? settings.mapThemesAlternate.split(',') : [];
          if (secondNames.length === appids.length && names.length > 0) {
            settings.labels[settings.secondLanguage].themes = [];
            secondNames.forEach((name, i) => {
              settings.labels[settings.secondLanguage].themes.push({
                label: name.trim(),
                url: `${urls.liveSite}?appid=${appids[i].trim()}`
              });
            });
          }
        }
        //- LANGUAGE SETTINGS END

        promise.resolve(settings);
      }

    }, err => {
      if (brApp.debug) { console.warn(`template.getAppInfo >> ${err.message}`); }
      promise.resolve();
    });

    return promise;
  }

};
