import dispatcher from 'js/dispatcher';

class MapActions {

  createMap (id, webmap, options) {
    return {
      id: id,
      webmap: webmap,
      options: options
    };
  }

}

export default dispatcher.createActions(MapActions);
