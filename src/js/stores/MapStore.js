import mapActions from 'actions/MapActions';
import dispatcher from 'js/dispatcher';
import EsriMap from 'esri/map';

let map;

class MapStore {

  constructor () {

    this.loaded = false;

    this.bindListeners({
      createMap: mapActions.createMap
    });
  }

  createMap (mapConfig) {
    brApp.debug('MapStore >>> createMap');
    map = new EsriMap(mapConfig.id, mapConfig.options);
    map.on('load', () => {
      map.graphics.clear();
      this.loaded = true;
      this.emitChange();
    });
  }

}

export default dispatcher.createStore(MapStore, 'MapStore');
