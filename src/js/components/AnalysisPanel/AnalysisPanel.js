import Instructions from 'components/AnalysisPanel/Instructions';
import Analysis from 'components/AnalysisPanel/Analysis';
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
    const {map} = this.context;
    let selectedFeature;
    let content;

    //- Infer the selected feature from the info window
    if (map.infoWindow && map.infoWindow.getSelectedFeature()) {
      selectedFeature = map.infoWindow.getSelectedFeature();
    }

    if (selectedFeature !== undefined) {
      content = [<Analysis selectedFeature={selectedFeature} />];
    } else {
      content = [<Instructions />, <Tools />];
    }

    return (
      <div className='analysis-panel custom-scroll'>
        {content}
      </div>
    );
  }

}
