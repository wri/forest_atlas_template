define([
  "toolsmodel",
  "toolsconfig",
  "esri/urlUtils",
  "dojo/_base/lang"
], function (ToolsModel, ToolsConfig, urlUtils, lang) {
  "use strict";

  // Just in case, sometimes breaks if this is not initialized
  ToolsConfig.initialize();

  var analysisConfig = ToolsConfig.getConfig().analysisConfig;
  var Model = ToolsModel.getVM();

  /* Helper Function to get Density Value from URL if present or return a default of 30 */
  var getDensityFromUrl = function getDensityFromUrl () {
    var urlParams = urlUtils.urlToObject(location.href);
    var tcd = urlParams && urlParams.query && urlParams.query.tcd;
    return tcd ? parseInt(tcd) : 30;
  };

  var utils = {

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
      var densityValue = Model ? Model.tcdSelectorValue() : getDensityFromUrl();
      return [0, densityValue, densityValue, 101];
    },

    /**
    * Wrap rendering rule in Density analysis, may not work with all rules, For Total Loss or Total Gain, use getArithmeticRuleWithDensity
    * @param {object} renderingRule - Rendering Rule to be mixed in with the Density Rule
    */
    addRenderingRuleToDensity: function (renderingRule) {
      var densityRule = lang.clone(analysisConfig.treeCoverDensityRule),
          rasterId = analysisConfig.treeDensity.rasterId,
          range = this.getCurrentDensityRange();

      densityRule.rasterFunctionArguments.Raster.rasterFunctionArguments.Raster = rasterId;
      densityRule.rasterFunctionArguments.Raster.rasterFunctionArguments.InputRanges = range;
      // Set rendering rule, it is a string so we need to parse it to prevent issues with escape characters
      densityRule.rasterFunctionArguments.Raster2 = JSON.parse(renderingRule);
      densityRule.rasterFunctionArguments.Raster2.outputPixelType = "U8";
      return JSON.stringify(densityRule);
    }

  };

  return utils;

});
