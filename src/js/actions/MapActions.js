import dispatcher from 'js/dispatcher';
import layerFactory from 'helpers/LayerFactory';
import legendHelper from 'helpers/LegendHelper';

class MapActions {
  //- Action to notify the store the map has changed so we can rerender UI changes
  //- if necessary
  mapUpdated () {
    return {};
    // console.log('MapActions', e);
    // return e;
  }

  changeActiveTab (tabId) {
    return {
      id: tabId
    };
  }

  setAnalysisType (evt) {
    return {
      type: evt.target.value
    };
  }

  toggleAnalysisModal (data) {
    return {
      visible: data.visible
    };
  }

  togglePrintModal (data) {
    return {
      visible: data.visible
    };
  }

  toggleSearchModal (data) {
    return {
      visible: data.visible
    };
  }

  // setSelectedFeature (evt) {
  //   let {target} = evt;
  //   return {
  //     feature: target.getSelectedFeature ? target.getSelectedFeature() : undefined
  //   };
  // }

  createLayers (map, layers) {
    brApp.debug('MapActions >>> createLayers');
    //- Remove layers from config that have no url unless they are of type graphic(which have no url)
    //- sort by order from the layer config
    //- return an arcgis layer for each config object
    let esriLayers = layers.filter(layer => layer && (layer.url || layer.type === 'graphic')).sort((a, b) => a.order - b.order).map(layerFactory);
    map.addLayers(esriLayers);
    // If there is an error with a particular layer, handle that here
    map.on('layers-add-result', result => {
      let addedLayers = result.layers;
      // Check for Errors
      var layerErrors = addedLayers.filter(layer => layer.error);
      if (layerErrors.length > 0) { console.error(layerErrors); }
      // Connect events to the layers that need them
      // LayersHelper.connectLayerEvents();
    });
    //- Return the layers through the dispatcher so the mapstore can update visible layers
    return layers;
  }

  changeBasemap (map, basemap) {
    basemap = basemap.toLowerCase();
    map.setBasemap(basemap.toLowerCase())
    return map;
  }

  toggleLandsat () {
    // Turn the layer off or on.
  }

  createLegend(map, layers) {
    legendHelper({
      map: map
    }, 'legend')
  }

}

export default dispatcher.createActions(MapActions);
