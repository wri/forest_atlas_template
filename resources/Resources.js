define([], function() {

    var o = {

        //country code
        country: "COD",

        //languages
        appLanguages: {
            "en": {
                title: "Forest Atlas of Democratic Republic of Congo",
                flagTitle: "Ministry of Environment and Sustainable Development"
            },
            "fr": {
                title: "Atlas Forestier de la République Démocratique du Congo",
                flagTitle: "Ministère de l’Environnement et Développement Durable"
            }
        },

        layersToShow: [],

        maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/COD/COD_00_africa/MapServer",

        // Not in Configuration Panel
        webMapID: "a6d99ea7fc0e40748744fd0ae37ef8c1",

        // Not in Configuration Panel
        basemap: "national-geographic",
        //graphics default transparency
        // Not in Configuration Panel
        defaultLayerTransparency: 80,
        // Not in Configuration Panel
        geometryServiceURL: "http://gis.forest-atlas.org/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        //flag
        countryFlagRight: "260px",
        countryTextWidth: "240px",
        flagPath: "app/images/COD_flag_new.png",
        flagLinkPath: "http://www.medd.gouv.cd/v2/",

        //legislative text
        pdfURL: "http://cod.forest-atlas.org/resources/docs",

        aboutLinkUrl: "http://cod.forest-atlas.org",

        // Download Data URL
        downloadDataUrl: "http://cod-data.forest-atlas.org/",

        //print image
        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/COD/CODExportWebMap/GPServer/Export%20Web%20Map",

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
