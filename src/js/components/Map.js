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
    return (
      <div className='map-container'>
        <div id={mapConfig.id} className='map'>

        </div>
      </div>
    );
  }
}
