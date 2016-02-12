import Controls from 'components/MapControls/ControlPanel';
import TabButtons from 'components/TabPanel/TabButtons';
import TabView from 'components/TabPanel/TabView';
import Legend from 'components/LegendPanel/LegendPanel';
import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import MapStore from 'stores/MapStore';
import {mapConfig} from 'js/config';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Map extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  static childContextTypes = {
    map: PropTypes.object
  };

  getChildContext = () => {
    return {
      map: this.map
    };
  };

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
    const {language} = this.context;
    arcgisUtils.createMap(settings.webmap, this.refs.map, { mapOptions: mapConfig.options }).then(response => {
      this.map = response.map;
      this.map.graphics.clear();
      mapActions.mapUpdated();
      //- Attach events I need for the info window
      this.map.infoWindow.on('show, hide, selection-change', mapActions.mapUpdated);
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = this.map; }

      /** TODO: Add some kind of transformer here, something like this
      * someUtil.addWebmapLayers(settings.layers, response.map);
      * It could create layer config from the webmap layers and push it into settings.layers
      */
      mapActions.createLayers(this.map, settings.layers[language]);
    });
  };

  render () {
    return (
      <div className='map-container'>
        <div ref='map' className='map'>
          <Controls />
          <TabButtons activeTab={this.state.activeTab} />
          <TabView activeTab={this.state.activeTab} {...this.state} />
          <Legend />
        </div>
      </div>
    );
  }
}
