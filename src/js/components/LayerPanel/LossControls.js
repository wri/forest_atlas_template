import {layerActions} from 'actions/LayerActions';
import layerUtils from 'js/utils/layerUtils';
import LayersHelper from 'helpers/LayersHelper';
import {layerPanelText} from 'js/config';
import React from 'react';

// let lossOptions = layerPanelText.lossOptions;

export default class LossControls extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
      lossOptions: [],
      lossFromSelectIndex: null,
      lossToSelectIndex: null
    };
  }

  componentDidMount () {
    // TODO:  pull from config.
    let url = 'http://gis-treecover.wri.org/arcgis/rest/services/ForestCover_lossyear/ImageServer';
    layerUtils.getLayerMetadata(url).then((results) => {
      let lossOptions = [];
      let min = results.minValues[0];
      let max = results.maxValues[0];
      for ( let i = min; i <= max; i++ ) {
        lossOptions.push({ label: 2000 + i + '', value: i });
      }
      this.setState({
        loaded: true,
        lossOptions: lossOptions,
        lossFromSelectIndex: 0,
        lossToSelectIndex: lossOptions.length-1
      });
    });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.lossFromSelectIndex !== this.props.lossFromSelectIndex || prevProps.lossToSelectIndex !== this.props.lossToSelectIndex) {
      LayersHelper.updateLossLayerDefinitions(this.props.lossFromSelectIndex, this.props.lossToSelectIndex);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Set the default layer definition when the map has been loaded
    if (!this.props.loaded && nextProps.loaded) {
      LayersHelper.updateLossLayerDefinitions(this.props.lossFromSelectIndex, this.props.lossToSelectIndex);
    }
  }

  renderSelects () {
    let selects = <div className='timeline-container loss flex'>loading...</div>;
    if ( this.state.loaded ) {
      let fromItem = this.state.lossOptions[this.state.lossFromSelectIndex];
      let toItem = this.state.lossOptions[this.state.lossToSelectIndex];
      selects = <div className='timeline-container loss flex'>
        <div className='loss-from relative'>
          <select onChange={this.fromChanged} className='pointer' value={fromItem.value}>
            {this.state.lossOptions.map(this.optionsMap('from'))}
          </select>
          <div className='loss-from-button fa-button sml white'>{fromItem.label}</div>
        </div>
        <div className='loss-timeline-spacer'>to</div>
        <div className='loss-to relative'>
          <select onChange={this.toChanged} className='pointer' value={toItem.value}>
            {this.state.lossOptions.map(this.optionsMap('to'))}
          </select>
          <div className='loss-to-button fa-button sml white'>{toItem.label}</div>
        </div>
      </div>
    }
    return selects;
  }

  render () {
    return (
      this.renderSelects()
    );
  }

  optionsMap (selectType) {
    // Disable options in the 'from' select that are greater than the selected value in the 'to' select
    // and vice versa, disable 'to' options less than the selected value in the 'from' select
    let fromMax = this.state.lossOptions[this.state.lossToSelectIndex].value;
    let toMin = this.state.lossOptions[this.state.lossFromSelectIndex].value;
    return (item, index) => {
      let disabled = selectType === 'from' ? item.value >= fromMax : item.value <= toMin;
      return <option key={index} value={item.value} disabled={disabled}>{item.label}</option>;
    };
  }

  fromChanged (evt) {
    layerActions.changeLossFromTimeline(evt.target.selectedIndex);
  }

  toChanged (evt) {
    layerActions.changeLossToTimeline(evt.target.selectedIndex);
  }

}
