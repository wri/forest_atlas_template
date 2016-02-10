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
  }

};
