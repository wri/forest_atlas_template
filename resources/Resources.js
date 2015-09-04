define([], function () {
  "use strict";

    // TODO: This will later be broken into different sections based on what the user can configure in AGOL,
    // for now, its in Alphabetical order because its easier to make sure we are not missing any keys that are in AGOL

    var o = {

        aboutLinkUrl: "http://caf.forest-atlas.org",

        country: "CAF",

        countryFlagRight: 280,

        countryTextWidth: 260,

        defaultLanguage: "en",

        defaultTitle: "Forest Atlas of Central African Republic",

        documentDirectory: "http://caf.forest-atlas.org/resources/docs/",

        documentMapserver: "http://gis.forest-atlas.org/arcgis/rest/services/CAF/documents_administratifs/MapServer",

        downloadDataUrl: "http://caf-data.forest-atlas.org/",

        flagLinkPath: "http://caf.forest-atlas.org",

        flagPath: "app/images/CAF_flag.png",

        flagTitle: "Ministry of Water, Forests, Hunting and Fishing",

        layersToHide: [],

        // Available Map Themes, These are completely controlled from the template, there are no default values
        // other then an empty array
        mapThemes: [],

        mapThemesAlternate: [],

        maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/CAF/country_mask/MapServer",

        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/CAF/CAFExportWebMap/GPServer/Export%20Web%20Map",

        secondLanguage: "fr",

        secondLanguageTitle: "Atlas Forestier de la République Centrafricaine",

        secondLanguageFlagTitle: "Ministère des Eaux, Forêts, Chasse et Pêche",

        useAdditionalLanguage: true,

        webMapID: "2b990a56346c4d20950128132771d63b",

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