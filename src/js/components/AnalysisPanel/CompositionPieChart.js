//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class CompositionPieChart extends Component {
  componentDidMount() {
    const {labels, colors, counts} = this.props;
    let data = [];
    let series;

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

    series = [{
      type: 'pie',
      name: 'Get from Callee',
      data: data
    }];

    charts.makeCompositionPieChart(this.refs.chart, series);
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
