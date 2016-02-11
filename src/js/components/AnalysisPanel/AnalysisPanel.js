import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  render () {
    return (
      <div className='analysis-panel custom-scroll'>
        Analysis
      </div>
    );
  }

}
