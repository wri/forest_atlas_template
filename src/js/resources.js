//- These are the defaults based on appid 1c38ba1095fe49e3ba234bf9105c1077

export default {

  defaultTitle: 'Forest Atlas of Cameroon',
  webmap: '49092330b20d425790b367ade0f8ef06',
  country: 'CMR',
  englishTitle: 'Forest Atlas of Cameroon',
  languageTitle: 'Atlas Forestier du Cameroun',
  layersToShow: '0, 1, 2, 7, 8, 9, 10, 11, 12, 13, 14',
  maskMapUrl: 'http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_00_Africa/MapServer',
  flagTitle: 'Ministry of Forestry and Wildlife',
  languageFlagTitle: 'Ministère des Forêts et de la Faune',
  flagPath: 'app/images/CMR_flag_new.png',
  flagLinkPath: 'http://www.minep.gov.cm/index.php?lang=en',
  pdfURL: 'http://data.wri.org/forest_atlas/cmr/doc_pdf/',
  aboutLinkUrl: 'http://www.wri.org/our-work/project/congo-basin-forests/cameroon#project-tabs',
  downloadDataUrl: 'http://data.globalforestwatch.org/',
  printURL: 'http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMRExportWebMap/GPServer/Export%20Web%20Map',
  mapThemes: 'Forest Atlas of Democratic Republic of Congo, Forest Atlas of Equatorial Guinea',
  mapThemeIds: 'edfa3967f09f4236ae9249dd82265687, c76d788b7487476bae4d09a4e933be19',
  countryFlagRight: 280,
  mapThemesAlternate: 'Testing Congo, Testing Guinea',
  englishIsDefault: false,
  documentMapserver: 'http://54.88.79.102/arcgis/rest/services/CMR/documents_administratifs/MapServer',
  documentDirectory: 'https://wri-public-data.s3.amazonaws.com/forest_atlas/cmr/doc_pdf/',
  secondLanguage: 'fr',
  mapThemesOtherLanguage: 'Congo, Guinea',
  secondLanguageFlagTitle: 'Ministère des Forêts et de la Faune',
  secondLanguageTitle: 'Forest Atlas of Cameroon',
  defaultLanguage: 'en',
  useAdditionalLanguage: true,
  iflIncluded: true,
  layersToHide: '0,1,2',

  // Built in template.js for applications, these are defaults, do not modify structure
  labels: {
    'en': {
      'title': 'Forest Atlas of Cameroon',
      'flagTitle': 'Ministry of Forestry and Wildlife',
      'themes': [{
        'label': 'Forest Atlas of Democratic Republic of Congo',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687'
      }, {
        'label': 'Forest Atlas of Equatorial Guinea',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19'
      }]
    },
    'fr': {
      'title': 'Atlas Forestier du Cameroon',
      'flagTitle': 'Ministère des Forêts et de la Faune',
      'themes': [{
        'label': 'Testing Congo',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687'
      }, {
        'label': 'Testing Guinea',
        'url': 'http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19'
      }]
    }
  },

  /**
  * Layer Config Options, brackets are optional
  * if type is anything other than graphic and the layer is not disabled, it must have a url
  * id - {string} - layer Id, must be unique
  * type - {string} - layer type (dynamic, image, feature, tiled, webtiled)
  * [order] - {number} - determines layer order on map, 1 is the bottom and higher numbers on top
  * [label] - {string} - Label in the UI, should be an object with atleast the configured languages prefixed
  * [sublabel] - {string} - Label in the UI, should be an object with atleast the configured languages prefixed
  * [group] - {string} - group in the UI, No group means it won't show in the UI
  * [url] - {string} - Url for the map service, if present the app will attempt to add to the map via the LayerFactory,
  * [disabled] - {boolean} - grey the checkbox out in the UI and prevent user from using it
  * - can also be updated dynamically if a layer fails to be added to the map to block the user from interacting with a down service
  * [miscellaneous layer params], layerIds, opacity, colormap, inputRange, outputRange
  * - Add any extra layer params as needed, check LayerFactory to see which ones are supported and feel free to add more if necessary
  * - type should be what the layer contructor expects, these are directly passed to Esri JavaScript layer constructors
  */
  layers: [
    {
      id: 'TREE_COVER_LOSS',
      order: 1,
      type: 'image',
      visible: true,
      group: {
        'en': 'Land Cover Dynamics',
        'fr': 'Land Cover Dynamics',
        'es': 'Land Cover Dynamics',
        'pt': 'Land Cover Dynamics'
      },
      label: {
        'en': 'Tree cover loss',
        'fr': 'Tree cover loss',
        'es': 'Tree cover loss',
        'pt': 'Tree cover loss'
      },
      sublabel: {
        'en': '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
        'fr': '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
        'es': '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
        'pt': '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)'
      },
      url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestCover_lossyear/ImageServer',
      colormap: [[1, 219, 101, 152]],
      inputRange: [1, 15],
      outputRange: [1]
    },
    {
      id: 'TREE_COVER_GAIN',
      order: 2,
      type: 'tiled',
      visible: true,
      group: {
        'en': 'Land Cover Dynamics',
        'fr': 'Land Cover Dynamics',
        'es': 'Land Cover Dynamics',
        'pt': 'Land Cover Dynamics'
      },
      label: {
        'en': 'Tree cover gain',
        'fr': 'Tree cover gain',
        'es': 'Tree cover gain',
        'pt': 'Tree cover gain'
      },
      sublabel: {
        'en': '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
        'fr': '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
        'es': '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)',
        'pt': '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)'
      },
      url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestGain_2000_2012_map/MapServer'
    },
    {
      id: 'ACTIVE_FIRES',
      order: 5,
      type: 'dynamic',
      group: {
        'en': 'Land Cover Dynamics',
        'fr': 'Land Cover Dynamics',
        'es': 'Land Cover Dynamics',
        'pt': 'Land Cover Dynamics'
      },
      label: {
        'en': 'Active fires',
        'fr': 'Active fires',
        'es': 'Active fires',
        'pt': 'Active fires'
      },
      sublabel: {
        'en': '(daily, 1km, global, NASA)',
        'fr': '(daily, 1km, global, NASA)',
        'es': '(daily, 1km, global, NASA)',
        'pt': '(daily, 1km, global, NASA)'
      },
      url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
      layerIds: [0, 1, 2, 3]
    },
    {
      id: 'TREE_COVER',
      order: 3,
      type: 'image',
      group: {
        'en': 'Land Cover',
        'fr': 'Land Cover',
        'es': 'Land Cover',
        'pt': 'Land Cover'
      },
      label: {
        'en': 'Tree cover',
        'fr': 'Tree cover',
        'es': 'Tree cover',
        'pt': 'Tree cover'
      },
      sublabel: {
        'en': '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
        'fr': '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
        'es': '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)',
        'pt': '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)'
      },
      url: 'http://50.18.182.188:6080/arcgis/rest/services/TreeCover2000/ImageServer',
      colormap: [[1, 174, 203, 107]],
      inputRange: [30, 101],
      outputRange: [1],
      visible: true,
      opacity: 0.8
    },
    {
      id: 'LAND_COVER',
      order: 4,
      type: 'dynamic',
      group: {
        'en': 'Land Cover',
        'fr': 'Land Cover',
        'es': 'Land Cover',
        'pt': 'Land Cover'
      },
      label: {
        'en': 'Land cover',
        'fr': 'Land cover',
        'es': 'Land cover',
        'pt': 'Land cover'
      },
      layerIds: [0]
    }
  ]

};
