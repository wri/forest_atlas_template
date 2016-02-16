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

  componentDidUpdate(prevProps) {
    const {selectedFeature} = this.props;
    if (selectedFeature !== prevProps.selectedFeature) {

    }
  }

  render () {
    const {selectedFeature} = this.props;
    const {language} = this.context;

    return (
      <div className='analysis-results'>
        <h3 className='analysis-results__title'>
          {selectedFeature.getTitle()}
        </h3>
        <div className='analysis-results__select-container'>
          <div className=''>{text[language][keys.ANALYSIS_SELECT_TYPE]}</div>
        </div>
      </div>
    );
  }

}

Analysis.propTypes = {
  feature: PropTypes.object.isRequired
};
