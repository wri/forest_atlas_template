define([
  'esri/request',
  'dojo/Deferred',
  'root/analysis/rules',
  'root/analysis/analysisConfig'
], function (esriRequest, Deferred, Rules, analysisConfig) {

  var INVALID_IMAGE_SIZE = 'The requested image exceeds the size limit.';

  /**
  * check if the error is for an invalid image size so we can retry the request with a
  * larger pixel size
  */
  var errorIsInvalidImageSize = function errorIsInvalidImageSize (error) {
    return (
      error.code === 400 &&
      error.details &&
      error.details.length > 0 &&
      error.details[0] === INVALID_IMAGE_SIZE
    );
  };

  /**
  * adjust the results based on the pixel size, if the pixel size is the default value of 100
  * this returns the same value, if it is 500, it ocnverts the value to hectares
  */
  var pixelSizeMapper = function pixelSizeMapper (pixelSize) {
    return function (value) {
      return (value * Math.pow(pixelSize, 2)) / 10000;
    }
  };

  /**
  * Given a value, generate the input/output values necessary for the remap function
  * valid values are 1, 2, or 3
  */
  var getSlopeInputOutputValues = function (value) {
    return {
      input: value === 3 ? [0, 3, 3, 3] : [0, value, value, value, value + 1, 3],
      output: value === 3 ? [0, 1] : [0, 1, 0]
    }
  };

  /**
  * Compute Histogram Wrapper
  * @param {string} url - Image Service Url
  * @param {object} content - Payload for the request
  * @return {prmoise}
  */
  var computeHistogram = function computeHistogram (url, content, callback, errback) {
    if (content.geometry) { content.geometry = JSON.stringify(content.geometry); }
    if (content.renderingRule) { content.renderingRule = JSON.stringify(content.renderingRule); }
    if (content.mosaicRule) { content.mosaicRule = JSON.stringify(content.mosaicRule); }
    // Set some defaults
    content.geometryType = content.geometryType || 'esriGeometryPolygon';
    content.pixelSize = content.pixelSize || 100;
    content.f = content.f || 'json';

    esriRequest({
      url: url + '/computeHistograms',
      callbackParamName: 'callback',
      content: content,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: true }).then(
      callback,
      errback
    );
  };

  var ComputeHistogram = {

    multiplyRasters: function (rasterA, rasterB, geometry) {
      var promise = new Deferred();
      var pixelSize = 100;
      var success = function success (results) {
        if (results.histograms.length > 0 && pixelSize !== 100) {
          results.histograms[0].counts = results.histograms[0].counts.map(pixelSizeMapper(pixelSize));
        }
        promise.resolve(results);
      };
      //- If the error is for an image exceeding the size limit, try increasing the pixel size
      var failure = function failure (error) {
        if (errorIsInvalidImageSize(error) && pixelSize !== 500) {
          pixelSize = 500;
          computeHistogram(analysisConfig.imageServer, {
            renderingRule: Rules.getArithmeticRule(rasterA, rasterB, 3),
            geometry: geometry,
            pixelSize: pixelSize
          }, success, failure);
        } else {
          promise.reject(error);
        }
      };

      computeHistogram(analysisConfig.imageServer, {
        renderingRule: Rules.getArithmeticRule(rasterA, rasterB, 3),
        pixelSize: pixelSize,
        geometry: geometry
      }, success, failure);

      return promise;
    },

    /**
    * @param {number} slopeValue - 1,2 or 3 are valid values (<=30, 30-60, >60)
    * @param {string} slopeRaster - slope raster id
    * @param {string} restorationOptionsId - restoration options raster id
    * @param {Geometry} geometry - valid esri polygon
    */
    slopeBreakdownAnalysis: function (slopeValue, slopeRaster, restorationOptionsId, geometry) {
      var promise = new Deferred(),
          pixelSize = 100,
          renderingRule,
          values;

      values = getSlopeInputOutputValues(slopeValue);
      //- Get remap rule
      renderingRule = Rules.getRemapRule(slopeRaster, values.input, values.output);
      //- embed this as the first raster in arithmetic rule to get correct renderingRule
      renderingRule = Rules.getArithmeticRule(renderingRule, restorationOptionsId, 3);

      var success = function success (results) {
        if (results.histograms.length > 0 && pixelSize !== 100) {
          results.histograms[0].counts = results.histograms[0].counts.map(pixelSizeMapper(pixelSize));
        }
        promise.resolve(results);
      };

      var failure = function failure (error) {
        if (errorIsInvalidImageSize(error) && pixelSize !== 500) {
          pixelSize = 500;
          computeHistogram(analysisConfig.imageServer, {
            renderingRule: renderingRule,
            geometry: geometry,
            pixelSize: pixelSize
          }, success, failure);
        } else {
          promise.reject(error);
        }
      };

      computeHistogram(analysisConfig.imageServer, {
        renderingRule: renderingRule,
        pixelSize: pixelSize,
        geometry: geometry
      }, success, failure);

      return promise;
    }

  };

  return ComputeHistogram;

});
