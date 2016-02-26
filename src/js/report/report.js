import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import ImageParameters from 'esri/layers/ImageParameters';
import analysisKeys from 'constants/AnalysisConstants';
import performAnalysis from 'utils/performAnalysis';
import Polygon from 'esri/geometry/Polygon';
import {getUrlParams} from 'utils/params';
import esriRequest from 'esri/request';
// import template from 'utils/template';
import Deferred from 'dojo/Deferred';
import symbols from 'utils/symbols';
import request from 'utils/request';
import all from 'dojo/promise/all';
import Graphic from 'esri/graphic';
import Map from 'esri/map';

let map;

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

const getLocalFeature = function getLocalFeature () {
  return localStorage ? JSON.parse(localStorage.getItem('custom-feature')) : undefined;
};

const getFeature = function getFeature (params) {
  const { idvalue, service, layerid } = params;
  const localFeature = getLocalFeature();
  const promise = new Deferred();
  if (idvalue && service && layerid) {
    //- This assumes id field is object id, if thats not the case, will need a different request method
    request.queryTaskById(`${service}\\${layerid}`, idvalue).then((results) => {
      let feature = results.features[0];
      if (feature) {
        promise.resolve({
          attributes: feature.attributes,
          geometry: feature.geometry,
          title: feature.attributes[results.displayFieldName]
        });
      } else {
        promise.reject({ error: new Error('Unable to query for feature. Check the configuration.') });
      }
    });
  } else if (localFeature) {
    promise.resolve({
      attributes: localFeature.attributes,
      geometry: localFeature.geometry,
      title: localFeature.title,
      isCustom: true
    });
  } else {
    promise.reject({ error: new Error('Unable to retrieve feature.') });
  }

  return promise;
};

const createMap = function createMap (params) {
  const { basemap } = params;

  map = new Map('map', {
    center: [-8.086, 21.085],
    basemap: basemap || 'topo',
    slider: false,
    logo: false,
    zoom: 2
  });

  map.on('load', () => {
		map.disableKeyboardNavigation();
		map.disableMapNavigation();
		map.disableRubberBandZoom();
		map.disablePan();
	});
};

const generateRow = function generateRows (fieldName, fieldValue) {
  const row = document.createElement('dl');
  const label = document.createElement('dt');
  const value = document.createElement('dd');
  label.innerHTML = fieldName;
  value.innerHTML = fieldValue;
  row.appendChild(label);
  row.appendChild(value);
  return row;
};

/**
* Add a graphic to the map and set the map extent
* Add layers to the map
*/
const setupMap = function setupMap (params, feature) {
  const { service, visibleLayers } = params;
  //- Add a graphic to the map
  const graphic = new Graphic(new Polygon(feature.geometry), symbols.getCustomSymbol());
  map.setExtent(graphic.geometry.getExtent(), true);
  map.graphics.add(graphic);
  //- Add the layer to the map
  //- TODO: Old method adds a dynamic layer, this needs to be able to handle all layer types eventually,
  //- Update the layer factory to be more flexible
  if (service) {
    const imageParameters = new ImageParameters();
    imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
    imageParameters.layerIds = [visibleLayers];
    imageParameters.format = 'png32';

    const currentLayer = new DynamicLayer(service, {
      imageParameters: imageParameters,
      opacity: 0.8
    });

    map.addLayer(currentLayer);
  }

};

const addTitleAndAttributes = function addTitleAndAttributes (params, feature, webmap) {
  const { layerName, layerid } = params;
  const { operationalLayers } = webmap;
  //- Generate the attributes listing and set page title
  if (feature.isCustom) {
    document.getElementById('feature-title').innerHTML = feature.title;
  } else {
    const operationalLayer = operationalLayers.filter((layer) => layer.id === layerName)[0];
    //- layerid is a string but layer.id is a number, convert layerid to int
    const activeLayer = operationalLayer.layers.filter((layer) => layer.id === +layerid)[0];
    if (activeLayer) {
      const title = activeLayer.popupInfo.title.replace(/{.*}/, feature.title);
      //- generate rows for each field that is visible in popup for the configured layer
      const fragment = document.createDocumentFragment();
      activeLayer.popupInfo.fieldInfos.filter((fieldInfo) => {
        return fieldInfo.visible;
      }).forEach((fieldInfo) => {
        fragment.appendChild(generateRow(
          fieldInfo.label,
          feature.attributes[fieldInfo.fieldName]
        ));
      });
      //- Add title to the page
      document.getElementById('feature-title').innerHTML = title;
      //- Add the rows to the DOM
      document.getElementById('popup-content').appendChild(fragment);
    }
  }
};

const runAnalysis = function runAnalysis (params, feature) {
  let { tcd } = params;
  //- Loss/Gain Analysis
  performAnalysis(analysisKeys.TC_LOSS_GAIN, feature.geometry, tcd).then((results) => {
    console.log(results);
  });
  //- Land Cover with Loss Analysis
  performAnalysis(analysisKeys.LC_LOSS, feature.geometry, tcd).then((results) => {
    console.log(results);
  });
  //- Carbon Stocks with Loss Analysis
  performAnalysis(analysisKeys.BIO_LOSS, feature.geometry, tcd).then((results) => {
    console.log(results);
  });
  //- Intact Forest with Loss Analysis
  performAnalysis(analysisKeys.INTACT_LOSS, feature.geometry, tcd).then((results) => {
    console.log(results);
  });
  //- Fires Analysis
  performAnalysis(analysisKeys.FIRES, feature.geometry, tcd).then((results) => {
    console.log(results);
  });
  //- Land Cover Composition Analysis
  performAnalysis(analysisKeys.LCC, feature.geometry, tcd).then((results) => {
    console.log(results);
  });
};

export default {

  /**
  * TODO: Add documentation to README.md
  * TEST URL:
  * http://localhost:3000/report.html?idvalue=8&service=http%3A%2F%2Fgis-forestatlas.wri.org%2Farcgis%2Frest%2Fservices%2FGNQ%2FGNQ_online_en%2FMapServer&layerid=6&webmap=5e094aba9465448186287c2300ef879e&basemap=topo&visibleLayers=0%2C1%2C2%2C3%2C4%2C5%2C6&layerName=GNQ_online_en_474&tcd=30
  * Required URL Params
  ** webmap or appid
  * Other Params needed
  ** layerid - layer number in dynamic service
  ** service - map service of selected feature
  ** idvalue - objectid of the selected feature
  ** layerName - id of the layer from AGOL, I need this to add attributes
  ** basemap - basemap to use, default is topo
  ** visibleLayers - visible layers of dynamic layer selected feature belongs too
  ** tcd - tree cover density
  * Params in local storage
  ** custom-feature - { geometry: esriGeometry, attributes: object, title: string }
  */

  run () {
    //- Get params necessary for the report
    const params = getUrlParams(location.href);
    //- Create the map as soon as possible
    createMap(params);
    //- Get all the necessary info
    all({
      feature: getFeature(params),
      info: getApplicationInfo(params)
    }).always((response) => {
      //- Bail if anything failed
      if (response.error) {
        throw response.error;
      }

      const { feature, info } = response;

      if (map.loaded) {
        setupMap(params, feature);
      } else {
        map.on('load', () => {
          setupMap(params, feature);
        });
      }

      addTitleAndAttributes(params, feature, info.webmap);
      runAnalysis(params, feature);
    });
  }

};
