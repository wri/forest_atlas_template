import tabKeys from 'constants/TabViewConstants';
import {layerConfig} from 'js/config';
import mapActions from 'actions/MapActions';
import layerActions from 'actions/LayerActions';
import dispatcher from 'js/dispatcher';

class MapStore {

  constructor () {

    this.activeTab = tabKeys.LAYERS;
    this.activeLayers = layerConfig.filter(l => l.visible && l.group).map(l => l.id);
    this.allLayers = layerConfig;

    this.bindListeners({
      mapUpdated: mapActions.mapUpdated,
      changeActiveTab: mapActions.changeActiveTab,
      addActiveLayer: layerActions.addActiveLayer,
      removeActiveLayer: layerActions.removeActiveLayer,
      changeOpacity: layerActions.changeOpacity
    });
  }

  addActiveLayer (layerId) {
    let index = this.activeLayers.indexOf(layerId);
    if (index === -1) {
      // Create a copy of the strings array for easy change detection
      let layers = this.activeLayers.slice();
      layers.push(layerId);
      this.activeLayers = layers;
    }
  }

  removeActiveLayer (layerId) {
    let index = this.activeLayers.indexOf(layerId);
    if (index !== -1) {
      // Create a copy of the strings array for easy change detection
      let layers = this.activeLayers.slice();
      layers.splice(index, 1);
      this.activeLayers = layers;
    }
  }

  //- Empty method to force a dispatch
  mapUpdated () {}

  changeActiveTab (payload) {
    this.activeTab = payload.id;
  }

  changeOpacity (parameters) {
    // console.log('MapStore >>> changeOpacity', this.allLayers);
    let layer = this.allLayers.filter(l => l.id === parameters.layerId);
    console.log('MapStore >>> found a layer?', layer, parameters.layerId);
    if ( layer[0] ) {
      layer[0].opacity = parseFloat(parameters.value);
    }
  }

}

export default dispatcher.createStore(MapStore, 'MapStore');
