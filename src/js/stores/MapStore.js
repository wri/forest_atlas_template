import mapActions from 'actions/MapActions';
import dispatcher from 'js/dispatcher';

class MapStore {

  constructor () {

    this.map = {};

    this.bindListeners({
      mapUpdated: mapActions.mapUpdated
    });
  }

  //- Empty method to force a dispatch
  mapUpdated () {}

}

export default dispatcher.createStore(MapStore, 'MapStore');
