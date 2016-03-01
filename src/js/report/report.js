import DynamicLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import ImageParameters from 'esri/layers/ImageParameters';
import analysisKeys from 'constants/AnalysisConstants';
import performAnalysis from 'utils/performAnalysis';
import Polygon from 'esri/geometry/Polygon';
import {getUrlParams} from 'utils/params';
import {analysisConfig} from 'js/config';
import keys from 'constants/StringKeys';
import esriRequest from 'esri/request';
// import template from 'utils/template';
import Deferred from 'dojo/Deferred';
import symbols from 'utils/symbols';
import request from 'utils/request';
import all from 'dojo/promise/all';
import Graphic from 'esri/graphic';
import charts from 'utils/charts';
import text from 'js/languages';
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
      if (brApp.debug) { console.log('getApplicationInfo.webmap: ', results); }
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
    request.queryTaskById(`${service}//${layerid}`, idvalue).then((results) => {
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
      if (brApp.debug) { console.log('getFeature: ', results); }
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
    if (visibleLayers) {
      imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
      imageParameters.layerIds = [visibleLayers];
    }
    imageParameters.format = 'png32';

    const currentLayer = new DynamicLayer(service, {
      imageParameters: imageParameters,
      opacity: 0.8
    });

    map.addLayer(currentLayer);
  }

};

const addTitleAndAttributes = function addTitleAndAttributes (params, featureInfo, webmap) {
  const { layerName, layerid } = params;
  const { operationalLayers } = webmap;
  //- Generate the attributes listing and set page title
  if (featureInfo.isCustom) {
    document.getElementById('feature-title').innerHTML = featureInfo.title;
  } else {
    const operationalLayer = operationalLayers.filter((layer) => layerName.search(layer.id) > -1)[0];
    //- layerid is a string but layer.id is a number, convert layerid to int
    const activeLayer = operationalLayer.layers.filter((layer) => layer.id === +layerid)[0];
    if (activeLayer) {
      const title = activeLayer.popupInfo.title.replace(/{.*}/, featureInfo.title || 'N/A');
      //- generate rows for each field that is visible in popup for the configured layer
      const fragment = document.createDocumentFragment();
      activeLayer.popupInfo.fieldInfos.filter((fieldInfo) => {
        return fieldInfo.visible;
      }).forEach((fieldInfo) => {
        fragment.appendChild(generateRow(
          fieldInfo.label,
          featureInfo.attributes[fieldInfo.fieldName]
        ));
      });
      if (brApp.debug) { console.log('Popup info: ', activeLayer.popupInfo); }
      //- Add title to the page
      document.getElementById('feature-title').innerHTML = title;
      //- Add the rows to the DOM
      document.getElementById('popup-content').appendChild(fragment);
    }
  }
};

const runAnalysis = function runAnalysis (params, feature) {
  const lossLabels = analysisConfig[analysisKeys.TC_LOSS].labels;
  const { tcd, lang } = params;
  //- Loss/Gain Analysis
  performAnalysis(analysisKeys.TC_LOSS_GAIN, feature.geometry, tcd).then((results) => {
    const totalLoss = results.lossCounts.reduce((a, b) => a + b, 0);
    const totalGain = results.gainCounts.reduce((a, b) => a + b, 0);
    //- Generate chart for Tree Cover Loss
    const name = text[lang][keys.ANALYSIS_TC_CHART_NAME];
    const colors = analysisConfig[analysisKeys.TC_LOSS].colors;
    const tcLossNode = document.getElementById('tc-loss');
    const series = [{ name: name, data: results.lossCounts }];
    charts.makeSimpleBarChart(tcLossNode, lossLabels, colors, series);
    //- Generate content for Loss and Gain Badges
    //- Loss
    document.querySelector('#total-loss-badge .results__loss-gain--label').innerHTML = text[lang][keys.ANALYSIS_TOTAL_LOSS_LABEL];
    document.querySelector('#total-loss-badge .results__loss-gain--range').innerHTML = text[lang][keys.ANALYSIS_TOTAL_LOSS_RANGE];
    document.querySelector('.results__loss--count').innerHTML = totalLoss;
    document.getElementById('total-loss-badge').classList.remove('hidden');
    //- Gain
    document.querySelector('#total-gain-badge .results__loss-gain--label').innerHTML = text[lang][keys.ANALYSIS_TOTAL_GAIN_LABEL];
    document.querySelector('#total-gain-badge .results__loss-gain--range').innerHTML = text[lang][keys.ANALYSIS_TOTAL_GAIN_RANGE];
    document.querySelector('.results__gain--count').innerHTML = totalGain;
    document.getElementById('total-gain-badge').classList.remove('hidden');
  });
  //- Land Cover with Loss Analysis
  performAnalysis(analysisKeys.LC_LOSS, feature.geometry, tcd).then((results) => {
    const configuredColors = analysisConfig[analysisKeys.LC_LOSS].colors;
    const labels = text[lang][keys.ANALYSIS_LC_LABELS];
    const node = document.getElementById('lc-loss');
    const { counts, encoder } = results;
    const Xs = encoder.A;
    const Ys = encoder.B;

    const chartInfo = charts.formatSeriesWithEncoder({
      colors: configuredColors,
      encoder: encoder,
      counts: counts,
      labels: labels,
      Xs: Xs,
      Ys: Ys
    });

    charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
  });
  //- Carbon Stocks with Loss Analysis
  performAnalysis(analysisKeys.BIO_LOSS, feature.geometry, tcd).then((results) => {
    const { labels, colors } = analysisConfig[analysisKeys.BIO_LOSS];
    const node = document.getElementById('bio-loss');
    const { counts, encoder } = results;
    const Xs = encoder.A;
    const Ys = encoder.B;

    const chartInfo = charts.formatSeriesWithEncoder({
      encoder: encoder,
      counts: counts,
      labels: labels,
      colors: colors,
      Xs: Xs,
      Ys: Ys
    });

    charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);

  });
  //- Intact Forest with Loss Analysis
  performAnalysis(analysisKeys.INTACT_LOSS, feature.geometry, tcd).then((results) => {
    const configuredColors = analysisConfig[analysisKeys.INTACT_LOSS].colors;
    const labels = text[lang][keys.ANALYSIS_IFL_LABELS];
    const node = document.getElementById('intact-loss');
    const { counts, encoder } = results;
    const Xs = encoder.A;
    const Ys = encoder.B;

    const chartInfo = charts.formatSeriesWithEncoder({
      colors: configuredColors,
      encoder: encoder,
      counts: counts,
      labels: labels,
      isSimple: true,
      Xs: Xs,
      Ys: Ys
    });

    charts.makeTotalLossBarChart(node, lossLabels, chartInfo.colors, chartInfo.series);
  });
  //- Land Cover Composition Analysis
  performAnalysis(analysisKeys.LCC, feature.geometry, tcd).then((results) => {
    const node = document.getElementById('lc-composition');
    const series = charts.formatCompositionAnalysis({
      colors: analysisConfig[analysisKeys.LCC].colors,
      name: text[lang][keys.ANALYSIS_LCC_CHART_NAME],
      labels: text[lang][keys.ANALYSIS_LC_LABELS],
      counts: results.counts
    });

    charts.makeCompositionPieChart(node, series);
  });
  //- Fires Analysis
  performAnalysis(analysisKeys.FIRES, feature.geometry, tcd).then((results) => {
    document.querySelector('.results__fires-pre').innerHTML = text[lang][keys.ANALYSIS_FIRES_PRE];
    document.querySelector('.results__fires-count').innerHTML = results.fireCount;
    document.querySelector('.results__fires-active').innerHTML = text[lang][keys.ANALYSIS_FIRES_ACTIVE];
    document.querySelector('.results__fires-post').innerHTML = text[lang][keys.ANALYSIS_FIRES_POST];
    document.getElementById('fires-badge').classList.remove('hidden');
  });
};

export default {

  /**
  * TODO: Add documentation to README.md
  * TEST URL:
  * http://localhost:3000/report.html?idvalue=8&service=http%3A%2F%2Fgis-forestatlas.wri.org%2Farcgis%2Frest%2Fservices%2FGNQ%2FGNQ_online_en%2FMapServer&layerid=6&webmap=5e094aba9465448186287c2300ef879e&basemap=topo&visibleLayers=0%2C1%2C2%2C3%2C4%2C5%2C6&layerName=GNQ_online_en_474&tcd=30&lang=en
  * Required URL Params
  ** webmap or appid
  * Other Params needed
  ** layerid - layer number in dynamic service
  ** service - map service of selected feature
  ** idvalue - objectid of the selected feature
  ** layerName - id of the layer from AGOL, I need this to add attributes
  ** basemap - basemap to use, default is topo
  ** visibleLayers - visible layers of dynamic layer selected feature belongs too, default is all
  ** tcd - tree cover density
  ** lang - current app language
  * Params in local storage
  ** custom-feature - { geometry: esriGeometry, attributes: object, title: string }
  */

  /**
  * Example call from the app
  appUtils.generateReport({
    selectedFeature: selectedFeature,
    webmap: settings.webmap,
    canopyDensity: 30,
    lang: language
  });
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

      //- Add Popup Info Now
      addTitleAndAttributes(params, feature, info.webmap);

      //- Need the map to be loaded to add graphics
      if (map.loaded) {
        setupMap(params, feature);
      } else {
        map.on('load', () => {
          setupMap(params, feature);
        });
      }

      //- Make sure highcharts is loaded before using it
      if (window.highchartsPromise.isResolved()) {
        runAnalysis(params, feature);
      } else {
        window.highchartsPromise.then(() => {
          runAnalysis(params, feature);
        });
      }
    });
  }

};
