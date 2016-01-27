define([
  'esri/request',
  'dojo/Deferred',
  'root/analysis/analysisConfig'
], function (esriRequest, Deferred, analysisConfig) {

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


  var Rules = {
    /**
    * @param {string} rasterA - raster id, ex. '$530'
    * @param {string} rasterB - raster id, ex. '$530'
    * @param {number} operation - Enum representing which arithmetic operation to perform
    * - Operation can be 1 (Add), 2 (Subtract), 3 (Multiply)
    * @return {object} valid rendering rule for computeHistograms call
    */
    getArithmeticRule: function (rasterA, rasterB, operation) {
      return {
        'rasterFunction':'Arithmetic',
        'rasterFunctionArguments': {
          'Raster': rasterA,
          'Raster2':rasterB,
          'Operation': operation
        }
      };
    }
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
        geometry: geometry,
        pixelSize: pixelSize
      }, success, failure);

      return promise;
    }

  };

  return ComputeHistogram;

});
