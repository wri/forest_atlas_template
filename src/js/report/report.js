import {getUrlParams} from 'utils/params';
import esriRequest from 'esri/request';
// import template from 'utils/template';
import Deferred from 'dojo/Deferred';
import request from 'utils/request';
import all from 'dojo/promise/all';

const getWebmapInfo = function getWebmapInfo (webmap) {
  return esriRequest({
    url: `http://www.arcgis.com/sharing/rest/content/items/${webmap}/data?f=json`,
    callbackParamName: 'callback'
  });
};

const getApplicationInfo = function getApplicationInfo (params) {
  const { webmap } = params;
  const promise = new Deferred();
  // //- Should probably get any needed params from map.html since it already has
  // //- appInfo, just pass everything needed, if the needed items are too much, then
  // //- fall back to this
  // if (appid && webmap) {
  //   all({
  //     app: template.getAppInfo(appid),
  //     webmap: getWebmapInfo(webmap)
  //   }).then(promise.resolve);
  // } else if (webmap) {
  if (webmap) {
    getWebmapInfo(webmap).then((results) => {
      promise.resolve({ webmap: results });
    });
  } else {
    promise.reject({
      error: new Error('Missing Webmap Id. We need atleast one.')
    });
  }

  return promise;
};

const getLocalFeature = function getLocalFeature (customgeo) {
  if (localStorage) {
    return JSON.parse(localStorage.getItem('custom-feature'));
  } else if (customgeo) {
    return JSON.parse(customgeo);
  } else {
    return undefined;
  }
};

const getFeature = function getFeature (params) {
  const { idvalue, service, layerid, customgeo, customtitle } = params;
  const localFeature = getLocalFeature(customgeo);
  const promise = new Deferred();
  if (idvalue && service && layerid) {
    //- This assumes id field is object id, if thats not the case, will need a different request method
    request.queryTaskById(`${service}\\${layerid}`, idvalue).then((results) => {
      let feature = results.features[0];
      if (feature) {
        promise.resolve({ attributes: feature.attributes, geometry: feature.geometry, title: results.displayFieldName });
      } else {
        promise.reject({ error: new Error('Unable to query for feature. Check the configuration.') });
      }
    });
  } else if (localFeature) {
    promise.resolve({ attributes: localFeature.attributes, geometry: localFeature.geometry, title: customtitle });
  } else {
    promise.reject({ error: new Error('Unable to retrieve feature.') });
  }

  return promise;
};

const getAnalysis = function getAnalysis () {
  console.log('getAnalysis');
};

const createMap = function createMap () {
  console.log('createMap');
};

const renderCharts = function renderCharts () {
  console.log('renderCharts');
};

export default {

  run () {
    //- Get params necessary for the report
    const params = getUrlParams(location.href);

    all({
      feature: getFeature(params),
      info: getApplicationInfo(params)
    }).always((response) => {
      //- Bail if anything failed
      if (response.error) {
        throw response.error;
      }

      console.log(response);
      getAnalysis();
      createMap();
      renderCharts();
    });
  }

};
