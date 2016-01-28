import React, {Component} from 'react';


//- SVG Elements
const zoomInSvg = '<use xlink:href="#icon-plus" />';
const zoomOutSvg = '<use xlink:href="#icon-minus" />';
const shareSvg = '<use xlink:href="#icon-share" />';
const basemapSvg = '<use xlink:href="#icon-basemap" />';
const homeSvg = '<use xlink:href="#icon-home" />';

export default class ControlPanel extends Component {

  zoomIn = () => {
    let {map} = this.props;
    map.setZoom(map.getZoom() + 1);
  };

  zoomOut = () => {
    let {map} = this.props;
    map.setZoom(map.getZoom() - 1);
  };

  goHome = () => {
    let {map} = this.props;
    map.setExtent(map._params.extent);
  };

  render () {
    return (
      <div className='control-panel map-component shadow'>
        <ul className='control-panel__list'>
          <li className='control-panel__zoom-in pointer' title='Zoom In' onClick={this.zoomIn}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
          <li className='control-panel__zoom-out pointer' title='Zoom Out' onClick={this.zoomOut}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomOutSvg }}/>
          </li>
          <li className='control-panel__share-map pointer' title='Share' onClick={this.share}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: shareSvg }}/>
          </li>
          <li className='control-panel__home pointer' title='Home' onClick={this.goHome}>
            <svg className='svg-icon control-panel__svg-icon--home' dangerouslySetInnerHTML={{ __html: homeSvg }}/>
          </li>
          <li className='control-panel__basemap-layers pointer' title='Basemaps' onClick={this.toggleBasemapGallery}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: basemapSvg }}/>
          </li>
          <li className='control-panel__locate-me pointer' title='Locate Me' onClick={this.locateMe}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: '' }}/>
          </li>
        </ul>
      </div>
    );
  }

}

ControlPanel.propTypes = {
  map: React.PropTypes.object.isRequired
};
