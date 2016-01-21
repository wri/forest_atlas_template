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

  componentDidMount () {
    mapActions.createMap(mapConfig);
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
