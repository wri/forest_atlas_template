define([
  'root/analysis/restoration-charts',
  'root/analysis/compute-histogram',
  'root/analysis/analysisConfig',
  'root/analysis/ethiopiaConfig',
  'root/analysis/constants',
  'dojo/promise/all',
  'dojo/dom-class'
], function (charts, computeHistogram, analysisConfig, ethiopiaConfig, KEYS, all, domClass) {

  /**
  * parse the counts from the histograms, remove the first value from the counts
  * array as it contains the null?( or unmatched) values from the request
  */
  var getCounts = function getCounts (histograms) {
    return histograms.length === 0 ? histograms : histograms[0].counts.slice(1);
  };

  /**
  * computeHistgrams truncates remaining 0's, if a value is not present in counts for this reason
  * pad the end of the counts array with 0's
  */
  var padResults = function padResults(counts, expectedLength) {
    if (counts.length === expectedLength) { return counts; }
    var results = [];
    for (var i = 0; i < expectedLength; i++) {
      results[i] = counts[i] || 0;
    }
    return results;
  };

  /**
  * Put data into the format highcharts wants, and then filter out any data with a value of 0
  * or data in the No Data category
  */
  var formatData = function formatData (data, labels, colors) {
    return data.map(function (datum, index) {
      return {
        name: labels[index],
        data: [datum],
        color: colors[index]
      };
    }).filter(function (record) {
      return record.data[0] !== 0 && record.name !== 'No Data';
    });
  };

  return {

    performRestorationAnalysis: function (graphic, optionIndex) {
      var config = ethiopiaConfig.options[optionIndex];
      var geometry = graphic.geometry;
      var rasterId = config.id;
      var promises = {};
      // Individual Configs
      var slopeConfig = analysisConfig[KEYS.SLOPE];
      var lcConfig = analysisConfig[KEYS.LAND_COVER];
      var popConfig = analysisConfig[KEYS.POPULATION];
      var tcConfig = analysisConfig[KEYS.TREE_COVER];
      // Individual Results
      var slopeData;
      var lcData;
      var popData;
      var tcData;

      promises[KEYS.SLOPE] = computeHistogram.multiplyRasters(slopeConfig.id, rasterId, geometry);
      promises[KEYS.LAND_COVER] = computeHistogram.multiplyRasters(lcConfig.id, rasterId, geometry);
      promises[KEYS.POPULATION] = computeHistogram.multiplyRasters(popConfig, rasterId, geometry);
      promises[KEYS.TREE_COVER] = computeHistogram.multiplyRasters(tcConfig.id, rasterId, geometry);

      all(promises).then(function (results) {
        // Hide the loader, prepare the containers by clearing the current one and putting 4 nodes in place
        // for the different types of analysis
        domClass.add('analysis-loader', 'hidden');
        charts.prepareContainer(config.name);
        // Get an array of data with the same length as the classes by parsing counts and padding the array with 0's
        slopeData = padResults(getCounts(results[KEYS.SLOPE].histograms), slopeConfig.classes.length);
        lcData = padResults(getCounts(results[KEYS.LAND_COVER].histograms), lcConfig.classes.length);
        popData = padResults(getCounts(results[KEYS.POPULATION].histograms), popConfig.classes.length);
        tcData = padResults(getCounts(results[KEYS.TREE_COVER].histograms), tcConfig.classes.length);
        // Format the results into highcharts expected format { name, data, color }
        slopeData = formatData(slopeData, slopeConfig.classes, slopeConfig.colors);
        lcData = formatData(lcData, lcConfig.classes, lcConfig.colors);
        popData = formatData(popData, popConfig.classes, popConfig.colors);
        tcData = formatData(tcData, tcConfig.classes, tcConfig.colors);
        // title, chartId, name for axis, data
        charts.makeChart(KEYS.SLOPE_CHART_ID, slopeConfig.name, slopeData);
        charts.makeChart(KEYS.LAND_COVER_CHART_ID, lcConfig.name, lcData);
        charts.makeChart(KEYS.POPULATION_CHART_ID, popConfig.name, popData);
        charts.makeChart(KEYS.TREE_COVER_CHART_ID, tcConfig.name, tcData);
        // Debugging
        console.log(KEYS.SLOPE, results[KEYS.SLOPE].histograms);
        console.log(KEYS.LAND_COVER, results[KEYS.LAND_COVER].histograms);
        console.log(KEYS.POPULATION, results[KEYS.POPULATION].histograms);
        console.log(KEYS.TREE_COVER, results[KEYS.TREE_COVER].histograms);
      });
    }

  };

});
