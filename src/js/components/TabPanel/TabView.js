import AnalysisPanel from 'components/AnalysisPanel/AnalysisPanel';
import LayerPanel from 'components/LayerPanel/LayerPanel';
import InfoWindow from 'components/TabPanel/InfoWindow';
import Documents from 'components/TabPanel/Documents';
import tabKeys from 'constants/TabViewConstants';
import React, {
  Component,
  PropTypes
} from 'react';

const {
  DOCUMENTS,
  LAYERS,
  ANALYSIS,
  INFO_WINDOW
} = tabKeys;

export default class TabView extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  getClassName = (id) => {
    return `tab-view__content ${id === this.props.activeTab ? 'selected' : ''}`;
  };

  render () {
    let {map, settings} = this.context;

    return (
      <div className='tab-view map-component custom-scroll shadow'>
        <div className={this.getClassName(LAYERS)}>
          <LayerPanel loaded={map.loaded} />
        </div>
        <div className={this.getClassName(INFO_WINDOW)}>
          <InfoWindow map={map} />
        </div>
        <div className={this.getClassName(ANALYSIS)}>
          <AnalysisPanel {...this.props} />
        </div>
        {!settings.includeDocumentsTab ? null :
          <div className={this.getClassName(DOCUMENTS)}>
            <Documents active={this.props.activeTab === DOCUMENTS} />
          </div>
        }
      </div>
    );
  }

}

TabView.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
