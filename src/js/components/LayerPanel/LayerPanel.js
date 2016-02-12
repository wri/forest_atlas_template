// import WaterStressLegend from 'components/LayerPanel/WaterStressLegend';
// import LandCoverLegend from 'components/LayerPanel/LandCoverLegend';
// import SedimentLegend from 'components/LayerPanel/SedimentLegend';
// import DensityDisplay from 'components/LayerPanel/DensityDisplay';
// import WetlandsLegend from 'components/LayerPanel/WetlandsLegend';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
// import FiresControls from 'components/LayerPanel/FiresControls';
// import LossControls from 'components/LayerPanel/LossControls';
import LayerGroup from 'components/LayerPanel/LayerGroup';
// import DamsLegend from 'components/LayerPanel/DamsLegend';
import mapStore from 'stores/MapStore';
// import layersHelper from 'js/helpers/LayersHelper';
import React, { PropTypes } from 'react';

export default class LayerPanel extends React.Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    this.setState(mapStore.getState());
  }

  renderLayerGroup = (group, layers) => {
    return (
      <LayerGroup key={group} activeLayers={this.state.activeLayers} label={group}>
        {layers.map(this.checkboxMap(group), this)}
      </LayerGroup>
    );
  };

  render() {
    const {settings, language} = this.context;
    const layers = settings.layers || [];
    let groups = [];
    //- Get a unique list of groups
    layers.forEach((layer) => {
      if (groups.indexOf(layer.group[language]) === -1) {
        groups.push(layer.group[language]);
      }
    });
    //- Create the layerGroup components
    let layerGroups = groups.map((group) => {
      return this.renderLayerGroup(group, layers, language);
    });

    return (
      <div className={`layer-panel custom-scroll`}>
        {layerGroups}
      </div>
    );
  }

  checkboxMap (group) {
    return layer => {
      let activeLayers = this.state.activeLayers;
      const {language} = this.context;
      // Exclude Layers not part of this group
      if (layer.group[language] !== group) { return null; }
      // TODO: Remove once current layer panel design is approved
      // If it is just a label, render the grop label
      // if (layer.isGroupLabel) { return <div key={layer.id} className='layer-group-label'>{layer.label}</div>; }
      // Some layers have legends or tools and they should be rendered inside the layer checkbox
      // let childComponent;
      // switch (layer.id) {
      //   case KEYS.waterStress:
      //     childComponent = <WaterStressLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   case KEYS.sediment:
      //     childComponent = <SedimentLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   case KEYS.majorDams:
      //     childComponent = <DamsLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   case KEYS.activeFires:
      //     childComponent = <FiresControls loaded={this.props.loaded} {...this.state} />;
      //     break;
      //   case KEYS.loss:
      //     childComponent = <LossControls loaded={this.props.loaded} {...this.state} />;
      //     break;
      //   case KEYS.treeCover:
      //     childComponent = <DensityDisplay {...this.state} />;
      //     break;
      //   case KEYS.landCover:
      //     childComponent = <LandCoverLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   case KEYS.wetlands:
      //     childComponent = <WetlandsLegend url={layer.url} layerIds={layer.layerIds} />;
      //     break;
      //   default:
      //     childComponent = null;
      // }

      // return <LayerCheckbox key={layer.id} layer={layer} checked={activeLayers.indexOf(layer.id) > -1}>
        // {childComponent}
      // </LayerCheckbox>;
      return <LayerCheckbox key={layer.id} layer={layer} checked={activeLayers.indexOf(layer.id) > -1}>
      </LayerCheckbox>;

    };
  }

}
