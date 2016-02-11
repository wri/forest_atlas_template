import Instructions from 'components/AnalysisPanel/Instructions';
import Tools from 'components/AnalysisPanel/Tools';
import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisPanel extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  render () {
    return (
      <div className='analysis-panel custom-scroll'>
        <Instructions />
        <Tools />
      </div>
    );
  }

}
