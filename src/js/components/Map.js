import AnalysisModal from 'components/Modals/AnalysisModal';
import Controls from 'components/MapControls/ControlPanel';
import Legend from 'components/LegendPanel/LegendPanel';
import TabButtons from 'components/TabPanel/TabButtons';
import SearchModal from 'components/Modals/SearchModal';
import PrintModal from 'components/Modals/PrintModal';
import {applyStateFromUrl} from 'utils/shareUtils';
import TabView from 'components/TabPanel/TabView';
import arcgisUtils from 'esri/arcgis/utils';
import mapActions from 'actions/MapActions';
import {getUrlParams} from 'utils/params';
import MapStore from 'stores/MapStore';
import {mapConfig} from 'js/config';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Map extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  static childContextTypes = {
    webmapInfo: PropTypes.object,
    map: PropTypes.object
  };

  getChildContext = () => {
    return {
      webmapInfo: this.webmapInfo,
      map: this.map
    };
  };

  constructor (props) {
    super(props);
    this.map = {};
    this.webmapInfo = {};
    this.state = MapStore.getState();
  }

  componentDidMount() {
    MapStore.listen(this.storeDidUpdate);
  }

  componentDidUpdate (prevProps) {
    const settings = this.props.settings;
    if (prevProps.settings.webmap !== settings.webmap) {
      this.createMap(settings);
    }
  }

  storeDidUpdate = () => {
    this.setState(MapStore.getState());
  };

  createMap = (settings) => {
    const {language} = this.context;
    arcgisUtils.createMap(settings.webmap, this.refs.map, { mapOptions: mapConfig.options }).then(response => {
      this.webmapInfo = response.itemInfo.itemData;
      // Add operational layers from the webmap to the array of layers from the config file.
      let {itemData} = response.itemInfo;
      itemData.operationalLayers.forEach((ol) => {
        // TODO:  filter out layers specific to selected language.
        settings.layers[language].push({
          id: ol.id,
          group: settings.webmapMenuName,
          label: ol.title,
          opacity: ol.opacity,
          visible: ol.visibility,
          esriLayer: ol.layerObject
        });
      });
      this.map = response.map;
      // Remove any basemap or reference layers so they don't interfere with the
      // basemap switcher in the layer panel works.
      let basemap = itemData && itemData.baseMap;
      if (basemap.baseMapLayers.length) {
        basemap.baseMapLayers.forEach(bm => this.map.removeLayer(bm.layerObject));
        // TODO:  figure out how to go from webmap basemap to string expected by setBasemap().
        this.map.setBasemap('topo');
      }
      this.map.graphics.clear();
      mapActions.mapUpdated();
      this.map.infoWindow.set('popupWindow', false);
      //- Attach events I need for the info window
      this.map.infoWindow.on('show, hide, set-features, selection-change', (evt) => {
        mapActions.mapUpdated(evt);
      });
      //- When custom features are clicked, apply them to the info window, this will trigger above event
      this.map.graphics.on('click', (evt) => {
        evt.stopPropagation();
        this.map.infoWindow.setFeatures([evt.graphic]);
      });
      //- Load any shared state if available
      applyStateFromUrl(this.map, getUrlParams(location.search));
      //- Make the map a global in debug mode for easier debugging
      if (brApp.debug) { brApp.map = this.map; }

      /** TODO: Add some kind of transformer here, something like this
      * someUtil.addWebmapLayers(settings.layers, response.map);
      * It could create layer config from the webmap layers and push it into settings.layers
      */
      mapActions.createLayers(this.map, settings.layers[language]);
      mapActions.createLegend(this.map, settings.layers[language]);
    });
  };

  render () {
    const {activeTab, printModalVisible, analysisModalVisible, searchModalVisible} = this.state;

    return (
      <div className='map-container'>
        <div ref='map' className='map'>
          <Controls />
          <TabButtons activeTab={activeTab} />
          <TabView activeTab={activeTab} {...this.state} />
          <Legend />
        </div>
        <div className={`analysis-modal-container modal-wrapper ${analysisModalVisible ? '' : 'hidden'}`}>
          <AnalysisModal />
        </div>
        <div className={`print-modal-container modal-wrapper ${printModalVisible ? '' : 'hidden'}`}>
          <PrintModal />
        </div>
        <div className={`search-modal-container modal-wrapper ${searchModalVisible ? '' : 'hidden'}`}>
          <SearchModal />
        </div>
      </div>
    );
  }
}
