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
    yAxis: { title: { text: null }},
    series: series,
    colors: colors,
    credits: { enabled: false }
  });
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
  colors: PropTypes.array.isRequried
};
