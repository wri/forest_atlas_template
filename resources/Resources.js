define([], function() {

    var o = {

        //country code
        country: "GAB",

        //languages
        appLanguages: {
            "en": {
                title: "Forest Atlas of Gabon",
                flagTitle: "Ministry of Forest, Environment and Protection of Natural Resources"
            },
            "fr": {
                title: "Atlas Forestier du Gabon",
                flagTitle: "Ministère de la Forêt, de l’Environnement et de la Protection des Ressources Naturelles"
            }
        },

        layersToShow: [],

        maskMapUrl: "http://gis-forest-atlas.wri.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer",

        // Not in Configuration Panel
        webMapID: "10db57b5316749478d5287155760fd14",

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
        flagPath: "app/images/GAB_flag_new.png",
        flagLinkPath: "http://www.eaux-forets.gouv.ga/",

        //legislative text
        pdfURL: "http://gab.forest-atlas.org/doc_pdf/",

        aboutLinkUrl: "http://gab.forest-atlas.org",

        // Download Data URL
        downloadDataUrl: "http://gab-data.forest-atlas.org/",

        //print image
        printURL: "http://gis-forest-atlas.wri.org/arcgis/rest/services/GAB/GABExportWebMap/GPServer/Export%20Web%20Map",

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
