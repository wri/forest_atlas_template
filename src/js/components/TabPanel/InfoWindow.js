import mapStore from 'stores/MapStore';
import React, {Component} from 'react';

export default class InfoWindow extends Component {

  constructor(props) {
    super(props);

    mapStore.listen(this.storeUpdated.bind(this));
    let defaultState = mapStore.getState();
    console.log('InfoWindow::ctor, defaultState', defaultState);
    this.state = {
      features: defaultState.selectedFeatures
    };
  }

  storeUpdated () {
    let currentState = mapStore.getState();
    console.log('InfoWindow::storeUpdated', currentState);
    this.setState({ features: currentState.selectedFeatures });
  }

  render () {
    var {infoWindow} = this.props.map;
    console.log('InfoWindow render', this.state.features);
    return (
      <div>{this.state.features.length} features selected.</div>
    );
  }

}

InfoWindow.propTypes = {
  map: React.PropTypes.object.isRequired
};
