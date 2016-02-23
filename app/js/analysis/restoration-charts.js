define(['root/analysis/constants'], function (KEYS) {

  var generateNoDataMarkup = function generateNoDataMarkup (label) {
    return (
      '<section class="restoration-nodata">' +
        '<div>There is no ' + label + ' data for this restoration option in this area.</div>' +
      '</section>'
    );
  };

  var generateErrorMarkup = function generateErrorMarkup (label) {
    return (
      '<section class="restoration-error">' +
        '<div>' + label + '</div>' +
      '</section>'
    );
  };

  return {

    prepareContainer: function (title, printOptions) {
      var container = printOptions ? printOptions.container : 'analysis-chart';
      var chartContainers = '<div class="restoration-chart-title">' + title + '</div>';
      chartContainers += '<div id="' + KEYS.SLOPE_CHART_ID + '" class="restoration-chart"></div>';
      chartContainers += '<div id="' + KEYS.LAND_COVER_CHART_ID + '" class="restoration-chart"></div>';
      chartContainers += '<div id="' + KEYS.POPULATION_CHART_ID + '" class="restoration-chart"></div>';
      chartContainers += '<div id="' + KEYS.TREE_COVER_CHART_ID + '" class="restoration-chart"></div>';
      $('#' + container).replaceWith('<div id="' + container + '"></div>');
      $('#' + container).append(chartContainers);
    },

    showRestorationError: function (id) {
      $('#' + id).empty();
      $('#' + id).append(
        generateErrorMarkup('Area not meeting criteria for potential/No data')
      );
    },

    showError: function (id, name) {
      $('#' + id).addClass('error');
      $('#' + id).append(generateErrorMarkup(name));
    },

    makeStackedBarChart: function (chartId, name, data) {
      // Only render the chart if data is present, otherwise remove the container
      if (data.length > 0) {
        $('#' + chartId).highcharts({
          chart: { type: 'bar' },
          title: { text: null },
          credits: { enabled: false },
          exporting: { enabled: false },
          xAxis: { categories: [name] },
          yAxis: { title: { enabled: false } },
          plotOptions: { series: { stacking: 'normal' } },
          tooltip: { valueSuffix: ' (HA)' },
          // Array of objects [ { name: '', data: [oneValue] } ]
          series: data
        });
      }
    },

    /**
    * labels is an array of labels for the y axis, although highcharts thinks its the X-axis (???)
    */
    makeBarChart: function (chartId, data, labels, colors) {
      // Only render the chart if data is present, otherwise remove the container
      if (data.length > 0) {
        $('#' + chartId).highcharts({
          chart: { type: 'bar', marginTop: 30 },
          title: { text: null },
          credits: { enabled: false },
          exporting: { enabled: true },
          tooltip: { valueSuffix: ' (HA)' },
          xAxis: { categories: labels, maxPadding: 0.5, useHTML: true },
          yAxis: { title: { text: 'Hectares' } },
          plotOptions: { bar: { colorByPoint: true, colors: colors } },
          // Array of objects [ { name: '', data: [oneValue] } ]
          series: data,
          analysis: 'SLOPE_POTENTIAL'
        });
      } else {
        $('#' + chartId).append(generateNoDataMarkup(name));
      }
    }

  };

});
