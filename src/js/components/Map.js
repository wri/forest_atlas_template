import Controls from 'components/MapControls/ControlPanel';
import TabButtons from 'components/TabPanel/TabButtons';
import TabView from 'components/TabPanel/TabView';
import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import MapStore from 'stores/MapStore';
import React, {Component} from 'react';
import {mapConfig} from 'js/config';

export default class Map extends Component {

  constructor (props) {
    super(props);
    this.map = {};
    this.state = MapStore.getState();
  }

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }

  componentDidUpdate (prevProps) {
    const settings = this.props.settings;
    if (prevProps.settings.webmap !== settings.webmap) {
      this.createMap(settings);
    }
  }

  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  createMap = (settings) => {
    arcgisUtils.createMap(settings.webmap, this.refs.map, { mapOptions: mapConfig.options }).then(response => {
      this.map = response.map;
      this.map.graphics.clear();
      // mapActions.mapUpdated();
      //- Attach events I need for the info window
      this.map.infoWindow.on('show, hide, set-features, selection-change', mapActions.mapUpdated);
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = this.map; }
    });
  };

  render () {
    return (
      <div className='map-container'>
        <div ref='map' className='map'>
          <Controls map={this.map} />
          <TabButtons activeTab={this.state.activeTab} />
          <TabView map={this.map} {...this.state} />
        </div>
      </div>
    );
  }
}
