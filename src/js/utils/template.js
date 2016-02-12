import arcgisUtils from 'esri/arcgis/utils';
import {getUrlParams} from 'utils/params';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import resources from 'resources';
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

      let agolValues = res.itemData && res.itemData.values;

      //- If we dont have agol settings, save the defaults, else merge them in
      if (!agolValues) {
        promise.resolve(resources);
      } else {
        //- This will merge all the settings in, but some things need a little massaging
        lang.mixin(resources, agolValues);

        //- LANGUAGE SETTINGS START
        resources.labels = {};
        resources.labels[resources.defaultLanguage] = {
          title: resources.defaultTitle,
          flagTitle: resources.flagTitle
        };
        //- parse map themes for default laguage if present
        let names = resources.mapThemes ? resources.mapThemes.split(',') : [];
        let appids = resources.mapThemeIds ? resources.mapThemeIds.split(',') : [];
        if (names.length === appids.length && names.length > 0) {
          resources.labels[resources.defaultLanguage].themes = [];
          names.forEach((name, i) => {
            resources.labels[resources.defaultLanguage].themes.push({
              label: name.trim(),
              url: `${urls.liveSite}?appid=${appids[i].trim()}`
            });
          });
        }
        //- Add content for second language if configured
        if (resources.useAdditionalLanguage) {
          resources.labels[resources.secondLanguage] = {
            title: resources.secondLanguageTitle,
            flagTitle: resources.secondLanguageFlagTitle
          };
          //- parse map themes for second laguage if present
          let secondNames = resources.mapThemesAlternate ? resources.mapThemesAlternate.split(',') : [];
          if (secondNames.length === appids.length && names.length > 0) {
            resources.labels[resources.secondLanguage].themes = [];
            secondNames.forEach((name, i) => {
              resources.labels[resources.secondLanguage].themes.push({
                label: name.trim(),
                url: `${urls.liveSite}?appid=${appids[i].trim()}`
              });
            });
          }
        }
        //- LANGUAGE SETTINGS END

        //- TODO: Remove Layers from resources.layers if configured

        promise.resolve(resources);
      }

    }, err => {
      if (brApp.debug) { console.warn(`template.getAppInfo >> ${err.message}`); }
      promise.resolve();
    });

    return promise;
  }

};
