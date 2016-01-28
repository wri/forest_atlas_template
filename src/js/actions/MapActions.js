import dispatcher from 'js/dispatcher';

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

}

export default dispatcher.createActions(MapActions);
