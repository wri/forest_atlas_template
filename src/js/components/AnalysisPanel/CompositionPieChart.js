//- These charts have a dependency of highcharts and jquery
import React, {PropTypes, Component} from 'react';

let chart;
const generatePieChart = (el) => {
  let data = [];

  let series = [{
    type: 'pie',
    name: 'Testing',
    data: data
  }];

  chart = new Highcharts.Chart({
    chart: {
      renderTo: el,
      plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
    },
    title: {
      text: 'Testing'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        showInLegend: true,
        cursor: 'pointer',
        dataLabels: { enabled: true }
      }
    },
    series: series,
    credits: { enabled: false }
  });
};

export default class CompositionPieChart extends Component {
  componentDidMount() {
    let {labels, colors, counts} = this.props;
    console.log(labels, colors, counts);
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
