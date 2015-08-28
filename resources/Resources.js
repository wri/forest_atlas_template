define([], function() {

    // TODO: This will later be broken into different sections based on what the user can configure in AGOL,
    // for now, its in Alphabetical order because its easier to make sure we are not missing any keys that are in AGOL

    var o = {

        aboutLinkUrl: 'http://www.wri.org/our-work/project/congo-basin-forests/gabon#project-tabs',

        country: 'GAB',

        countryFlagRight: 280,

        countryTextWidth: 260,

        defaultLanguage: 'en',

        defaultTitle: 'Forest Atlas of Gabon',

        documentDirectory: 'https://wri-public-data.s3.amazonaws.com/forest_atlas/cmr/doc_pdf/',

        documentMapserver: 'http://54.88.79.102/arcgis/rest/services/CMR/documents_administratifs/MapServer',

        downloadDataUrl: 'http://data.globalforestwatch.org/',

        flagLinkPath: 'http://www.eaux-forets.gouv.ga/',

        flagPath: 'app/images/GAB_flag_new.png',

        flagTitle: 'Ministry of Forest, Environment and Protection of Natural Resources',

        layersToHide: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19],

        // Available Map Themes, These are completely controlled from the template, there are no default values
        // other then an empty array
        mapThemes: [],

        mapThemesAlternate: [],

        maskMapUrl: 'http://gis-forest-atlas.wri.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer',

        printURL: 'http://gis-forestatlas.wri.org/arcgis/rest/services/GAB/GABExportWebMap/GPServer/Export%20Web%20Map',

        secondLanguage: 'fr',

        secondLanguageTitle: 'Atlas Forestier du Gabon',

        secondLanguageFlagTitle: 'Ministère de la Forêt, de l’Environnement et de la Protection des Ressources Naturelles',

        useAdditionalLanguage: true,

        webMapID: '10db57b5316749478d5287155760fd14',

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

        mangroveIncluded: false

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
