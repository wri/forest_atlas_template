define([], function() {

    var o = {

        //country code
        country: "GNQ",

        //languages
        appLanguages: {
            "en": {
                title: "Forest Atlas of Equatorial Guinea",
                flagTitle: "Ministry of Agriculture and Forestry"
            },
            "es": {
                title: "Atlas Forestal de la República de Guinea Ecuatorial",
                flagTitle: "Ministerio de Agricultura y Bosques"
            }
        },

        layersToShow: [],

        maskMapUrl: "http://gis.forest-atlas.org/arcgis/rest/services/GNQ/GNQ_00_africa/MapServer",

        // Not in Configuration Panel
        webMapID: "9d8b867cd4634577b014bd00fe100d9c",

        // Not in Configuration Panel
        basemap: "national-geographic",
        //graphics default transparency
        // Not in Configuration Panel
        defaultLayerTransparency: 80,
        // Not in Configuration Panel
        geometryServiceURL: "http://gis.forest-atlas.org/arcgis/rest/services/Utilities/Geometry/GeometryServer",

        //flag
        countryFlagRight: "170px",
        countryTextWidth: "260px",
        flagPath: "app/images/GAB_flag_new.png",
        flagLinkPath: "http://www.guineaecuatorialpress.com/noticia.php?id=126&lang=en",

        //legislative text
        pdfURL: "http://gnq.forest-atlas.org/resources/docs/",

        aboutLinkUrl: "http://gnq.forest-atlas.org/",

        // Download Data URL
        downloadDataUrl: "http://gnq-data.forest-atlas.org/",

        //print image
        printURL: "http://gis.forest-atlas.org/arcgis/rest/services/GNQ/GNQExportWebMap/GPServer/Export%20Web%20Map",

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
