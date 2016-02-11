import AnalysisPanel from 'components/AnalysisPanel/AnalysisPanel';
import LayerPanel from 'components/LayerPanel/LayerPanel';
import InfoWindow from 'components/InfoPanel/InfoWindow';
import tabKeys from 'constants/TabViewConstants';
import React, {
  Component,
  PropTypes
} from 'react';

//- Parse Keys for easier access
const {
  DOCUMENTS,
  LAYERS,
  ANALYSIS,
  INFO_WINDOW
} = tabKeys;

export default class TabView extends Component {

  static contextTypes = {
    map: PropTypes.object.isRequired
  };

  getClassName = (id) => {
    return `tab-view__content ${id === this.props.activeTab ? 'selected' : ''}`;
  };

  render () {
    let {map} = this.context;

    const infoWindow = map.infoWindow && map.infoWindow.isShowing ? <InfoWindow map={map} /> : undefined;

    return (
      <div className='tab-view map-component custom-scroll shadow'>
        <div className={this.getClassName(LAYERS)}>
          <LayerPanel loaded={map.loaded} />
        </div>
        <div className={this.getClassName(INFO_WINDOW)}>
          {infoWindow}
        </div>
        <div className={this.getClassName(ANALYSIS)}>
          <AnalysisPanel {...this.state} />
        </div>
        <div className={this.getClassName(DOCUMENTS)}>
          Documents Panel
        </div>
      </div>
    );
  }

}

TabView.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
