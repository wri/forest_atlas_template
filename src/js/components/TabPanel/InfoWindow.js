import mapStore from 'stores/MapStore';
import React, {Component} from 'react';

export default class InfoWindow extends Component {

  constructor(props) {
    super(props);

    mapStore.listen(this.storeUpdated.bind(this));
    let defaultState = mapStore.getState();
    // console.log('InfoWindow::ctor, defaultState', defaultState);
    this.state = {
      features: defaultState.selectedFeatures
    };
  }

  storeUpdated () {
    let currentState = mapStore.getState();
    // console.log('InfoWindow::storeUpdated', currentState);
    this.setState({ features: currentState.selectedFeatures });
  }

  attribute (item) {
    return (
      <dl className='source-row'>
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </dl>
    );
  }

  previous () {
    this.props.map.infoWindow.selectPrevious();
  }

  next () {
    this.props.map.infoWindow.selectNext();
  }

  render () {
    let {infoWindow} = this.props.map;
    let selectedFeature, selectedIndex = 0;
    let layerName, attributes = [];

    if ( infoWindow && infoWindow.getSelectedFeature ) {
      selectedFeature = infoWindow.getSelectedFeature();
      selectedIndex = infoWindow.selectedIndex;
    }
    console.log('InfoWindow render', selectedFeature);
    if ( selectedFeature ) {
      attributes = Object.keys(selectedFeature.attributes);
      attributes = attributes.map((a) => { 
        return { label: a, value: selectedFeature.attributes[a] }
      });
      layerName = selectedFeature._layer.name;
    } else {
      attributes = [{ label: 'No features selected. Click the map to make a selection.', value: '' }];
    }
    return (
      <div className='infoWindow'>
        <div className={`layer-name ${this.state.features.length ? '' : 'hidden'}`}>
          Layer:  {layerName}
        </div>
        <div className='attribute-display custom-scroll'>
          {attributes.map(this.attribute)}
        </div>
        <div className={`feature-controls ${this.state.features.length ? '' : 'hidden'}`}>
          <span>{this.state.features.length} features selected.</span>
          <span className={`arrow right ${selectedIndex < this.state.features.length-1 ? '' : 'disabled'}`} onClick={this.next.bind(this)}>Next</span>
          <span className={`arrow left ${selectedIndex > 0 ? '' : 'disabled'}`} onClick={this.previous.bind(this)}>Prev</span>
        </div>
      </div>
    );
  }

}

InfoWindow.propTypes = {
  map: React.PropTypes.object.isRequired
};
