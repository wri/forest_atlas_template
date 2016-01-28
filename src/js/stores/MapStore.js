import tabKeys from 'constants/TabViewConstants';
import mapActions from 'actions/MapActions';
import dispatcher from 'js/dispatcher';

class MapStore {

  constructor () {

    this.activeTab = tabKeys.LAYERS;

    this.bindListeners({
      mapUpdated: mapActions.mapUpdated,
      changeActiveTab: mapActions.changeActiveTab
    });
  }

  //- Empty method to force a dispatch
  mapUpdated () {}

  changeActiveTab (payload) {
    this.activeTab = payload.id;
  }

}

export default dispatcher.createStore(MapStore, 'MapStore');
