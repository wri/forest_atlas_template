import AnalysisTypeSelect from 'components/AnalysisPanel/AnalysisTypeSelect';
import performAnalysis from 'utils/performAnalysis';
import tabKeys from 'constants/TabViewConstants';
import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Analysis extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {
      selectedFeature,
      activeTab,
      activeAnalysisType
    } = this.props;

    if (selectedFeature && activeTab === tabKeys.ANALYSIS) {
      performAnalysis(activeAnalysisType, selectedFeature, 30);
    }
  }

  componentDidUpdate() {
    const {
      selectedFeature,
      activeTab,
      activeAnalysisType
    } = this.props;

    if (selectedFeature && activeTab === tabKeys.ANALYSIS) {
      performAnalysis(activeAnalysisType, selectedFeature, 30);
    }
  }

  render () {
    const {selectedFeature} = this.props;
    const {language} = this.context;

    return (
      <div className='analysis-results'>
        <h3 className='analysis-results__title'>
          {selectedFeature.getTitle ? selectedFeature.getTitle() : ''}
        </h3>
        <div className='analysis-results__select-label'>
          {text[language][keys.ANALYSIS_SELECT_TYPE_LABEL]}
        </div>
        <AnalysisTypeSelect {...this.props} />
      </div>
    );
  }

}

Analysis.propTypes = {
  selectedFeature: PropTypes.object.isRequired
};
