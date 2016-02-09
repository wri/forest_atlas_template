import layerActions from 'actions/LayerActions';
import modalActions from 'actions/ModalActions';
import LayersHelper from 'helpers/LayersHelper';
import LayerTransparency from './LayerTransparency';
import React, { PropTypes } from 'react';
import text from 'js/languages';

// Info Icon Markup for innerHTML
let useSvg = '<use xlink:href="#shape-info" />';

export default class LayerCheckbox extends React.Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      if (this.props.checked) {
        LayersHelper.showLayer(this.props.layer.id);
      } else {
        LayersHelper.hideLayer(this.props.layer.id);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked || this.props.children;
  }

  render() {
    let {layer} = this.props;
    let {language} = this.context;
    let label = text[language][layer.label];
    let sublabel = text[language][layer.sublabel];

    return (
      <div className={`layer-checkbox relative ${layer.className}${this.props.checked ? ' active' : ''}${layer.disabled ? ' disabled' : ''}`} >
        <span onClick={this.toggleLayer.bind(this)} className='toggle-switch pointer'><span/></span>
        <span onClick={this.toggleLayer.bind(this)} className='layer-checkbox-label pointer'>{label}</span>
        {!sublabel ? null : <div className='layer-checkbox-sublabel'>{sublabel}</div>}
        <span className='info-icon pointer' onClick={this.showInfo.bind(this)}>
          <svg dangerouslySetInnerHTML={{ __html: useSvg }}/>
        </span>
        <LayerTransparency layer={layer} visible={this.props.checked}></LayerTransparency>
        {!this.props.children ? null :
          <div className={`layer-content-container ${this.props.checked ? '' : 'hidden'}`}>
            {this.props.children}
          </div>
        }
      </div>
    );
  }

  showInfo () {
    console.log('showInfo for layer', this.props.layer.id);
    let layer = this.props.layer;
    if (layer.disabled) { return; }
    modalActions.showLayerInfo(this.props.layer.id);
  }

  toggleLayer () {
    let layer = this.props.layer;
    if (layer.disabled) { return; }
    if (this.props.checked) {
      layerActions.removeActiveLayer(layer.id);
    } else {
      layerActions.addActiveLayer(layer.id);
    }
  }

}

LayerCheckbox.propTypes = {
  layer: React.PropTypes.object.isRequired,
  checked: React.PropTypes.bool.isRequired
};
