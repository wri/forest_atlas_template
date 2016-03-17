import analysisKeys from 'constants/AnalysisConstants';
import tabKeys from 'constants/TabViewConstants';
import mapActions from 'actions/MapActions';
import layerActions from 'actions/LayerActions';
import dispatcher from 'js/dispatcher';
import {layerPanelText} from 'js/config';

class MapStore {

  constructor () {

    this.activeTab = tabKeys.LAYERS;
    this.activeLayers = [];
    this.allLayers = [];
    this.dynamicLayers = {};
    // this.selectedFeatures = [];
    this.activeAnalysisType = analysisKeys.TC_LOSS;
    this.lossFromSelectIndex = 0;
    this.lossToSelectIndex = layerPanelText.lossOptions.length - 1;
    this.firesSelectIndex = layerPanelText.firesOptions.length - 1;
    this.analysisModalVisible = false;
    this.printModalVisible = false;

    this.bindListeners({
      mapUpdated: mapActions.mapUpdated,
      createLayers: mapActions.createLayers,
      changeActiveTab: mapActions.changeActiveTab,
      setAnalysisType: mapActions.setAnalysisType,
      togglePrintModal: mapActions.togglePrintModal,
      toggleAnalysisModal: mapActions.toggleAnalysisModal,
      addActiveLayer: layerActions.addActiveLayer,
      removeActiveLayer: layerActions.removeActiveLayer,
      addSubLayer: layerActions.addSubLayer,
      removeSubLayer: layerActions.removeSubLayer,
      addAll: layerActions.addAll,
      removeAll: layerActions.removeAll,
      changeLossToTimeline: layerActions.changeLossToTimeline,
      changeLossFromTimeline: layerActions.changeLossFromTimeline,
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

  addSubLayer (info) {
    this.dynamicLayers[info.id].push(info.subIndex);
  }

  removeSubLayer (info) {
    let subLayerIndex = this.dynamicLayers[info.id].indexOf(info.subIndex);
    if (subLayerIndex > -1) {
      this.dynamicLayers[info.id].splice(subLayerIndex, 1);
    }
  }

  addAll () {
    this.activeLayers = this.allLayers.map(l => l.id);
  }

  removeAll () {
    this.activeLayers = [];
  }

  mapUpdated () {
    // console.log('MapStore::mapUpdated', e);
    // this.selectedFeatures = e.target.features || [];
  }

  createLayers (layers) {
    this.activeLayers = layers.filter((layer) => layer.visible).map((layer) => layer.id);
    this.allLayers = layers;
    layers.forEach(layer => {
      if (layer.type === 'dynamic' || layer.subId) {
        if (layer.esriLayer && !this.dynamicLayers.hasOwnProperty(layer.id)) {
          // console.log('dynamic layer, visibleLayers', layer);
          this.dynamicLayers[layer.id] = layer.esriLayer.visibleLayers;
        }
      }
    });
    // console.log('create layers, dynamic layers', this.dynamicLayers);
    // console.log('create layers, active layers', this.activeLayers);
  }

  changeActiveTab (payload) {
    this.activeTab = payload.id;
  }

  setAnalysisType (payload) {
    this.activeAnalysisType = payload.type;
  }

  toggleAnalysisModal (payload) {
    this.analysisModalVisible = payload.visible;
  }

  togglePrintModal (payload) {
    this.printModalVisible = payload.visible;
  }

  changeLossFromTimeline (activeIndex) {
    this.lossFromSelectIndex = activeIndex;
  }

  changeLossToTimeline (activeIndex) {
    this.lossToSelectIndex = activeIndex;
  }

  changeOpacity (parameters) {
    let layer = this.allLayers.filter(l => l.id === parameters.layerId);
    console.log('MapStore >>> found a layer?', layer, parameters.layerId);
    if ( layer[0] ) {
      layer[0].opacity = parseFloat(parameters.value);
    }
  }

}

export default dispatcher.createStore(MapStore, 'MapStore');
