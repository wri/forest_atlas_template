//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';

let chart;
const generateBarChart = (el, labels, colors, counts, tooltips) => {

  let series = [{
    name: 'Slope',
    data: counts
  }];

  if (chart) { chart.destroy(); }

  chart = new Highcharts.Chart({
    chart: {
      renderTo: el,
			type: 'bar'
    },
    title: { text: null },
    xAxis: {
      categories: labels,
      maxPadding: 0.5,
      title: { text: null }
    },
    yAxis: { title: { text: 'Hectares' }},
    tooltip: { valueSuffix: ' (HA)' }, //formatter: function () { console.log(tooltips[this.point.index]); }
    plotOptions: { bar: { colorByPoint: true, colors: colors } },
    series: series,
    credits: { enabled: false }
  });

  //- Query Chart SVG elements and add titles to them
  const textNodes = document.querySelectorAll('.highcharts-xaxis-labels text');
  let title;
  for (var i = 0; i < textNodes.length; i++) {
    title = document.createElement('title');
    title.innerHTML = tooltips[i];
    textNodes[i].insertBefore(title, textNodes[i].firstChild);
    //- "Refresh" the Text node
    textNodes[i].innerHTML = textNodes[i].innerHTML;
  }
};

export default class SlopeBarChart extends Component {
  componentDidMount() {
    const {labels, colors, counts, tooltips} = this.props;
    const element = this.refs.chart;
    generateBarChart(element, labels, colors, counts, tooltips);
  }

  render () {
    return (
      <div ref='chart'></div>
    );
  }
}

SlopeBarChart.propTypes = {
  counts: PropTypes.array.isRequried,
  labels: PropTypes.array.isRequried,
  colors: PropTypes.array.isRequried,
  tooltips: PropTypes.array.isRequried
};
