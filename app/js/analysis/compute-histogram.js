define([
  'esri/request',
  'root/analysis/analysisConfig'
], function (esriRequest, analysisConfig) {

  /**
  * Compute Histogram Wrapper
  * @param {string} url - Image Service Url
  * @param {object} content - Payload for the request
  * @return {deferred}
  */
  var computeHistogram = function computeHistogram (url, content) {
    if (content.geometry) { content.geometry = JSON.stringify(content.geometry); }
    if (content.renderingRule) { content.renderingRule = JSON.stringify(content.renderingRule); }
    if (content.mosaicRule) { content.mosaicRule = JSON.stringify(content.mosaicRule); }
    // Set some defaults
    content.geometryType = content.geometryType || 'esriGeometryPolygon';
    content.pixelSize = content.pixelSize || 100;
    content.f = content.f || 'json';

    return esriRequest({
      url: url + '/computeHistograms',
      callbackParamName: 'callback',
      content: content,
      handleAs: 'json',
      timeout: 30000
    }, { usePost: true });
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
      return computeHistogram(analysisConfig.imageServer, {
        renderingRule: Rules.getArithmeticRule(rasterA, rasterB, 3),
        geometry: geometry
      });
    }

  };

  return ComputeHistogram;

});
