//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class TotalLossChart extends Component {
  componentDidMount() {
    const {labels, colors, counts, encoder, options, lossLabels} = this.props;
    const element = this.refs.chart;
    let Xs = encoder.A; // Loss Bounds
    let Ys = encoder.B; // Raster were crossing with
    let series = [], colorsUsed = [];
    let index, data;

    if (options.simple) {
      series.push({
        'name': labels[0],
        'data': counts.slice(1)
      });
      colorsUsed.push(colors[0]);
    } else {
      for (let i = 0; i < Ys.length; i++) {
        data = [];
        for (let j = 0; j < Xs.length; j++) {
          index = encoder.encode(Xs[j], Ys[i]);
          data.push(counts[index] || 0);
        }
        if (data.some((value) => value !== 0)) {
          series.push({
            'name': labels[i],
            'data': data
          });
          colorsUsed.push(colors[i]);
        }
      }
    }

    charts.makeTotalLossBarChart(element, lossLabels, colorsUsed, series);
  }

  render () {
    return (
      <div ref='chart'></div>
    );
  }
}

TotalLossChart.propTypes = {
  counts: PropTypes.array.isRequried,
  encoder: PropTypes.object.isRequried,
  options: PropTypes.object.isRequried,
  lossLabels: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequried
};
