import dispatcher from 'js/dispatcher';
import {layerConfig, errors} from 'js/config';
import layerFactory from 'helpers/LayerFactory';

class MapActions {
  //- Action to notify the store the map has changed so we can rerender UI changes
  //- if necessary
  mapUpdated () {
    return {};
  }

  changeActiveTab (tabId) {
    return {
      id: tabId
    };
  }

  createLayers () {
    brApp.debug('MapActions >>> createLayers');
    //- Remove layers from config that have no url unless they are of type graphic(which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    let layers = layerConfig.filter(layer => layer && (layer.url || layer.type === 'graphic')).sort((a, b) => a.order - b.order).map(layerFactory);
    brApp.map.addLayers(layers);
    // If there is an error with a particular layer, handle that here
    brApp.map.on('layers-add-result', result => {
      let addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      // Connect events to the layers that need them
      // LayersHelper.connectLayerEvents();
    });
  }

}

export default dispatcher.createActions(MapActions);
