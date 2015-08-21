define([], function() {

    var o = {

        //country code
        country: "MY",

        //languages
        appLanguages: {
            "en": {
                title: "My Forest Atlas",
                flagTitle: "Global Forest Watch"
            },
            "fr": {
                title: "Mon Atlas Forestier",
                flagTitle: "Global Forest Watch"
            }
        },

        layersToShow: [],

        maskMapUrl: "",

        // Not in Configuration Panel
        webMapID: "504f7c405a5a488b96511135ec228cbf",

        // Not in Configuration Panel
        basemap: "national-geographic",
        //graphics default transparency
        // Not in Configuration Panel
        defaultLayerTransparency: 80,
        // Not in Configuration Panel
        geometryServiceURL: "http://gis.forest-atlas.org/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        //flag
        countryFlagRight: "280px",
        countryTextWidth: "260px",
        flagPath: "http://www.globalforestwatch.org/assets/logo-new-b989ed109810f4bc3ddfe0fb21d204bd.png",
        flagLinkPath: "http://www.globalforestwatch.org/",

        //legislative text
        pdfURL: "",

        aboutLinkUrl: "http://my.forest-atlas.org/",

        // Download Data URL
        downloadDataUrl: "http://data.globalforestwatch.org/",

        //print image
        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/MY/MYExportWebMap/GPServer/Export%20Web%20Map",

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
