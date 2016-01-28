import InfoWindow from 'components/InfoPanel/InfoWindow';
import tabKeys from 'constants/TabViewConstants';
import React, {Component} from 'react';

//- Parse Keys for easier access
const {
  LAYERS,
  ANALYSIS,
  INFO_WINDOW
} = tabKeys;

export default class TabView extends Component {

  getClassName = (id) => {
    return `tab-view__content ${id === this.props.activeTab ? 'selected' : ''}`;
  };

  render () {
    let {
      map
    } = this.props;

    const infoWindow = map.infoWindow && map.infoWindow.isShowing ? <InfoWindow map={map} /> : undefined;

    return (
      <div className='tab-view map-component custom-scroll shadow'>
        <div className={this.getClassName(LAYERS)}>
          Layer Panel
        </div>
        <div className={this.getClassName(INFO_WINDOW)}>
          {infoWindow}
        </div>
        <div className={this.getClassName(ANALYSIS)}>
          Analysis Panel
        </div>
        <div className={this.getClassName(LAYERS)}>
          Same identifier as Layer Panel
        </div>
      </div>
    );
  }

}

TabView.propTypes = {
  map: React.PropTypes.object.isRequired,
  activeTab: React.PropTypes.string.isRequired
};
