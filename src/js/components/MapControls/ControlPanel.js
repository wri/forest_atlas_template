import {prepareStateForShare} from 'utils/shareUtils';
import modalActions from 'actions/ModalActions';
import mapActions from 'actions/MapActions';
import {toQuery} from 'utils/params';
import React, {
  Component,
  PropTypes
} from 'react';


//- SVG Elements
const zoomInSvg = '<use xlink:href="#icon-plus" />';
const zoomOutSvg = '<use xlink:href="#icon-minus" />';
const shareSvg = '<use xlink:href="#icon-share" />';
const drawSvg = '<use xlink:href="#icon-draw-upload" />';
const homeSvg = '<use xlink:href="#icon-home" />';
const searchSvg = '<use xlink:href="#icon-control-search" />';

export default class ControlPanel extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  zoomIn = () => {
    const {map} = this.context;
    map.setZoom(map.getZoom() + 1);
  };

  zoomOut = () => {
    const {map} = this.context;
    map.setZoom(map.getZoom() - 1);
  };

  goHome = () => {
    const {map} = this.context;
    map.setExtent(map._params.extent);
  };

  search = () => {

  };

  share = () => {
    const {map, language, settings} = this.context;
    let shareState = prepareStateForShare({
      map: map,
      language: language,
      settings: settings
    });
    modalActions.showShareModal(toQuery(shareState));
  };

  showAnalysisTools = () => {
    mapActions.toggleAnalysisModal({ visible: true });
  };

  render () {
    return (
      <div className='control-panel map-component shadow'>
        <ul className='control-panel__list'>
          <li className='control-panel__zoom-out pointer' title='Zoom Out' onClick={this.zoomOut}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomOutSvg }}/>
          </li>
          <li className='control-panel__zoom-in pointer' title='Zoom In' onClick={this.zoomIn}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
          <li className='control-panel__share-map pointer' title='Share' onClick={this.share}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: shareSvg }}/>
          </li>
          <li className='control-panel__home pointer' title='Home' onClick={this.goHome}>
            <svg className='svg-icon control-panel__svg-icon--home' dangerouslySetInnerHTML={{ __html: homeSvg }}/>
          </li>
          <li className='control-panel__draw-upload pointer' title='Analysis' onClick={this.showAnalysisTools}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: drawSvg }}/>
          </li>
          <li className='control-panel__locate-me pointer' title='Search' onClick={this.search}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: searchSvg }}/>
          </li>
        </ul>
      </div>
    );
  }

}
