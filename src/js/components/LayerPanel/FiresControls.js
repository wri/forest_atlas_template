import {layerActions} from 'actions/LayerActions';
import LayersHelper from 'helpers/LayersHelper';
import {layerPanelText} from 'js/config';
import React from 'react';

let firesOptions = layerPanelText.firesOptions;

export default class FiresControls extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.firesSelectIndex !== this.props.firesSelectIndex) {
      LayersHelper.updateFiresLayerDefinitions(this.props.firesSelectIndex);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Set the default layer definition when the map has been loaded
    if (!this.props.loaded && nextProps.loaded) {
      LayersHelper.updateFiresLayerDefinitions(nextProps.firesSelectIndex);
    }
  }

  render () {
    let activeItem = firesOptions[this.props.firesSelectIndex];
    return <div className='timeline-container relative fires'>
      <select className='pointer' value={activeItem.value} onChange={this.changeFiresTimeline}>
        {firesOptions.map(this.optionsMap, this)}
      </select>
      <div className='active-fires-control fa-button sml white'>{activeItem.label}</div>
    </div>;
  }

  optionsMap (item, index) {
    return <option key={index} value={item.value}>{item.label}</option>;
  }

  changeFiresTimeline (evt) {
    layerActions.changeFiresTimeline(evt.target.selectedIndex);
  }

}
