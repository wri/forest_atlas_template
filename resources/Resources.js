define([], function () {
  "use strict";

    // TODO: This will later be broken into different sections based on what the user can configure in AGOL,
    // for now, its in Alphabetical order because its easier to make sure we are not missing any keys that are in AGOL

    var o = {

        aboutLinkUrl: "http://gab.forest-atlas.org/",

        country: "GAB",

        countryFlagRight: 280,

        countryTextWidth: 260,

        defaultLanguage: "en",

        defaultTitle: "Forest Atlas of Gabon",

        documentDirectory: "http://gab.forest-atlas.org/resources/docs/",

        documentMapserver: "http://gis.forest-atlas.org/arcgis/rest/services/GAB/documents_administratifs/MapServer",

        downloadDataUrl: "http://gab-data.forest-atlas.org/",

        flagLinkPath: "http://www.eaux-forets.gouv.ga/",

        flagPath: "app/images/GAB_flag_new.png",

        flagTitle: "Ministry of Forest and Wildlife",

        layersToHide: [5, 6, 7, 8, 12, 13],

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

        maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer",

        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/GAB/GABExportWebMap/GPServer/Export%20Web%20Map",

        secondLanguage: "fr",

        secondLanguageTitle: "Atlas Forestier du Gabon",

        secondLanguageFlagTitle: "Ministère des Forêts et de la Faune",

        useAdditionalLanguage: true,

        webMapID: "10db57b5316749478d5287155760fd14",

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
