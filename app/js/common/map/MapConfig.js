define(

    ["declare", "res/Resources"], function(declare, resource, Events) {

        var o = declare(null, {

            constructor: function() {

                o._config = {
                    // proxy:"/proxy/proxy.php",
                    proxy: "/proxy/proxy.ashx",
                    mapDefaults: {
                        center: [15.040283, -0.692122], //center of country
                        basemap: "national-geographic",
                        zoom: 6 //level of map
                    },
                    webMapDefaults: {
                        ignorePopups: false,

                        geometryServiceURL: resource.geometryServiceURL
                    },

                    corsEnabledServers: [
                        'http://gis-potico.wri.org'
                    ],

                    webMapID: resource.webMapID,

                    portalGenerateFeaturesURL: "http://www.arcgis.com/sharing/rest/content/features/generate",

                    ui: [{
                        nodeId: "mapContainer",

                        type: "mapcontainer",
                        props: {
                            style: "position:absolute;top:0;left:0;right:0;bottom:25px;z-index:50;",
                            id: "mapcontainer"
                        }

                    }],


                    // Extra Layers
                    forectCoverLoss: {
                        url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestCover_lossyear/ImageServer',
                        id: 'forectCoverLoss',
                        legendLayer: 11,
                        defaultRange: [1, 13],
                        colormap: [[1, 219, 101, 152]],
                        rasterFunction: {
                            "rasterFunction": "Colormap",
                            "rasterFunctionArguments": {
                                "Colormap": [[1, 219, 101, 152]],
                                "Raster": {
                                    "rasterFunction": "Remap",
                                    "rasterFunctionArguments": {
                                        "InputRanges": [1, 13],
                                        "OutputValues": [1],
                                        "AllowUnmatched": false
                                    }
                                }
                            },
                            "variableName": "Raster"
                        }
                    },
                    activeFires: {
                        url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer',
                        id: 'activeFires',
                        defaultLayers: [0, 1, 2, 3]
                    },
                    treeCoverDensity: {
                        url: 'http://50.18.182.188:6080/arcgis/rest/services/TreeCover2000/ImageServer',
                        id: 'treeCoverDensity',
                        legendLayer: 29
                    },
                    landCover: {
                        url: 'http://gis-gfw.wri.org/arcgis/rest/services/GFWForestCover/central_africa_land_cover/MapServer',
                        id: 'landCover',
                        defaultLayers: [0]
                    },
                    forestGainLayer: {
                        url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestGain_2000_2012_map/MapServer',
                        id: 'forestGainLayer',
                        legendLayer: 31
                    },
                    carbonLayer: {
                        url: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/moremaps2_EN/MapServer',
                        id: 'carbonLayer',
                        defaultLayers: [23]
                    },
                    intactForestLayer: {
                        url: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/moremaps2_EN/MapServer',
                        id: 'intactForestLayer',
                        defaultLayers: [24]
                    },
                    legendLayer: {
                        url: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/moremaps2_EN/MapServer',
                        id: 'legendLayer',
                        defaultLayers: []
                    }

                };
            }


        });

        o.getConfig = function() {
            return o._config;
        };

        o.initialize = function() {
            if (null == o._instance) {
                o._instance = new o();
            }
            return o._instance;
        };

        o.destroy = function() {
            delete o._instance;
        };

        return o;



    }); //end define