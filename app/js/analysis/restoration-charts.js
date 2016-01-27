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
        '<div>We are unable to complete your request at this time for ' + label + ' data. Please try again later.</div>' +
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

    showError: function (id, name) {
      $('#' + id).addClass('error');
      $('#' + id).append(generateErrorMarkup(name));
    },

    makeChart: function (chartId, name, data) {
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
      } else {
        $('#' + chartId).append(generateNoDataMarkup(name));
      }
    }

  };

});
