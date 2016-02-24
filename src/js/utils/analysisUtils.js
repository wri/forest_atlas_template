import QueryTask from 'esri/tasks/QueryTask';
import {analysisConfig} from 'js/config';
import esriRequest from 'esri/request';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import all from 'dojo/promise/all';

const INVALID_IMAGE_SIZE = 'The requested image exceeds the size limit.';
const OP_MULTIPLY = 3;

/**
* check if the error is for an invalid image size so we can retry the request with a
* larger pixel size
*/
const errorIsInvalidImageSize = function errorIsInvalidImageSize (error) {
  return (
    error.code === 400 &&
    error.details &&
    error.details.length > 0 &&
    error.details[0] === INVALID_IMAGE_SIZE
  );
};

/**
* Given a value, generate the input/output values necessary for the remap function
* valid values are 1, 2, or 3
*/
const getSlopeInputOutputValues = function (value) {
  return {
    input: value === 3 ? [0, 3, 3, 3] : [0, value, value, value, value + 1, 3],
    output: value === 3 ? [0, 1] : [0, 1, 0]
  };
};

/**
* Group of formatting functions for results
*/
const formatters = {
  fires: (response) => {
    return {
      fireCount: response.features ? response.features.length : 0
    };
  },
  getCounts: (response, pixelSize) => {
    let {histograms} = response;
    let counts = histograms && histograms.length === 1 ? histograms[0].counts : [];
    //- Normalize the results based on the pixelSize, then remove the first count as it is nulls
    return {
      counts: counts.map((value) => ((value * Math.pow(pixelSize, 2) / 10000))).slice(1)
    };
  }
};

/**
* Group of functions for generating rendering and mosaic rules
*/
const rules = {
  mosaicRule: (raster) => {
    return {
      'mosaicMethod': 'esriMosaicLockRaster',
      'mosaicOperation': 'MT_FIRST',
      'lockRasterIds': [raster],
      'ascending': true
    };
  },
  arithmetic: (rasterA, rasterB, operation) => {
    return {
      'rasterFunction': 'Arithmetic',
      'rasterFunctionArguments': {
        'Raster': rasterA,
        'Raster2': rasterB,
        'Operation': operation
      }
    };
  },
  remap: (raster, inputRange, outputValues) => {
    return {
      'rasterFunction': 'Remap',
      'rasterFunctionArguments': {
        'InputRanges': inputRange,
        'OutputValues': outputValues,
        'Raster': raster,
        'AllowUnmatched': false
      }
    };
  }
};

const computeHistogram = (url, content, success, fail) => {
  //- Format the content properly
  if (content.geometry) { content.geometry = JSON.stringify(content.geometry); }
  if (content.renderingRule) { content.renderingRule = JSON.stringify(content.renderingRule); }
  if (content.mosaicRule) { content.mosaicRule = JSON.stringify(content.mosaicRule); }
  //- Set some defaults if they are not set
  content.geometryType = content.goemetryType || 'esriGeometryPolygon';
  content.pixelSize = content.pixelSize || 100;
  content.f = content.f || 'json';

  if (success && fail) {
    esriRequest({
      url: `${url}/computeHistograms`,
      callbackParamName: 'callback',
      content: content,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: true}).then(success, fail);
  } else {
    return esriRequest({
      url: `${url}/computeHistograms`,
      callbackParamName: 'callback',
      content: content,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: true});
  }
};

export default {
  /**
  * Fetch and format fire results
  */
  getFireCount: (url, feature) => {
    const queryTask = new QueryTask(url);
    const promise = new Deferred();
    let query = new Query();
    query.geometry = feature.geometry;
    query.returnGeometry = false;
    query.outFields = [''];
    query.where = '1 = 1';
    queryTask.execute(query).then(function (response) {
      promise.resolve(formatters.fires(response));
    }, (error) => {
      promise.resolve(formatters.fires(error));
    });
    return promise;
  },

  getCountsWithDensity: (rasterId, feature, canopyDensity) => {
    const promise = new Deferred();
    const tcd = analysisConfig.tcd;
    const densityRule = rules.remap(tcd.id, tcd.inputRanges(canopyDensity), tcd.outputValues);
    const {imageService, pixelSize} = analysisConfig;

    let content = {
      pixelSize: pixelSize,
      geometry: feature.geometry,
      renderingRule: rules.arithmetic(densityRule, rasterId, OP_MULTIPLY)
    };

    const success = (response) => {
      promise.resolve(formatters.getCounts(response, content.pixelSize));
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(imageService, content, success, failure);
      } else {
        promise.resolve(error);
      }
    };

    computeHistogram(imageService, content, success, failure);
    return promise;
  },

  getMosaic: (lockRaster, feature) => {
    const promise = new Deferred();
    const {imageService, pixelSize} = analysisConfig;
    let content = {
      pixelSize: pixelSize,
      geometry: feature.geometry,
      mosaicRule: rules.mosaicRule(lockRaster)
    };

    const success = (response) => {
      promise.resolve(formatters.getCounts(response, content.pixelSize));
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(imageService, content, success, failure);
      } else {
        promise.resolve(error);
      }
    };

    computeHistogram(imageService, content, success, failure);
    return promise;
  },

  getCrossedWithLoss: () => {

  },

  getSlope: (url, slopeValue, raster, restorationId, feature) => {
    const values = getSlopeInputOutputValues(slopeValue);
    const {pixelSize} = analysisConfig;
    const promise = new Deferred();
    //- Get rendering rule
    const renderingRule = rules.arithmetic(
      rules.remap(raster, values.input, values.output),
      restorationId,
      OP_MULTIPLY
    );

    let content = {
      pixelSize: pixelSize,
      geometry: feature.geometry,
      renderingRule: renderingRule
    };

    const success = (response) => {
      //- get the counts and remove the no data value, which is the first value
      let counts = formatters.getCounts(response, content.pixelSize).counts;
      promise.resolve({
        counts: counts.slice(1)
      });
    };

    const failure = (error) => {
      if (errorIsInvalidImageSize(error) && content.pixelSize !== 500) {
        content.pixelSize = 500;
        computeHistogram(url, content, success, failure);
      } else {
        promise.resolve(error);
      }
    };

    computeHistogram(url, content, success, failure);
    return promise;
  },

  getRestoration: (url, rasterId, feature) => {
    const promise = new Deferred();
    const {pixelSize, restoration} = analysisConfig;
    const content = { pixelSize: pixelSize, geometry: feature.geometry };
    //- Generate rendering rules for all the options
    const lcContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.landCoverId, rasterId, OP_MULTIPLY)});
    const tcContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.treeCoverId, rasterId, OP_MULTIPLY)});
    const popContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.populationId, rasterId, OP_MULTIPLY)});
    const slopeContent = lang.delegate(content, {renderingRule: rules.arithmetic(restoration.slopeId, rasterId, OP_MULTIPLY)});

    all([
      computeHistogram(url, lcContent),
      computeHistogram(url, tcContent),
      computeHistogram(url, popContent),
      computeHistogram(url, slopeContent)
    ]).always((results) => {
      //- getCounts slices the first value, I need to slice the no data value as well
      if (!results.error) {
        promise.resolve({
          landCover: formatters.getCounts(results[0], content.pixelSize).counts,
          treeCover: formatters.getCounts(results[1], content.pixelSize).counts,
          population: formatters.getCounts(results[2], content.pixelSize).counts,
          slope: formatters.getCounts(results[3], content.pixelSize).counts
        });
      } else {
        promise.resolve(results);
      }
    });

    return promise;
  }

};
