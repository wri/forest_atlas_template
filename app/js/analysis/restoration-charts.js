define(['root/analysis/constants'], function (KEYS) {

  var generateErrorMarkup = function generateErrorMarkup (label) {
    return (
      '<section class="restoration-error">' +
        '<div>There is no ' + label + ' data for this restoration option in this area.</div>' +
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
          // Array of objects [ { name: '', data: [oneValue] } ]
          series: data
        });
      } else {
        $('#' + chartId).append(generateErrorMarkup(name));
      }
    }

  };

});
