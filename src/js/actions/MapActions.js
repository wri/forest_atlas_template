import dispatcher from 'js/dispatcher';

class MapActions {

  //- Straight through dispatch
  createMap (mapConfig) { return mapConfig; }

}

export default dispatcher.createActions(MapActions);
