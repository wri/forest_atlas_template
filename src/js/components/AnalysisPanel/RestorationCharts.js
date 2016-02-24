/* eslint no-unused-vars: 0 */
//- These charts have a dependency of highcharts
import text from 'js/languages';
import keys from 'constants/StringKeys';
import React, {PropTypes, Component} from 'react';

const generateRestorationChart = (el, name, series) => {
  const chart = new Highcharts.Chart({
    chart: { renderTo: el, type: 'bar' },
    title: { text: null },
    xAxis: { categories: [name] },
    yAxis: { reversedStacks: false, title: { enabled: false }},
    plotOptions: { series: { stacking: 'normal'}},
    tooltip: { valueSuffix: ' (Ha)'},
    series: series,
    credits: { enabled: false }
  });
};

const formatData = (counts, labels, colors) => {
  return labels.map((label, index) => {
    return {
      name: label,
      data: [counts[index]],
      color: colors[index]
    };
  }).filter((item) => {
    return item.data[0] && item.name !== 'No Data';
  });
};

export default class RestorationCharts extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {slopeChart, landCoverChart, populationChart, treeCoverChart} = this.refs;
    const {results, config} = this.props;
    const {language} = this.context;
    //- Format the data into series highcharts can easily consume
    const slopeData = formatData(results.slope, config.slopeClasses, config.slopeColors);
    const lcData = formatData(results.landCover, text[language][keys.ANALYSIS_RESTORATION_LC_LABELS], config.landCoverColors);
    const popData = formatData(results.population, config.populationClasses, config.populationColors);
    const tcData = formatData(results.treeCover, config.treeCoverClasses, config.treeCoverColors);
    //- Generate Charts
    generateRestorationChart(slopeChart, 'Slope', slopeData);
    generateRestorationChart(landCoverChart, 'Land Cover', lcData);
    generateRestorationChart(populationChart, 'Population Density', popData);
    generateRestorationChart(treeCoverChart, '% Tree cover', tcData);
  }

  render () {
    return (
      <div className='restoration-charts'>
        <div ref='slopeChart' />
        <div ref='landCoverChart' />
        <div ref='populationChart' />
        <div ref='treeCoverChart' />
      </div>
    );
  }
}

RestorationCharts.propTypes = {
  results: PropTypes.object.isRequried,
  config: PropTypes.object.isRequried
};
