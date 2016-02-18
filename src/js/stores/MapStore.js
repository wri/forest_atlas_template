import analysisKeys from 'constants/AnalysisConstants';
import tabKeys from 'constants/TabViewConstants';
import mapActions from 'actions/MapActions';
import layerActions from 'actions/LayerActions';
import dispatcher from 'js/dispatcher';

class MapStore {

  constructor () {

    this.activeTab = tabKeys.LAYERS;
    this.activeLayers = [];
    this.allLayers = [];
    // this.selectedFeature = undefined;
    this.selectedFeatures = [];
    this.activeAnalysisType = analysisKeys.TC_LOSS;
    this.analysisResults = undefined;

    this.bindListeners({
      mapUpdated: mapActions.mapUpdated,
      createLayers: mapActions.createLayers,
      changeActiveTab: mapActions.changeActiveTab,
      setAnalysisType: mapActions.setAnalysisType,
      // setSelectedFeature: mapActions.setSelectedFeature,
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

  mapUpdated (e) {
    console.log('MapStore::mapUpdated', e);
    this.selectedFeatures = e.target.features || [];
  }

  createLayers (layers) {
    this.activeLayers = layers.filter((layer) => layer.visible).map((layer) => layer.id);
    this.allLayers = layers;
  }

  changeActiveTab (payload) {
    this.activeTab = payload.id;
  }

  setAnalysisType (payload) {
    this.activeAnalysisType = payload.type;
  }

  // setSelectedFeature (payload) {
  //   this.selectedFeature = payload.feature;
  // }

  changeOpacity (parameters) {
    let layer = this.allLayers.filter(l => l.id === parameters.layerId);
    console.log('MapStore >>> found a layer?', layer, parameters.layerId);
    if ( layer[0] ) {
      layer[0].opacity = parseFloat(parameters.value);
    }
  }

}

export default dispatcher.createStore(MapStore, 'MapStore');
