//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class BarChart extends Component {
  componentDidMount() {
    const {labels, colors, counts} = this.props;
    let series = [{
      name: 'Get from Callee',
      data: counts
    }];

    charts.makeSimpleBarChart(this.refs.chart, labels, colors, series);
  }

  render () {
    return (
      <div ref='chart'></div>
    );
  }
}

BarChart.propTypes = {
  counts: PropTypes.array.isRequried,
  labels: PropTypes.array.isRequried,
  colors: PropTypes.array.isRequried
};
