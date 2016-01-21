define(

    ["declare"], function(declare) {

        var o = declare(null, {

            constructor: function() {

                var webMapID = app.config.webMapID;

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

                        geometryServiceURL: app.config.geometryServiceURL
                    },

                    corsEnabledServers: [
                        'http://gis-potico.wri.org'
                    ],

                    webMapID: webMapID,

                    portalGenerateFeaturesURL: "http://www.arcgis.com/sharing/rest/content/features/generate",

                    ui: [{
                        nodeId: "mapContainer",

                        type: "mapcontainer",
                        props: {
                            style: "position:absolute;top:0;left:0;right:0;bottom:25px;z-index:50;",
                            id: "mapcontainer"
                        }

                    }],

                    /** extraLayerKeys
                     * Anytime you add an additional layer or remove an additional layer, update the key
                     * here as well, this list is used in MainController.changeLanguage to toggle mapservices
                     * to the correct language.
                     * If the layer supports it and follows the following pattern: [0] = en, [1] = fr, [2] = es
                     * then just add the hasLanguageSupport key, otherwise, we need to store the correct mapping and use that
                     */
                    extraLayerKeys: [
                        'landsatLayer',
                        'forestCoverLoss',
                        'activeFires',
                        'treeCoverDensity',
                        'landCover',
                        'forestGainLayer',
                        'carbonLayer',
                        'intactForestLayer',
                        'legendLayer'
                    ],

                    // Extra Layers

                    landsatLayer: {
                        url: 'https://wri-tiles.s3.amazonaws.com/umd_landsat/2013/${level}/${row}/${col}.png',
                        copyright: 'Landsat Imagery',
                        id: 'landsat-layer',
                        // The following are needed for updating the url of a WebTiledLayer
                        // urlPath = urlFragment + year + urlTemplateSection
                        // urlTemplate = urlBase + year + urlTemplateSection
                        urlBase: 'https://wri-tiles.s3.amazonaws.com/umd_landsat/',
                        urlFragment: 'umd_landsat/',
                        urlTemplateSection: '/${level}/${row}/${col}.png'
                    },

                    forestCoverLoss: {
                        url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestCover_lossyear/ImageServer',
                        id: 'forestCoverLoss',
                        legendLayer: 0,
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
                        legendLayer: 2,
                        rasterFunction: {
                            "rasterFunction": "Colormap",
                            "rasterFunctionArguments": {
                                "Colormap": [[50,14,204,14]],
                                "Raster": {
                                    "rasterFunction" : "Remap",
                                    "rasterFunctionArguments" : {
                                        "InputRanges" : [30, 101],
                                        "OutputValues" : [50],
                                        "AllowUnmatched": false
                                    },
                                    "variableName" : "Raster"
                                }
                            }
                        }
                    },
                    landCover: {
                        url: 'http://gis-gfw.wri.org/arcgis/rest/services/GFWForestCover/central_africa_land_cover/MapServer',
                        id: 'landCover',
                        defaultLayers: [0],
                        hasLanguageSupport: true
                    },
                    forestGainLayer: {
                        url: 'http://50.18.182.188:6080/arcgis/rest/services/ForestGain_2000_2012_map/MapServer',
                        id: 'forestGainLayer',
                        legendLayer: 1
                    },
                    carbonLayer: {
                        url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
                        id: 'carbonLayer',
                        defaultLayers: [1]
                    },
                    intactForestLayer: {
                        url: 'http://gis-gfw.wri.org/arcgis/rest/services/forest_cover/MapServer',
                        id: 'intactForestLayer',
                        defaultLayers: [0]
                    },
                    legendLayer: {
                        url: 'http://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
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
