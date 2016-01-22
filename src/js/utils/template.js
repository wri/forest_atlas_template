import arcgisUtils from 'esri/arcgis/utils';
import {getUrlParams} from 'utils/params';
import Deferred from 'dojo/Deferred';
import resources from 'js/resources';
import lang from 'dojo/_base/lang';


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
        lang.mixin(settings, resources, agolValues);
        promise.resolve(settings);
      }

    }, err => {
      if (brApp.debug) { console.warn(`template.getAppInfo >> ${err.message}`); }
      promise.resolve();
    });

    return promise;
  }

};
