define([
  'root/analysis/restoration-charts',
  'root/analysis/compute-histogram',
  'esri/geometry/geometryEngine',
  'root/analysis/analysisConfig',
  'root/analysis/ethiopiaConfig',
  'root/analysis/constants',
  'dojo/promise/all',
  'dojo/dom-class',
  'toolsmodel'
], function (charts, computeHistogram, geometryEngine, analysisConfig, ethiopiaConfig, KEYS, all, domClass, Model) {

  /**
  * parse the counts from the histograms, remove the first value from the counts
  * array as it contains the null?( or unmatched) values from the request
  */
  var getCounts = function getCounts (histograms) {
    return histograms.length === 0 ? histograms : histograms[0].counts;
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
      //- If the optionIndex is for the slope analysis breakdown, call other analysis function
      if (config.name === 'SLOPE') {
        var slopeSelectNode = document.querySelector('.analysis-selection-types .slope-select');
  			domClass.remove(slopeSelectNode, 'hidden');
        this.performSlopeAnalysis(graphic);
        return;
      }

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

      var simplifiedGeometry = geometryEngine.simplify(geometry);

      promises[KEYS.SLOPE] = computeHistogram.multiplyRasters(slopeConfig.id, rasterId, simplifiedGeometry);
      promises[KEYS.LAND_COVER] = computeHistogram.multiplyRasters(lcConfig.id, rasterId, simplifiedGeometry);
      promises[KEYS.POPULATION] = computeHistogram.multiplyRasters(popConfig.id, rasterId, simplifiedGeometry);
      promises[KEYS.TREE_COVER] = computeHistogram.multiplyRasters(tcConfig.id, rasterId, simplifiedGeometry);

      all(promises).always(function (results) {
        // Hide the loader, prepare the containers by clearing the current one and putting 4 nodes in place
        // for the different types of analysis
        domClass.add('analysis-loader', 'hidden');
        charts.prepareContainer(config.name);

        if (results.code && results.message) {
          charts.showError(KEYS.SLOPE_CHART_ID, slopeConfig.name);
          charts.showError(KEYS.LAND_COVER_CHART_ID, lcConfig.name);
          charts.showError(KEYS.POPULATION_CHART_ID, popConfig.name);
          charts.showError(KEYS.TREE_COVER_CHART_ID, tcConfig.name);
          return;
        }

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
        charts.makeStackedBarChart(KEYS.SLOPE_CHART_ID, slopeConfig.name, slopeData);
        charts.makeStackedBarChart(KEYS.LAND_COVER_CHART_ID, lcConfig.name, lcData);
        charts.makeStackedBarChart(KEYS.POPULATION_CHART_ID, popConfig.name, popData);
        charts.makeStackedBarChart(KEYS.TREE_COVER_CHART_ID, tcConfig.name, tcData);
        // Debugging
        // console.log(KEYS.SLOPE, results[KEYS.SLOPE].histograms);
        // console.log(KEYS.LAND_COVER, results[KEYS.LAND_COVER].histograms);
        // console.log(KEYS.POPULATION, results[KEYS.POPULATION].histograms);
        // console.log(KEYS.TREE_COVER, results[KEYS.TREE_COVER].histograms);
      });
    },

    performSlopeAnalysis: function (graphic) {
      var slopeConfig = analysisConfig[KEYS.SLOPE_BREAKDOWN];
      var simplifiedGeometry = geometryEngine.simplify(graphic.geometry);
      var viewModel = Model.getVM();
      var currentSlopeSelection = viewModel.slopeActiveOption();
      var slopeOptionData;

      computeHistogram.slopeBreakdownAnalysis(
        currentSlopeSelection.value,
        slopeConfig.id,
        slopeConfig.restorationOptionsId,
        simplifiedGeometry
      ).then(function (results) {
        domClass.add('analysis-loader', 'hidden');
        // The first value is null values, second is no data, slice them out
        var slopeCounts = getCounts(results.histograms).slice(2);
        var slopeOptionData = padResults(slopeCounts, slopeConfig.restorationOptions.length);
        var labels = slopeConfig.restorationOptions.map(function (item) { return item.label; });
        var data = [{
          name: slopeConfig.chartName,
          data: slopeOptionData
        }];

        charts.makeBarChart(KEYS.SLOPE_BREAKDOWN_CHART_ID, data, labels);
        //- Generate Tooltips for the xAxis labels
        $('.highcharts-xaxis-labels text').each(function (index, element) {
          var tooltip = slopeConfig.restorationOptions[index].tooltip;
          $('<title>' + tooltip + '</title>').prependTo(element);
          //- "Refresh" the svg
          $(element).html($(element).html());
        });

      }, function (error) {
        domClass.add('analysis-loader', 'hidden');
        console.log(error);
      });
    }

  };

});
