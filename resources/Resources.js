define([], function () {
  "use strict";

    // TODO: This will later be broken into different sections based on what the user can configure in AGOL,
    // for now, its in Alphabetical order because its easier to make sure we are not missing any keys that are in AGOL

    var o = {

        aboutLinkUrl: "http://cod.forest-atlas.org/",

        country: "COD",

        countryFlagRight: 280,

        countryTextWidth: 260,

        defaultLanguage: "en",

        defaultTitle: "Forest Atlas of Congo",

        documentDirectory: "http://cog.forest-atlas.org/resources/docs/",

        documentMapserver: "http://gis.forest-atlas.org/arcgis/rest/services/COG/documents_administratifs/MapServer",

        downloadDataUrl: "http://cog-data.forest-atlas.org/",

        flagLinkPath: "http://www.mefdd.cg/",

        flagPath: "app/images/COG_flag.png",

        flagTitle: "Ministry of Forest Economics and Sustainable Developement",

        layersToHide: [5,6,7,8,12,13],

        // Available Map Themes, These are completely controlled from the template, there are no default values
        // other then an empty array
        mapThemes: [],

        mapThemesAlternate: [],

        maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/COG/COG_00_africa/MapServer",

        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/COG/COGExportWebMap/GPServer/Export%20Web%20Map",

        secondLanguage: "fr",

        secondLanguageTitle: "Atlas Forestier de la République du Congo",

        secondLanguageFlagTitle: "Ministère de l’Économie Forestière et du Développement Durable",

        useAdditionalLanguage: true,

        webMapID: "abb18c1bfdd74cc9982d6535d2451692",

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