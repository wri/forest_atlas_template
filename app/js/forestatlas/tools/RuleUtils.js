define([
  'toolsmodel',
  'toolsconfig',
  'esri/urlUtils'
], function (ToolsModel, ToolsConfig, urlUtils) {
  'use strict';

  // Just in case
  ToolsConfig.initialize();

  var analysisConfig = ToolsConfig.getConfig().analysisConfig;
  var Model = ToolsModel.getVM();

  return {

    /**
    * Create a rendering rule for Total Loss or Total Gain that incorporates varying Tree Cover Density ranges
    * @param {string} rasterId - Raster ID of the layer to analyze ($521 for Loss or $527 for Gain)
    * @param {array} range - Tree Cover Density Canopy Range currently applied to the map and used for analysis, ex: [0, 10, 10, 101]
    * @return {string} Stringified raster function to add to the request for analysis
    */
    getArithmeticRuleWithDensity: function (rasterId, range) {
      var rasterFunction = analysisConfig.lossGainWithDensityRasterFunction;
      rasterFunction.rasterFunctionArguments.Raster2 = rasterId;
      rasterFunction.rasterFunctionArguments.Raster.rasterFunctionArguments.InputRanges = range;
      return JSON.stringify(rasterFunction);
    },

    /**
    * Get an array representing the current Tree Cover Density set in the application
    * @return {array} Array with 4 values representing the range, can be directly passed into getArithmeticRuleWithDensity
    * Depending on the state of the application, the Density value may be in the URL, so check that as a backup if model does not exist
    */
    getCurrentDensityRange: function () {
      var getDensityFromUrl = function getDensityFromUrl () {
        var urlParams = urlUtils.urlToObject(location.href);
        var tcd = urlParams && urlParams.query && urlParams.query.tcd;
        return tcd ? parseInt(tcd) : 30;
      };

      var densityValue = Model ? Model.tcdSelectorValue() : getDensityFromUrl();
      return [0 , densityValue, densityValue, 101];
    }

  };

});
