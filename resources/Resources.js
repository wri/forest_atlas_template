define([], function() {

    var o = {

        //country code
        country: "GAB",

        //languages
        appLanguages: {
            "en": {
                title: "Forest Atlas of Central African Republic",
                flagTitle: "Ministry of Water, Forest, Hunting and Fishing"
            },
            "fr": {
                title: "Atlas Forestier de la République Centrafricaine",
                flagTitle: "Ministère des Eaux, Forêts, Chasse et Pêche"
            }
        },

        layersToShow: [],

        maskMapUrl: "http://gis-forest-atlas.wri.org/arcgis/rest/services/CAF/CAF_00_africa/MapServer",

        // Not in Configuration Panel
        webMapID: "2b990a56346c4d20950128132771d63b",

        // Not in Configuration Panel
        basemap: "national-geographic",
        //graphics default transparency
        // Not in Configuration Panel
        defaultLayerTransparency: 80,
        // Not in Configuration Panel
        geometryServiceURL: "http://gis-forest-atlas.wri.org/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        //flag
        countryFlagRight: "280px",
        countryTextWidth: "260px",
        flagPath: "app/images/CAF_flag_new.png",
        flagLinkPath: "http://caf.forest-atlas.org/",

        //legislative text
        pdfURL: "http://caf.forest-atlas.org/doc_pdf/",

        aboutLinkUrl: "http://caf.forest-atlas.org",

        // Download Data URL
        downloadDataUrl: "http://caf-data.forest-atlas.org/",

        //print image
        printURL: "http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMRExportWebMap/GPServer/Export%20Web%20Map",

        // Available Map Themes, These are completely controlled from the template, there are no default values
        // other then an empty array
        mapThemes: [],
        mapThemesAlternate: [],

        // toolsContainerFlag: "no_ministry_logo_sm.png",

        // toolsFlagContainerLink: "http://www.regjeringen.no/en/dep/kld.html?id=668",

        // true means this analysis will be performed, false means it will not be performed
        // analysisSets: {
        //     ifl: true,
        //     carbon: true,
        //     landCover: true,
        //     treeDensity: true,
        //     protectedArea: true,
        //     primForest: true,
        //     legal: true,
        //     peat: true,
        //     rspo: true
        // },

        // analysisCategories: {
        //     // These may not need to be in here depending on how much cusotmmizaiton
        //     // we want each application to have
        //     hansen: true, // tree cover loss
        //     forma: true, // clearance alerts
        //     fires: true
        // }

    };

    return o;
});
