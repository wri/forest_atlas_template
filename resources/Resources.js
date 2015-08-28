define([], function() {

    // TODO: This will later be broken into different sections based on what the user can configure in AGOL,
    // for now, its in Alphabetical order because its easier to make sure we are not missing any keys that are in AGOL

    var o = {

        aboutLinkUrl: 'http://cmr.forest-atlas.org/',

        country: 'CMR',

        countryFlagRight: 300,

        countryTextWidth: 260,

        defaultLanguage: 'en',

        defaultTitle: 'Forest Atlas of Cameroon',

        documentDirectory: 'http://cmr.forest-atlas.org/resources/docs/',

        documentMapserver: 'http://gis.forest-atlas.org/arcgis/rest/services/CMR/documents_administratifs/MapServer',

        downloadDataUrl: 'http://cmr-data.forest-atlas.org',

        flagLinkPath: 'http://www.minfof.cm/',

        flagPath: 'app/images/CMR_flag_new.png',

        flagTitle: 'Ministry of Forest and Wildlife',

        layersToShow: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

        // Available Map Themes, These are completely controlled from the template, there are no default values
        // other then an empty array
        mapThemes: [],

        mapThemesAlternate: [],

        maskMapUrl: 'http://gis.forest-atlas.org/arcgis/rest/services/CMR/CMR_00_Africa/MapServer',

        printURL: 'http://gis.forest-atlas.org/arcgis/rest/services/CMR/CMRExportWebMap/GPServer/Export%20Web%20Map',

        secondLanguage: 'fr',

        secondLanguageTitle: 'Atlas Forestier du Cameroun',

        secondLanguageFlagTitle: 'Ministère des Forêts et de la Faune',

        useAdditionalLanguage: true,

        webMapID: 'b96ee7fcd75e405dbf9a8b5a44ae734a',

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