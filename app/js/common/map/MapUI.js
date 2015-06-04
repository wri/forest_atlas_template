define(
    ["declare",
        "hash",
        "ioquery",
        "esri/map",
        "arcgisutil",
        "legend",
        "identityManager",
        "mainmodel",
        //"esri/dijit/BasemapGallery",
        "topic",
        "construct",
        "query",
        "on",
        "registry",
        "array",
        "uifactory",
        "all",
        "aspect",
        "connect",
        "mapconfig",
        "mapevents",
        "simplerenderer",
        "simplefillsymbol",
        "simplelinesymbol",
        "simplemarkersymbol",
        "color",
        "graphicslayer",
        "extent",
        "spatialreference",
        "keys",
        "basemaplayer",
        "tiledmap",
        "esri/dijit/Popup",
        "esri/config",
        "atlas/tools/Helper",
        "esri/layers/WebTiledLayer",
        "esri/layers/RasterFunction",
        "esri/layers/ImageParameters",
        "esri/layers/ImageServiceParameters",
        "esri/layers/ArcGISImageServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer"
    ], function (declare, hash, ioQuery, Map, arcgisUtils, legendDijit, identityManager, MainModel, topic, domConstruct, query, on, registry, arrayUtil, UIFactory, all, aspect, connect, Config, Events, SimpleRenderer, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Color, GraphicsLayer, Extent, SpatialReference, Keys, BasemapLayer, ArcGISTiledMapServiceLayer, Popup, esriConfig, Helper, WebTiledLayer, RasterFunction, ImageParameters, ImageServiceParameters, ArcGISImageServiceLayer, ArcGISDynamicMapServiceLayer) {

        var o = declare(null, {

            constructor: function() {

                var mapevents = Events.getEvents();
                var mapconfig = Config.getConfig();

                if (document.URL.indexOf("~calumbutler") > -1) {
                    esriConfig.defaults.io.proxyUrl = "../../../../proxy/proxy.php";
                } else {
                    esriConfig.defaults.io.proxyUrl = mapconfig.proxy;
                }

                arrayUtil.forEach(mapconfig.corsEnabledServers, function (server) {
                    esriConfig.defaults.io.corsEnabledServers.push(server);
                });

                esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 250

                esriConfig.defaults.map.panRate = 1; // default panRate: 25
                esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500
                esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25



                var webMapDefaults = mapconfig.webMapDefaults;
                var webMapID = app.config.webMapID;
                var maskMapUrl = app.config.maskMapUrl;
                var vm = MainModel.getVM();

                arcgisUtils.createMap(webMapID, "map", {
                    mapOptions: {
                        spatialReference: {
                            wkid: 102100
                        },
                        // fadeOnZoom: true,
                        force3DTransforms: true,
                        navigationMode: "css-transforms"
                    }
                }).then(function(response) {

                    o._map = response.map;

                    // Set lat, lon, zoom from hash if present in the url
                    var currentHash = ioQuery.queryToObject(hash());
                    if (currentHash.x && currentHash.y && currentHash.z) {
                        o._map.centerAndZoom([currentHash.x, currentHash.y], currentHash.z);
                    }


                    //o._map.initExtent = initExtent;
                    o._map.infoWindow.titleInBody = false;

                    vm.initExtent(o._map.extent);
                    // o._map.setExtent(initExtent);
                    o._webmapResponse = response;
                    var options = {
                        snapKey: Keys.copyKey
                    };
                    o._map.enableSnapping(options);

                    // Clear out the ghost graphic in esri's graphics layer
                    o._map.graphics.clear();

                    query(".esriSimpleSliderDecrementButton").forEach(function(node) {
                        //console.log(node);
                        var fullExtentDiv = domConstruct.create("div", {
                            id: "fullExtentDiv"
                        }, node, "before");
                        //var img = domConstruct.create("img",{src:"app/images/zoomFullExtent.png"},fullExtentDiv);                    

                        on(fullExtentDiv, "click", function() {
                            topic.publish(mapevents.zoomToDefault);
                        });
                    }); //end query  

                    var higlightLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2);
                    var higlightPolySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]));
                    var higlightPointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                            new Color([255, 0, 0]), 2),
                        new Color([0, 255, 0, 0.25]));

                    var simpleLineRenderer = new SimpleRenderer(higlightLineSymbol);
                    var simplePolyRenderer = new SimpleRenderer(higlightPolySymbol);
                    var simplePointRenderer = new SimpleRenderer(higlightPointSymbol);

                    o._map.on("click", function(evt) {
                        topic.publish(mapevents.clickCoordinates, evt);
                    });

                    connect.connect(o._map.infoWindow, 'onSetFeatures', function () {                        
                        topic.publish(mapevents.updateCustomInfoWindow);
                    });

                    // Move the Maps InfoWindow to my custom info window
                    var infoWindow = o._map.infoWindow;
                    var frag = document.createDocumentFragment();

                    arrayUtil.forEach(infoWindow.domNode.children, function (node) {
                        if (node) {
                            frag.appendChild(node);
                        }
                    });

                    document.getElementById('infoWindowData').appendChild(frag);

                    var opacity = (app.config.defaultLayerTransparency / 100);

                    var lossParams = new ImageServiceParameters();
                    lossParams.renderingRule = new RasterFunction(mapconfig.forestCoverLoss.rasterFunction);

                    var forestLossLayer = new ArcGISImageServiceLayer(mapconfig.forestCoverLoss.url, {
                        imageServiceParameters: lossParams,
                        id: mapconfig.forestCoverLoss.id,
                        visible: false,
                        opacity: opacity
                    });

                    var activeFiresParams = new ImageParameters();
                    activeFiresParams.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                    activeFiresParams.layerIds = mapconfig.activeFires.defaultLayers;
                    activeFiresParams.format = 'png32';

                    var activeFiresLayer = new ArcGISDynamicMapServiceLayer(mapconfig.activeFires.url, {
                        imageParameters: activeFiresParams,
                        id: mapconfig.activeFires.id,
                        opacity: opacity,
                        visible: false
                    });

                    var treeCoverDensityLayer = new ArcGISImageServiceLayer(mapconfig.treeCoverDensity.url, {
                        id: mapconfig.treeCoverDensity.id,
                        opacity: opacity,
                        visible: false
                    });

                    var landCoverParams = new ImageParameters();
                    landCoverParams.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                    landCoverParams.layerIds = mapconfig.landCover.defaultLayers;
                    landCoverParams.format = 'png32';

                    var landCoverLayer = new ArcGISDynamicMapServiceLayer(mapconfig.landCover.url, {
                        imageParameters: landCoverParams,
                        id: mapconfig.landCover.id,
                        opacity: opacity,
                        visible: false
                    });

                    var gainLayer = new ArcGISTiledMapServiceLayer(mapconfig.forestGainLayer.url, {
                        id: mapconfig.forestGainLayer.id,
                        opacity: opacity,
                        visible: false
                    });

                    var carbonParams = new ImageParameters();
                    carbonParams.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                    carbonParams.layerIds = mapconfig.carbonLayer.defaultLayers;
                    carbonParams.format = 'png32';

                    var carbonLayer = new ArcGISDynamicMapServiceLayer(mapconfig.carbonLayer.url, {
                        imageParameters: carbonParams,
                        id: mapconfig.carbonLayer.id,
                        opacity: opacity,
                        visible: false
                    });

                    var intactParams = new ImageParameters();
                    intactParams.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                    intactParams.layerIds = mapconfig.intactForestLayer.defaultLayers;
                    intactParams.format = 'png32';

                    var intactForestLayer = new ArcGISDynamicMapServiceLayer(mapconfig.intactForestLayer.url, {
                        imageParameters: intactParams,
                        id: mapconfig.intactForestLayer.id,
                        opacity: opacity,
                        visible: false
                    });

                    var legendParams = new ImageParameters();
                    legendParams.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                    legendParams.layerIds = [];
                    legendParams.format = "png32";

                    var legendLayer = new ArcGISDynamicMapServiceLayer(mapconfig.legendLayer.url, {
                        imageParameters: legendParams,
                        id: mapconfig.legendLayer.id,
                        visible: false
                    });

                    var maskLayer = new ArcGISTiledMapServiceLayer(maskMapUrl, {
                        id: "maskLayer",
                        opacity: 0.5
                    });

                    var customGraphicsLayer = new GraphicsLayer({
                        id: 'customGraphicsLayer',
                        visible: true
                    });

                    var landsatLayer = new WebTiledLayer(mapconfig.landsatLayer.url, {
                        copyright: mapconfig.landsatLayer.copyright,
                        id: mapconfig.landsatLayer.id,
                        visible: false
                    });

                    o._map.addLayers([
                        legendLayer,
                        landsatLayer,
                        forestLossLayer,
                        activeFiresLayer,
                        treeCoverDensityLayer,
                        landCoverLayer,
                        gainLayer,
                        carbonLayer,
                        intactForestLayer,
                        customGraphicsLayer
                    ]);

                    on(o._map, 'layers-add-result', function () {
                        o._map.reorderLayer(landsatLayer, 1);
                        o._map.reorderLayer(treeCoverDensityLayer, 2);
                        o._map.reorderLayer(landCoverLayer, 3);
                        o._map.reorderLayer(intactForestLayer, 4);
                        o._map.reorderLayer(carbonLayer, 5);
                    });

                    o._map.addLayer(maskLayer);

                    on(o._map, "layer-add-result", function(evt) {

                        var layer = evt.layer;
                        if (!layer.graphics) {
                            return;
                        }

                        var id = layer.id;
                        var vm = MainModel.getVM();
                        var currentInfoTemplates = vm.currentInfoTemplates();

                        currentInfoTemplates[id] = layer.infoTemplate;
                        vm.currentInfoTemplates(currentInfoTemplates);

                        on(layer, "selection-complete", function(obj) {

                            if (obj.target.graphics.length > 0) {
                                vm.currentSelectedLayers.push(obj.target.id);
                            } else {
                                vm.currentSelectedLayers.remove(obj.target.id);
                            }


                        });


                        

                    });

                    window.map = o._map;

                    var actionsPane = query(".actionsPane");
                    actionsPane[0].id = "actionsPane";

                    var legislative = domConstruct.create("a", {
                        id: "legislative",
                        "data-bind": "{text:legislativeText}",
                        target: "_blank"
                    }, "actionsPane");
                    var printReport = domConstruct.create("a", {
                        id: "printReport",
                        "data-bind": "{text:printReport,click:clickPrintReport}",
                        target: "_blank"
                    }, "actionsPane");
                    var text = query(".actionList .action");
                    text[0].innerHTML = "";
                    text[0].setAttribute("data-bind", "{text:zoom}");
                    legislative.innerHTML = "Legislative Text";
                    printReport.innerHTML = "Print Report";

                    topic.publish(mapevents.UICreationComplete);

                });

            } //constructor   

        }); //end declare

        o.initialize = function() {
            if (!o._instance) {
                o._instance = new o();
            }
            return o._instance;
        };

        o.getMap = function() {
            return o._map;
        };

        o.getWebMapResponse = function() {
            return o._webmapResponse;
        };


        return o;

    }); //end define