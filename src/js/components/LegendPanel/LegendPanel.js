import mapStore from 'stores/MapStore';
import React from 'react';

let closeSymbolCode = 9660,
    openSymbolCode = 9650;

export default class LegendPanel extends React.Component {
  
  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = { 
      open: false 
    };
  }

  storeUpdated () {
    console.log('LegendPanel::storeUpdated', mapStore.getState());
  }

  render () {
    let rootClasses = this.state.open ? 'legend-panel map-component shadow' : 'legend-panel map-component shadow legend-collapsed';
    
    return (
      <div className={rootClasses}>
        
        <div className='legend-title' onClick={this.toggle.bind(this)}>
          <span>
            Legend
          </span>
          <span className='layer-category-caret' onClick={this.toggle.bind(this)}>
            {String.fromCharCode(this.state.open ? closeSymbolCode : openSymbolCode)}
          </span>
        </div>

        <div className='legend-layers'>

        </div>
      </div>
    )
  }

  toggle () {
    this.setState({ open: !this.state.open });
  }
}