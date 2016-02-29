import React from 'react';
import LayersHelper from 'helpers/LayersHelper';

export default class BasemapLayer extends React.Component {
  render () {
    return (
      <div className='layer-basemap'>
        <span className='layer-basemap-icon'></span>
        <span className='layer-basemap-label'>{this.props.label}</span>
      </div>
    );
  }
}

BasemapLayer.propTypes = {
  icon: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired
};
