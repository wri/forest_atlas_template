import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import dispatcher from 'js/dispatcher';

class MapStore {

  constructor () {

    this.map = {};

    this.bindListeners({
      createMap: mapActions.createMap
    });
  }

  createMap (settings) {
    arcgisUtils.createMap(settings.webmap, settings.id, { mapOptions: settings.options }).then(response => {
      this.map = response.map;
      this.map.graphics.clear();
      this.emitChange();
      //- Attach events I need for the info window
      this.map.infoWindow.on('show, hide, set-features, selection-change', this.emitChange.bind(this));
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = this.map; }
    });
  }

}

export default dispatcher.createStore(MapStore, 'MapStore');
