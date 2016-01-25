define(['root/analysis/constants'], function (KEYS) {

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
    }

  };

});
