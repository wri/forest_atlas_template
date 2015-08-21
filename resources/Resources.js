define([], function() {

    var o = {

        //country code
        country: "CMR",

        //languages
        appLanguages: {
            "en": {
                title: "Forest Atlas of Cameroon",
                flagTitle: "Ministry of Forest and Wildlife"
            },
            "fr": {
                title: "Atlas Forestier du Cameroun",
                flagTitle: "Ministère des Forêts et de la Faune"
            }
        },

        layersToShow: [],

        maskMapUrl: "http://gis-forest-atlas.wri.org/arcgis/rest/services/CMR/CMR_00_africa/MapServer",

        // Not in Configuration Panel
        webMapID: "b96ee7fcd75e405dbf9a8b5a44ae734a",

        // Not in Configuration Panel
        basemap: "national-geographic",
        //graphics default transparency
        // Not in Configuration Panel
        defaultLayerTransparency: 80,
        // Not in Configuration Panel
        geometryServiceURL: "http://gis-forest-atlas.wri.org/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        //flag
        countryFlagRight: "300px",
        countryTextWidth: "260px",
        flagPath: "app/images/CMR_flag_new.png",
        flagLinkPath: "http://www.minfof.cm/",

        //legislative text
        pdfURL: "http://cmr.forest-atlas.org/doc_pdf/",

        aboutLinkUrl: "http://cmr.forest-atlas.org/",

        // Download Data URL
        downloadDataUrl: "http://cmr-data.forest-atlas.org/",

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
