import dispatcher from 'js/dispatcher';

class LayerActions {

  addActiveLayer (layerId) {
    return layerId;
    // TODO: Remove once current layer panel design is approved
    // if (kids) {
    //   kids.forEach(childLayer => this.dispatch(childLayer));
    // }
  }

  removeActiveLayer (layerId) {
    return layerId;
    // TODO: Remove once current layer panel design is approved
    // if (kids) {
    //   kids.forEach(childLayer => this.dispatch(childLayer));
    // }
  }

  changeFiresTimeline (selectedIndex) {
    return selectedIndex;
  }

  changeLossFromTimeline (selectedIndex) {
    return selectedIndex;
  }

  changeLossToTimeline (selectedIndex) {
    return selectedIndex;
  }

  changeOpacity (parameters) {
    console.log('LayerActions >>> changeOpacity');
    return parameters;
  }

}

export default dispatcher.createActions(LayerActions);