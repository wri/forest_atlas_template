import AnalysisTypeSelect from 'components/AnalysisPanel/AnalysisTypeSelect';
import CompositionPieChart from 'components/AnalysisPanel/CompositionPieChart';
import LossGainBadge from 'components/AnalysisPanel/LossGainBadge';
import FiresBadge from 'components/AnalysisPanel/FiresBadge';
import BarChart from 'components/AnalysisPanel/BarChart';
import analysisKeys from 'constants/AnalysisConstants';
import performAnalysis from 'utils/performAnalysis';
import tabKeys from 'constants/TabViewConstants';
import {analysisConfig} from 'js/config';
import keys from 'constants/StringKeys';
import Loader from 'components/Loader';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const getDefaultState = () => {
  return {
    isLoading: true,
    results: undefined
  };
};

export default class Analysis extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  state = getDefaultState();

  componentDidMount() {
    const {
      selectedFeature,
      activeTab,
      activeAnalysisType
    } = this.props;

    if (selectedFeature && activeTab === tabKeys.ANALYSIS) {
      performAnalysis(activeAnalysisType, selectedFeature, 30).then((results) => {
        this.setState({ results: results, isLoading: false });
      });
    }
  }

  //- Test this as it will need to be tweaked, ideally when we receive new props,
  //- We want to reset state to default before our render pass
  componentWillReceiveProps(nextProps) {
    const {
      selectedFeature,
      activeTab,
      activeAnalysisType
    } = nextProps;

    if (
      (selectedFeature !== this.props.selectedFeature ||
      activeAnalysisType !== this.props.activeAnalysisType ||
      activeTab !== this.props.activeTab) &&
      activeTab === tabKeys.ANALYSIS
    ) {
      this.setState(getDefaultState());
      performAnalysis(activeAnalysisType, selectedFeature, 30).then((results) => {
        this.setState({ results: results, isLoading: false });
      });
    }
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     selectedFeature,
  //     activeTab,
  //     activeAnalysisType
  //   } = this.props;
  //
  //   //- If the feature, analysis type, or the tab changed to this one, reset defaults and get results
  //   //- make sure to be careful changing this if, we dont want an infinite loop
  //   if (
  //     (selectedFeature !== prevProps.selectedFeature ||
  //     activeAnalysisType !== prevProps.activeAnalysisType ||
  //     activeTab !== prevProps.activeTab) &&
  //     activeTab === tabKeys.ANALYSIS
  //   ) {
  //     performAnalysis(activeAnalysisType, selectedFeature, 30).then((results) => {
  //       this.setState({ results: results, isLoading: false });
  //     });
  //   }
  // }

  renderResults = (type, results, language) => {
    switch (type) {
      case analysisKeys.FIRES:
        return <FiresBadge count={results.fireCount} />;
      case analysisKeys.TC_LOSS_GAIN:
        return <LossGainBadge lossCounts={results.lossCounts} gainCounts={results.gainCounts} />;
      case analysisKeys.LCC:
        return <CompositionPieChart
          counts={results.counts}
          colors={analysisConfig[type].colors}
          labels={text[language][keys.ANALYSIS_LCC_LABELS]} />;
      case analysisKeys.TC_LOSS:
        return <BarChart
          counts={results.counts}
          colors={analysisConfig[type].colors}
          labels={analysisConfig[type].labels} />;
      case analysisKeys.LC_LOSS:
      case analysisKeys.BIO_LOSS:
      case analysisKeys.INTACT_LOSS:
      return null;
      case analysisKeys.SLOPE:
      return null;
      //- This should only be the restoration analysis, since its value is a plain rasterId
      default:
      return null;
    }
  };

  render () {
    const {selectedFeature, activeAnalysisType} = this.props;
    const {results, isLoading} = this.state;
    const {language} = this.context;
    let chart;

    if (results) {
      chart = this.renderResults(activeAnalysisType, results, language);
    }

    return (
      <div className='analysis-results'>
        <Loader active={isLoading} />
        <h3 className='analysis-results__title'>
          {selectedFeature.getTitle ? selectedFeature.getTitle() : ''}
        </h3>
        <div className='analysis-results__select-label'>
          {text[language][keys.ANALYSIS_SELECT_TYPE_LABEL]}
        </div>
        <AnalysisTypeSelect {...this.props} />
        {chart}
      </div>
    );
  }

}

Analysis.propTypes = {
  selectedFeature: PropTypes.object.isRequired
};
