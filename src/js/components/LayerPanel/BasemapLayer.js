import mapActions from 'actions/MapActions';

import React, {
  Component,
  PropTypes
} from 'react';

export default class BasemapLayer extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  render () {
    return (
      <div className='layer-basemap' onClick={this.changeBasemap.bind(this)}>
        <span className={`layer-basemap-icon ${this.props.basemap.toLowerCase()}`}>
          <img src={`${this.props.icon}`} />
        </span>
        <span className='layer-basemap-label'>{this.props.label}</span>
      </div>
    );
  }

  changeBasemap () {
    mapActions.changeBasemap(this.context.map, this.props.basemap);
  }
}

BasemapLayer.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
