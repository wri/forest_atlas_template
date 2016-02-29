define([], function () {
  "use strict";

    var o = {

        aboutLinkUrl: "http://gab.forest-atlas.org/",

        country: "GAB",

        countryFlagRight: 280,

        countryTextWidth: 260,

        defaultLanguage: "en",

        defaultTitle: "Forest Atlas of Gabon",

        defaultLayerTransparency: 100,

        excludeDocumentsTab: false,

        documentDirectory: "http://gab.forest-atlas.org/resources/docs/",

        documentMapserver: "http://gis.forest-atlas.org/arcgis/rest/services/GAB/documents_administratifs/MapServer",

        downloadDataUrl: "http://gab-data.forest-atlas.org/",

        flagLinkPath: "http://www.eaux-forets.gouv.ga/",

        flagPath: "app/images/GAB_flag_new.png",

        flagTitle: "Ministry of Forest and Wildlife",

        layersToHide: [6, 7, 8, 12, 13],
        // layersToHide: [5, 6, 7, 8, 12, 13],

        mapThemes: [
          {
            "label": "Forest Atlas of Democratic Republic of Congo",
            "value": "http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687"
          },
          {
            "label": "Forest Atlas of Equatorial Guinea",
            "value": "http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19"
          }
        ],

        mapThemesAlternate: [
          {
            "label": "Testing Congo",
            "value": "http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687"
          },
          {
            "label": "Testing Guinea",
            "value": "http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19"
          }
        ],

        maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/country_masks/eth_country_mask/MapServer",
        // maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer",

        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/GAB/GABExportWebMap/GPServer/Export%20Web%20Map",

        secondLanguage: "fr",

        secondLanguageTitle: "Atlas Forestier du Gabon",

        secondLanguageFlagTitle: "Ministère des Forêts et de la Faune",

        useAdditionalLanguage: true,

        webMapID: "fa499ab4cc9e4a308411b64c9ab2b749",
        // webMapID: "10db57b5316749478d5287155760fd14",

        // NOW FOR THE LAYER SETTINGS
        // These are placeholders, they currently do nothing but they will soon control which layers/analysis types are visible
        activeFiresIncluded: true,

        landCoverIncluded: true,

        iflIncluded: true,

        biomassIncluded: true,

        // NOT PRESENT IN THE APPLICATION YET
        formaIncluded: false,

        terraIncluded: false,

        imazonIncluded: false,

        globcoverIncluded: false,

        mangroveIncluded: false,

        // Restoration Options
        restorationModule: true,

        restorationImageServer: 'http://gis-gfw.wri.org/arcgis/rest/services/country_data/ETH_Restoration/ImageServer',

        // May Also need Tree Cover, Slope, Land Cover, Population ids
        // We need to standardize some of this, allowing configuration of these may open the door for
        // configuring classes, values, and colors for each one, and they would have to be in a specific order
        // This will make the potential for error extremely high as this is too many options to configure in too specific
        // of an order

        /**
        * These are the options configured for the restoration module, the labels will be prefixed with
        * 'Potential for ', id should be the raster id in the service
        */
        restorationModuleOptions: [
          {
            id: '$9',
            label: 'establishing natural forest outside of cropland'
          }, {
            id: '$10',
            label: 'restocking of degraded natural forest'
          }, {
            id: '$6',
            label: 'agri-silviculture and agro-silvo-pastoralism'
          }, {
            id: '$11',
            label: 'silvo-pastoralism'
          }, {
            id: '$13',
            label: 'woodlot'
          }, {
            id: '$8',
            label: 'commercial plantation on bare soil and shrubland'
          }, {
            id: '$7',
            label: 'commercial plantation as buffer zone to national forest priority areas and protected areas'
          }, {
            id: '$12',
            label: 'tree-based buffer zone along rivers, lakes and reservoirs'
          }
        ],

        /** TODO: In the configuraiton panel, it should be noted that this is the order of the classes
        * in the image service, and also that these start at Value 2, 0 usually includes unmatched, 1 should
        * be no data, so the below could look like [nulls, No Data, Potential for commercial .., .., etc.]
        */
        slopeAnalysisRestorationOptions: [
          'Potential for commercial plantation on bare soil and shrubland only',
          'Potential for agri-silviculture and agro-silvo-pastoralism, and woodlot',
          'Potential for establishing natural forest only',
          'Potential for restocking degraded natural forest only',
          'Potential for woodlot only',
          'Potential for silvo-pastoralism only',
          'Potential for tree-buffer zone along rivers, lakes and reservoirs only',
          'Potential for commercial plantation as buffer zone around (NF)PAs',
          'Two restoration options identified as having potential',
          'Three or more restoration options identified as having potential'
        ],

        slopeAnalysisRestorationColors: [
          '#EAC7FD',
          '#FDB22E',
          '#587E0F',
          '#D29374',
          '#F5D08B',
          '#B1B124',
          '#1AB090',
          '#AF0F8F',
          '#D9FEC7',
          '#FFFE89'
        ],

        slopeOptionNames: [
          { label: 'No Data', value: 0},
          { label: '<= 30%', value: 1 },
          { label: '30% - 60%', value: 2 },
          { label: '> 60%', value: 3 }
        ],

        slopeColors: ['#000', '#FFEBAF', '#737300', '#A80000'],

        treeCoverOptionNames: [
          { label: 'No Data', value: 0 },
          { label: '<= 10%', value: 1 },
          { label: '10 - 30%', value: 2 },
          { label: '> 30%', value: 3 }
        ] ,

        treeCoverColors: ['#000', '#B4D79E', '#F5F57A', '#CDAA66']

    };

    // This should NEVER be directly edited, edit the properties above, this object is usually created in code at runtime
    // but if there is no appid and the app cannot read info from AGOL, it will need to use this as a default for
    // the usable language(s)
    o.appLanguages = {};

    o.appLanguages[o.defaultLanguage] = {
      title: o.defaultTitle,
      flagTitle: o.flagTitle
    };

    if (o.useAdditionalLanguage) {
      o.appLanguages[o.secondLanguage] = {
        title: o.secondLanguageTitle,
        flagTitle: o.secondLanguageFlagTitle
      };
    }

    return o;

});
