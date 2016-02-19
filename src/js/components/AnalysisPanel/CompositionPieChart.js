//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';

let chart;
const generatePieChart = (el, labels, colors, counts) => {
  let data = [];

  counts.forEach((count, index) => {
    //- If its not zero, add in value, label, and color
    if (count) {
      data.push({
        color: colors[index],
        name: labels[index],
        y: count
      });
    }
  });

  let series = [{
    type: 'pie',
    name: 'Testing',
    data: data
  }];

  if (chart) { chart.destroy(); }

  chart = new Highcharts.Chart({
    chart: {
      renderTo: el,
      plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
    },
    title: { text: null },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        showInLegend: true,
        cursor: 'pointer',
        dataLabels: { enabled: false }
      }
    },
    series: series,
    credits: { enabled: false }
  });
};

export default class CompositionPieChart extends Component {
  componentDidMount() {
    const {labels, colors, counts} = this.props;
    const element = this.refs.chart;
    generatePieChart(element, labels, colors, counts);
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