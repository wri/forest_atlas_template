import Controls from 'components/MapControls/ControlPanel';
import InfoWindow from 'components/InfoPanel/InfoWindow';
import InfoPanel from 'components/InfoPanel/InfoPanel';
import mapActions from 'actions/MapActions';
import MapStore from 'stores/MapStore';
import React, {Component} from 'react';
import {mapConfig} from 'js/config';

export default class Map extends Component {

  constructor (props) {
    super(props);
    this.state = MapStore.getState();
    MapStore.listen(this.storeDidUpdate);
  }

  componentDidUpdate (prevProps) {
    const settings = this.props.settings;
    if (prevProps.settings.webmap !== settings.webmap) {
      //- defer is a hack to tell the action to wait for the dispatcher to finish dispatching the previous action
      //- This has to be done because it it part of the path from a pervious dispatch
      mapActions.createMap.defer(mapConfig.id, settings.webmap, mapConfig.options);
    }
  }

  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  render () {
    const {map} = this.state;
    const infoWindow = map.infoWindow && map.infoWindow.isShowing ? <InfoWindow map={map} /> : undefined;
    const showInfoPanel = (!!infoWindow);

    return (
      <div className='map-container'>
        <div id={mapConfig.id} className='map'>
          <Controls map={this.state.map} />
          <InfoPanel visible={showInfoPanel} >
            {infoWindow}
          </InfoPanel>
        </div>
      </div>
    );
  }
}
