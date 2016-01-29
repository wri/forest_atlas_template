import layerKeys from 'constants/LayerConstants';
import strings from 'strings';

const config = {
  map: {
    options: {
      navigationMode: 'css-transforms',
      force3DTransforms: true,
      showAttribution: false,
      // smartNavigation: false,
      fadeOnZoom: true,
      slider: false,
      logo: false
    }
  },

  /**
  * Layer Config Options, brackets are optional
  * if type is anything other than graphic and the layer is not disabled, it must have a url
  * id - {string} - layer Id, must be unique
  * [order] - {number} - determines layer order on map, 1 is the bottom and higher numbers on top
  * type - {string} - layer type (dynamic, image, feature, tiled, webtiled)
  * [label] - {string} - label in the layer list in the UI
  * [group] - {string} - group in the UI, either 'watershed' (curr. Know Your Watershed in UI) or 'watershedRisk (curr. Identifie Watershed Risks in UI)'
  * - No group means it won't show in the UI
  * [url] - {string} - Url for the map service, if present the app will attempt to add to the map via the LayerFactory,
  * [disabled] - {boolean} - grey the checkbox out in the UI and prevent user from using it
  * - can also be updated dynamically if a layer fails to be added to the map to block the user from interacting with a down service
  * [miscellaneous layer params], layerIds, opacity, colormap, inputRange, outputRange
  * - Add any extra layer params as needed, check LayerFactory to see which ones are supported and feel free to add more if necessary
  * - type should be what the layer contructor expects, these are directly passed to Esri JavaScript layer constructors
  */
  layers: [
    {
      id: layerKeys.LOSS,
      order: 1,
      type: 'image',
      visible: true,
      group: 'landCoverDynamics',
      label: strings.LOSS_LABEL,
      sublabel: strings.LOSS_SUB_LABEL,
      url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestCover_lossyear/ImageServer',
      colormap: [[1, 219, 101, 152]],
      inputRange: [1, 15],
      outputRange: [1]
    },
    {
      id: layerKeys.GAIN,
      order: 2,
      type: 'tiled',
      visible: true,
      group: 'landCoverDynamics',
      label: strings.GAIN_LABEL,
      sublabel: strings.GAIN_SUB_LABEL,
      url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestGain_2000_2012_map/MapServer'
    },
    {
      id: layerKeys.ACTIVE_FIRES,
      order: 5,
      type: 'dynamic',
      group: 'landCoverDynamics',
      label: strings.ACTIVE_FIRES_LABEL,
      sublabel: strings.ACTIVE_FIRES_SUB_LABEL,
      url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      layerIds: [0, 1, 2, 3]
    },
    {
      id: layerKeys.TREE_COVER,
      order: 3,
      type: 'image',
      group: 'landCover',
      label: strings.TREE_COVER_LABEL,
      sublabel: strings.TREE_COVER_SUB_LABEL,
      url: 'http://50.18.182.188:6080/arcgis/rest/services/TreeCover2000/ImageServer',
      colormap: [[1, 174, 203, 107]],
      inputRange: [30, 101],
      outputRange: [1],
      opacity: 0.8
    },
    {
      id: layerKeys.LAND_COVER,
      order: 4,
      type: 'dynamic',
      group: 'landCover',
      label: strings.LAND_COVER_LABEL,
      layerIds: [0]
    }
  ]
};

export const mapConfig = config.map;
export const layerConfig = config.layers;
