import mapActions from 'actions/MapActions';

import React, {
  Component,
  PropTypes
} from 'react';

export default class LandsatLayer extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  render () {
    return (
      <div className='layer-basemap' onClick={this.toggle.bind(this)}>
        <span className='layer-basemap-icon landsat'></span>
        <span className='layer-basemap-label'>{this.props.label}</span>
        <div className='relative'>
          <select className='pointer'>
            {this.props.years.map(this.yearOption)}
          </select>
          <div className='fa-button sml white'>{this.props.years[0]}</div>
        </div>
      </div>
    );
  }

  yearOption (year) {
    return (
      <option value={year}>{year}</option>
    )
  }

  toggle () {
    mapActions.toggleLandsat();
  }
}

LandsatLayer.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
