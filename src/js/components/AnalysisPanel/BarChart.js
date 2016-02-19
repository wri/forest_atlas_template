//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';

let chart;
const generateBarChart = (el, labels, colors, counts) => {

  let series = [{
    name: 'Testing',
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

export default class CompositionPieChart extends Component {
  componentDidMount() {
    const {labels, colors, counts} = this.props;
    const element = this.refs.chart;
    generateBarChart(element, labels, colors, counts);
  }

  render () {
    return (
      <div ref='chart'></div>
    );
  }
}

CompositionPieChart.propTypes = {
  counts: PropTypes.array.isRequried,
  labels: PropTypes.array.isRequried,
  colors: PropTypes.array.isRequried
};
