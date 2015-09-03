define([], function () {
  "use strict";

    // TODO: This will later be broken into different sections based on what the user can configure in AGOL,
    // for now, its in Alphabetical order because its easier to make sure we are not missing any keys that are in AGOL

    var o = {

        aboutLinkUrl: "http://gnq.forest-atlas.org/",

        country: "GNQ",

        countryFlagRight: 170,

        countryTextWidth: 260,

        defaultLanguage: "en",

        defaultTitle: "Forest Atlas of Equatorial Guinea",

        documentDirectory: "http://gnq.forest-atlas.org/resources/docs/",

        documentMapserver: "http://gis.forest-atlas.org/arcgis/rest/services/GNQ/documents_administratifs/MapServer",

        downloadDataUrl: "http://gnq-data.forest-atlas.org/",

        flagLinkPath: "http://www.guineaecuatorialpress.com/noticia.php?id=126&lang=en",

        flagPath: "app/images/GNQ_flag.png",

        flagTitle: "Ministry of Agriculture and Forestry",

        layersToHide: [],

        // Available Map Themes, These are completely controlled from the template, there are no default values
        // other then an empty array
        mapThemes: [],

        mapThemesAlternate: [],

        maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/GNQ/00_Africa/MapServer",

        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/GNQ/GNQExportWebMap/GPServer/Export%20Web%20Map",

        secondLanguage: "es",

        secondLanguageTitle: "Atlas Forestal de la República de Guinea Ecuatorial",

        secondLanguageFlagTitle: "Ministerio de Agricultura y Bosques",

        useAdditionalLanguage: true,

        webMapID: "9d8b867cd4634577b014bd00fe100d9c",

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