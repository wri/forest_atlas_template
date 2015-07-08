define(
    ["declare"], function(declare) {

        // Labels need to match the range of bounds
        var totalLossBounds = [1, 13];
        var totalLossLabels = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013];

        var iflBounds = [0, 1];
        var carbonBounds = [0, 9];
        var landCoverBounds = [1, 20];
        var treeDensityBounds = [1, 3];
        var protectedAreaBounds = [0, 1];
        var primForestBounds = [1, 2];
        var legalBounds = [1, 5];
        var peatBounds = [0, 1];
        var rspoBounds = [0, 3];

        var o = declare(null, {

            constructor: function() {

                o._config = {

                    // App URL, Map Themes will use this as a base path, this is where the templated application lives
                    // appUrl: 'http://wri.github.io/forest_atlas_template/',

                    defaultLayerOpacity: 80,
                    /*0-100*/

                    ui: [

                        {
                            nodeId: "toolsContainer",
                            type: "div",
                            containerProps: {
                                id: "layerLabel"
                            },
                            attrs: [{
                                id: 'layerLabel',
                                attr: 'data-bind',
                                value: '{text:tabLayersTitle}'
                            }]
                        },
                        {
                            nodeId: "toolsContainer",
                            type: "div",
                            containerProps: {
                                id: "closeLayersButton",
                                'class': "close-layers-button"
                            }
                            // ,
                            // attrs: [{
                            //     id: 'closeLayersButton',
                            //     attr: 'data-bind',
                            //     value: '{text:closeButtonText}'
                            // }]
                        },

                        {
                            nodeId: "toolsContainer",
                            type: "accordion",
                            props: {
                                style: "position:absolute;top:70px;left:0;right:0;bottom:0px",
                                id: "accordionContainer"
                            }
                        },


                        {
                            nodeId: "toolsContainer",
                            widgetid: "accordionContainer",
                            type: "contentpane",
                            props: {
                                id: "forestLossLayers"
                            },
                            attrs: [{
                                id: "forestLossLayers_button_title",
                                attr: "data-bind",
                                value: "{text:accordionForestLossTitle}"
                            }]
                        },
                        {
                            nodeId: "toolsContainer",
                            widgetid: "accordionContainer",
                            type: "contentpane",
                            props: {
                                id: "layersCP"
                            },
                            attrs: [{
                                id: "layersCP_button_title",
                                attr: "data-bind",
                                value: "{text:accordionLandUseTitle}"
                            }]
                        },
                        {
                            nodeId: "toolsContainer",
                            widgetid: "accordionContainer",
                            type: "contentpane",
                            props: {
                                id: "forestCoverLayers"
                            },
                            attrs: [{
                                id: "forestCoverLayers_button_title",
                                attr: "data-bind",
                                value: "{text:accordionForestCoverTitle}"
                            }]
                        }

                    ],


                    // Extra Layers

                    forestLossLayers: {
                        'idPrefix': 'loss_',
                        'container': 'forestLossLayers',
                        'layers': [
                            {
                                'id': 'forestCoverLoss',
                                'textBinding': 'forestCoverLossLabel',
                                'toolsContainerId': 'forestCoverControls',
                                'toolContent': '<div class="forest-loss-toolbox">' +
                                    '<table>' +
                                        '<tr>' +
                                            '<td><span data-bind="text: lossStartingYear"></span></td>' +
                                            '<td><select id="lossStartYear" data-bind="options: forestLossYears"></select></td>' +
                                            '<td rowspan="2"><div id="lossPlayButton" class="loss-play-button"></div></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                            '<td><span data-bind="text: lossEndingYear"></span></td>' +
                                            '<td><select id="lossEndYear" data-bind="options: forestLossYears,value: forestLossYears()[forestLossYears().length - 1]"></select></td>' +
                                        '</tr>' +
                                    '</table>' +
                                '</div>'
                            },
                            {
                                'id': 'forestGainLayer',
                                'textBinding': 'treeCoverGainLabel'
                            },
                            {
                                'id': 'activeFires',
                                'textBinding': 'activeFiresLabel',
                                'toolsContainerId': 'activeFiresControls',
                                'toolContent': '<div class="fires-toolbox">' +
                                    '<div id="firesWeek" class="active" data-bind="text: firesOneWeek"></div>' +
                                    '<div id="fires72" data-bind="text: fires72Hours"></div>' +
                                    '<div id="fires48" data-bind="text: fires48Hours"></div>' +
                                    '<div id="fires24" data-bind="text: fires24Hours"></div>' +
                                '</div>'
                            }
                        ]
                    },

                    forestCoverLayers: {
                        'idPrefix': 'cover_',
                        'container': 'forestCoverLayers',
                        'layers': [
                            {
                                'id': 'treeCoverDensity',
                                'textBinding': 'treeCoverDensityLabel',
                                'toolsContainerId': 'treeCoverControls',
                                'toolContent': '<div class="tree-cover-toolbox">' +
                                    '<div class="tcd-selector-wrapper">' +
                                        '<span class="tcd-selector-label" data-bind="text: tcdSelectorBegin"></span>' +
                                        '<span class="tcd-selector-value" data-bind="text: tcdSelectorValue, click: canopyDensityClicked"></span>' +
                                        '<span class="tcd-selector-label" data-bind="text: tcdSelectorEnd"></span>' +
                                    '</div>' +
                                '</div>'
                            },
                            {
                                'id': 'landCover',
                                'textBinding': 'landCoverLabel'
                            },
                            {
                                'id': 'intactForestLayer',
                                'textBinding': 'intactForestLayerLabel'
                            },
                            {
                                'id': 'carbonLayer',
                                'textBinding': 'carbonLayerLabel'
                            }
                        ]
                    },


                    // Analysis Configurations

                    analysisConfig: {
                        totalLossAnalysisUrl: 'http://gis-gfw.wri.org/arcgis/rest/services/GFW/analysis/ImageServer',
                        clearanceAlertAnalysisUrl: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/GFWanalysis_wm/ImageServer',

                        treeCoverDensityRule: {
                            "rasterFunction": "Arithmetic",
                            "rasterFunctionArguments": {
                                "Operation": 3,
                                "Raster": {
                                    "rasterFunction": "Remap",
                                    "rasterFunctionArguments": {
                                        "InputRanges": [0, 50, 50, 101], // Set this value based on TCD Slider amount
                                        "OutputValues": [0, 1],
                                        "Raster": "", // Insert Raster ID here
                                        "AllowUnmatched": false
                                    },
                                    "variableName": "Raster"
                                },
                                "Raster2": "" // Insert Rendering Rule Here
                            }
                        },

                        totalLoss: {
                            rasterId: "$521", //12
                            bounds: totalLossBounds,
                            labels: totalLossLabels,
                            mosaicRule: {
                                "mosaicMethod" : "esriMosaicLockRaster",
                                "lockRasterIds": [521],
                                "ascending" : true,
                                "mosaicOperation" : "MT_FIRST"
                            },
                            totalLossTitle: ""
                        },

                        clearanceAlerts: {
                            rasterId: "$2"
                        },

                        clearanceBounds: {
                            url: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/FORMA50/ImageServer',
                            baseYearLabel: 13
                        },

                        fires: {
                            url: 'http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer'
                        },

                        ifl: {
                            rasterId: '$9',
                            bounds: iflBounds,
                            labels: ["Intact Forest"],
                            colors: ["#186513"],
                            title: "Annual Tree Cover Loss (in hectares) on Intact Forest Landscapes",
                            titleKey: 'analysisIFLChartTitle',
                            labelKey: 'intactForest'
                        },
                        carbon: {
                            rasterId: '$1',
                            bounds: carbonBounds,
                            labels: ["0", "1 - 10", "11 - 20", "21- 35", "36 - 70", "71 - 100", "101 - 150", "151 - 200", "201 - 300", "Greater than 300"],
                            colors: ["#fdffcc", "#faeeb9", "#f6ddaa", "#f4ca99", "#f1bc8b", "#eca97a", "#e89c6f", "#e08b5e", "#db7c54", "#d56f4a"],
                            title: "Annual Tree Cover Loss (in hectares) on Forest Carbon Stocks (Mg C /Ha)",
                            titleKey: 'analysisCSChartTitle',
                            labelKey: 'carbonStock'
                        },
                        landCover: {
                            rasterId: '$523',
                            bounds: landCoverBounds,
                            labels: ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland','Grassland','Aquatic grassland','Swamp grassland','Sparse vegetation','Mosaic cultivated areas/vegeatation( herbaceous or shrub)','Agriculture','Irrigated agriculture','Bare areas','Artificial surfaces and associated areas','Water Bodies'],
                            colors: ["#3B823D", "#7CA079", "#AAB785", "#355936", "#5BBCF8", "#8BB94B", "#F0F979", "#7B8840", "#CABA4F", "#D3A162", "#FDCA76", "#C1E5DC", "#7AD3AB", "#F3F3AF", "#F6988F", "#FFFFF0", "#FFFFF0", "#A7A7A7", "#F83D48", "#353C92"],
                            title: 'Annual Tree Cover Loss (in hectares) on Land Cover',
                            titleKey: 'analysisLCChartTitle',
                            labelKey: 'landCover',
                            mosaicRule: {
                                "mosaicMethod" : "esriMosaicLockRaster",
                                "lockRasterIds": [3],
                                "ascending" : true,
                                "mosaicOperation" : "MT_FIRST"
                            }
                        },
                        treeDensity: {
                            rasterId: '$520',
                            formaId: '$12',
                            bounds: treeDensityBounds,
                            labels: ["31 - 50%", "51 - 74%", "75 - 100%"],
                            colors: ["#ccf1a5", "#859a59", "#4b5923"],
                            title: "Annual Tree Cover Loss (in hectares)",
                            titleKey: 'analysisTCDChartTitle',
                            labelKey: 'treeDensity',
                            includeFormaIdInRemap: true,
                            rasterRemap: {
                                "rasterFunction": "Remap",
                                "rasterFunctionArguments": {
                                    "InputRanges": [31, 51, 51, 75, 75, 101],
                                    "OutputValues": [1, 2, 3],
                                    "Raster": "$520",
                                    "AllowUnmatched": false
                                }
                            }
                        },
                        protectedArea: {
                            rasterId: '$10',
                            bounds: protectedAreaBounds,
                            labels: ["Protected Area"],
                            colors: ["#296eaa"],
                            title: "Annual Tree Cover Loss (in hectares) on Protected Areas"
                        },
                        primForest: {
                            rasterId: '$519',
                            formaId: '$11',
                            labels: ["Primary Degraded", "Primary Intact"],
                            colors: ["#259F1F", "#186513"],
                            bounds: primForestBounds,
                            title: "Annual Tree Cover Loss (in hectares) in Primary Forests"
                        },
                        legal: {
                            rasterId: '$7',
                            bounds: legalBounds,
                            labels: ["Convertible Production Forest", "Limited Production Forest", "Non-forest", "Production Forest", "Protected Area"],
                            colors: ["rgb(230, 152, 0)", "rgb(116, 196, 118)", "rgb(255, 255, 190)", "rgb(199, 233, 192)", "rgb(35, 139, 69)"],
                            title: "Annual Tree Cover Loss (in hectares) on Legal Classifications"
                        },
                        peat: {
                            rasterId: '$8',
                            bounds: peatBounds,
                            labels: ["Peat"],
                            colors: ["#161D9C"],
                            title: "Annual Tree Cover Loss (in hectares) on Peat Lands"
                        },
                        rspo: {
                            rasterId: '$5',
                            bounds: rspoBounds,
                            lossBounds: [5, 12]
                        }
                    }

                };
            }

        });

        o.getConfig = function() {
            return o._config;
        };

        o.initialize = function() {
            if (undefined === o._instance) {
                o._instance = new o();
            }
            return o._instance;
        };

        o.destroy = function() {
            delete o._instance;
        };

        return o;



    }); //end define
