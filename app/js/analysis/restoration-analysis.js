define([
  'root/analysis/compute-histogram',
  'root/analysis/analysisConfig',
  'root/analysis/ethiopiaConfig',
  'root/analysis/constants',
  'dojo/promise/all',
  'dojo/dom-class'
], function (computeHistogram, analysisConfig, ethiopiaConfig, KEYS, all, domClass) {

  return {

    performRestorationAnalysis: function (graphic, optionIndex) {
      var config = ethiopiaConfig.options[optionIndex];
      var geometry = graphic.geometry;
      var rasterId = config.id;
      var promises = {};

      promises[KEYS.TREE_COVER] = computeHistogram.multiplyRasters(analysisConfig[KEYS.TREE_COVER].id, rasterId, geometry);
      promises[KEYS.LAND_COVER] = computeHistogram.multiplyRasters(analysisConfig[KEYS.LAND_COVER].id, rasterId, geometry);
      promises[KEYS.POPULATION] = computeHistogram.multiplyRasters(analysisConfig[KEYS.POPULATION].id, rasterId, geometry);
      promises[KEYS.SLOPE] = computeHistogram.multiplyRasters(analysisConfig[KEYS.SLOPE].id, rasterId, geometry);

      console.log('Restoration analysis: ', config.name);

      all(promises).then(function (results) {

        domClass.add('analysis-loader', 'hidden');
        console.log(KEYS.TREE_COVER, results[KEYS.TREE_COVER]);
        console.log(KEYS.LAND_COVER, results[KEYS.LAND_COVER]);
        console.log(KEYS.POPULATION, results[KEYS.POPULATION]);
        console.log(KEYS.SLOPE, results[KEYS.SLOPE]);

      });
    }

  };

});
