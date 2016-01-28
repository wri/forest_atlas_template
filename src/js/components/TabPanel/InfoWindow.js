import React, {Component} from 'react';

export default class InfoWindow extends Component {

  render () {
    var {infoWindow} = this.props.map;

    return (
      <div dangerouslySetInnerHTML={{ __html: infoWindow._contentPane.innerHTML }}></div>
    );
  }

}

InfoWindow.propTypes = {
  map: React.PropTypes.object.isRequired
};
