define(
    ["declare",
        "array",
        "mapmodel",
        "mapconfig",
        "mainmodel",
        "connect",
        "topic",
        "on",
        "hash",
        "query",
        "construct",
        "connect",
        "registry",
        "all",
        "string",
        "memory",
        "style",
        "webMercatorUtils",
        "dom",
        "dojo/dom-class"
    ], function(declare, arrayUtil, Model, Config, MainModel, connect, topic, on, hash, query, domConstruct,
        connect, registry, all, string, Memory, domStyle, webMercatorUtils, dom, domClass) {

        var infoWindowHandles = [];

        return declare(null, {

            zoomToDefault: function() {
                var mapconfig = Config.getConfig();
                var vm = MainModel.getVM();
                require(["mapui"], function(MapUI) {
                    var map = MapUI.getMap();
                    map.setExtent(vm.initExtent());
                });
            },

            clickCoordinates: function(evt) {
                var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
                var vm = Model.getVM();
                vm.mapPoint(mp);
                var self = this;
                require(["mapui"], function(MapUI) {
                    var map = MapUI.getMap();
                    if (evt.graphic) {
                        self.analyzeDrawnOrUploadedFeature(evt.graphic);
                    }
                });
            },

            UICreationComplete: function() {
                var self = this;
                //Map was created
                require(["toolsconfig", "toolsevents", "toolsui", "legend", "mapui", "mainmodel", "legend"], function(toolsconfig, ToolsEvents, toolsui, legendDijit, MapUI, MainModel, legend) {

                    Model.initialize("mapView");
                    toolsconfig.initialize(); //Must not have any dependencies
                    ToolsEvents.initialize(); //no dependencies, Initializes maincontroller       
                    toolsui.initialize(); //config and events must be initialized

                    var toolsevents = ToolsEvents.getEvents();
                    var map = MapUI.getMap();
                    var mainmodel = MainModel.getVM();
                    var language = mainmodel.langType().toLowerCase();
                    var mapLayerLangId = "";
                    var vm = Model.getVM();

                    arrayUtil.some(map.layerIds, function(layerId) {

                        layerIdlower = layerId.toLowerCase();
                        mapLayerLangId = layerId;

                        return (layerIdlower.indexOf("_" + language) > -1);
                    }); //end array loop

                    vm.currentActiveLayer(map.getLayer(mapLayerLangId));

                    topic.publish(toolsevents.mapZoomEnd); //to show only visible layers


                    arrayUtil.some(map.layerIds, function(layerId) {
                        if ((layerId != mapLayerLangId) && (layerId != map.layerIds[0])) {
                            map.getLayer(layerId).hide();
                        }
                    }); //end array loop 
                    map.getLayer("maskLayer").show();
                    on(map, "update-end", function(e) {
                        registry.byId("legendDiv").refresh([{
                            layer: vm.currentActiveLayer(),
                            title: ""
                        },{
                            layer: map.getLayer('activeFires'),
                            title: ""
                        },{
                            layer: map.getLayer('landCover'),
                            title: ""
                        },{
                            layer: map.getLayer('legendLayer'),
                            title: ""
                        },
                        {
                            layer: map.getLayer('carbonLayer'),
                            title: ""
                        },
                        {
                            layer: map.getLayer('intactForestLayer'),
                            title: ""
                        }]);

                        topic.publish(toolsevents.mapUpdateEnd, e);
                    }); // end on  

                    on(map, "zoom-end", function(e) {
                        topic.publish(toolsevents.mapZoomEnd, e);
                    });

                    query('.fires-toolbox div').forEach(function (firesOption) {
                        on(firesOption, 'click', self.updateFiresLayer);
                    });

                    on(dom.byId('lossPlayButton'), 'click', self.animateForestLossLayer.bind(self));
                    on(dom.byId('lossStartYear'), 'change', self.updateForestLossLayer);
                    on(dom.byId('lossEndYear'), 'change', self.updateForestLossLayer);
                    on(dom.byId('landsat-checkbox'), 'change', self.updateLandsatLayer);


                });


            },

            analyzeDrawnOrUploadedFeature: function (graphic) {
                require(['mapui'], function (MapUI) {
                    var map = MapUI.getMap();
                    map.infoWindow.setFeatures([graphic]);
                });
            },

            popupTabChanged: function () {
                require(['toolsmodel'], function (Model) {
                    var viewModel = Model.getVM(),
                        node = dom.byId('actionsPane'),
                        container;

                    // If analysis tab is open, update it
                    if (viewModel.popupActiveTab() === 'popupAnalysisTab') {
                        domConstruct.place(node, 'analysis-footer', 'first');
                    } else {
                        container = query('.esriPopupWrapper .sizer');
                        if (container.length === 3) {
                            container = container[2];
                            domConstruct.place(node, container, 'first');
                        }
                    }

                });
            },

            updateCustomInfoWindow: function () {
                var self = this;
                require(['mapui', 'atlas/tools/Helper', 'toolsmodel', 'dojo/dom-class'], function (MapUI, Helper, Model, domClass) {
                    var map = MapUI.getMap();
                    var infoWindow = map.infoWindow;
                    // var isMobile = Helper.isMobile();
                    var viewModel = Model.getVM();
                    var currentIndex = (infoWindow.selectedIndex || 0) + 1;
                    var graphicsLayer,
                        inputMarkup,
                        tempHandle,
                        tempTitle,
                        titleNode,
                        feature;


                    arrayUtil.forEach(infoWindowHandles, function (handle) {
                        handle.remove();
                    });

                    if (!infoWindow.features) {
                        domStyle.set('customPopup', 'display', 'none');
                        infoWindow.hide();
                        return;
                    }

                    if (infoWindow.features[0]._layer.id === "customGraphicsLayer") {
                        // It is a custom feature and we need to customize the info window
                        domClass.add("customPopupBody", "draw-uploaded-feature");
                        viewModel.popupActiveTab('popupAnalysisTab');
                        viewModel.customFeatureShowing(true);

                        tempHandle = on.once(dom.byId('deleteCustomFeature'), 'click', function () {
                            feature = infoWindow.features[0];
                            graphicsLayer = map.getLayer('customGraphicsLayer');

                            if (graphicsLayer && feature) {
                                graphicsLayer.remove(feature);
                            }

                            domStyle.set('customPopup', 'display', 'none');
                            infoWindow.hide();

                        });

                        infoWindowHandles.push(tempHandle);

                        tempHandle = on(dom.byId('editFeatureName'), 'click', function () {
                            feature = infoWindow.features[0];
                            // Change the title to a text field with the title in it if its editing
                            // else, save the new title
                            if (domClass.contains('editFeatureName', 'isEditing')) {
                                domClass.remove('editFeatureName', 'isEditing');
                                tempTitle = $("#newTitleInput").val();
                                feature.attributes.Custom_Title = tempTitle;
                                $("#results-header .title").html(tempTitle);
                            } else {
                                domClass.add('editFeatureName', 'isEditing');
                                titleNode = $("#results-header .title");
                                tempTitle = titleNode.html();
                                inputMarkup = "<input id='newTitleInput' type='text' value='" + tempTitle + "' />";
                                titleNode.html(inputMarkup);
                            }

                        });

                        infoWindowHandles.push(tempHandle);

                    } else {
                        domClass.remove("customPopupBody", "draw-uploaded-feature");
                        viewModel.customFeatureShowing(false);
                    }

                    // Used for showing or hiding next and previous arrows
                    viewModel.popupIndex(currentIndex);
                    viewModel.popupCount(infoWindow.features.length);

                    domStyle.set('customPopup', 'display', 'block');
                    // if (isMobile) {
                    //     domStyle.set('mobilePopupUnderlay', 'display', 'block');
                    // }

                    // If analysis tab is open, update it
                    if (viewModel.popupActiveTab() === 'popupAnalysisTab') {
                        self.updateAnalysisTab();
                        // Trigger this as well to move over the footer on desktop
                        self.popupTabChanged();
                    }

                    tempHandle = on.once(dom.byId('customPopupClose'), 'click', function () {
                        domStyle.set('customPopup', 'display', 'none');
                        infoWindow.hide();
                        // if (isMobile) {
                        //     domStyle.set('mobilePopupUnderlay', 'display', 'none');
                        // }
                    });

                    infoWindowHandles.push(tempHandle);

                });
            },

            updateAnalysisTab: function () {
                require(['toolsmodel', 'mapui', 'atlas/tools/Results', 'esri/tasks/query', 'esri/tasks/QueryTask'], function (Model, MapUI, Results, EsriQuery, QueryTask) {
                    var infoWindow = MapUI.getMap().infoWindow;
                    var selected = infoWindow.getSelectedFeature();
                    var viewModel = Model.getVM();
                    var activeTab = viewModel.popupActiveTab();

                    // If selected feature has a custom title use it, otherwise take whatever is in the infowindow
                    var title = selected.attributes.Custom_Title || infoWindow._title.innerHTML;
                    var analysisTypesContainer = query('.analysis-selection-types')[0];

                    domStyle.set('analysis-loader','top', analysisTypesContainer.offsetHeight + 'px');
                    domStyle.set('results-chart-container','top', analysisTypesContainer.offsetHeight + 'px');
                    query('#results-header .title')[0].innerHTML = title;


                    // Something is still generalizing features, may have to go to server and get new features
                    // as we get slightly different results based on the generalization which is recalculated at 
                    // every zoom level

                    if (selected.attributes.OBJECTID) {
                        var objectId = selected.attributes.OBJECTID;
                        var layer = selected._layer;
                        var url = layer._url.path;
                        var queryTask = new QueryTask(url);
                        var esriQuery = new EsriQuery();
                        esriQuery.objectIds = [objectId];
                        esriQuery.outFields = ['*'];
                        esriQuery.returnGeometry = true;
                        esriQuery.maxAllowableOffset = 0;

                        queryTask.execute(esriQuery, function(featureSet) {
                            if (featureSet.features.length > 0) {
                                Results.getResultsForType(viewModel.currentAnalysisType(), featureSet.features[0]);
                            } else {
                                Results.getResultsForType(viewModel.currentAnalysisType(), selected);
                            }
                        });
                    } else {
                        Results.getResultsForType(viewModel.currentAnalysisType(), selected);
                    }

                    // MAY NOT BE NEEDED
                    // var regex = /\(([^()]+)\)/g;

                    // // If title contains (1 of N) features we want to remove as we only want the title
                    // // Example: My Feature (1 of 3) becomes My Feature
                    // // and My Other (random) Feature (1 of 3) becomes My Other (random) Feature
                    // var match;
                    // while ((match = regex.exec(title)) !== null) {
                    //     if (match[0].indexOf('1 of') > -1) {
                    //         title = title.slice(0, match.index);
                    //     }
                    // }

                });
            },

            updateFiresLayer: function (evt) {

                require(['mapui'], function (MapUI) {

                    var target = evt.target ? evt.target : evt.srcElement;
                    var previous = query('.fires-toolbox div.active')[0];
                    var firesConfig = Config.getConfig().activeFires;
                    var map = MapUI.getMap();
                    var length = firesConfig.defaultLayers.length;
                    var layer = map.getLayer(firesConfig.id);
                    var date = new Date();
                    var dateString;
                    var where = "";
                    var defs = [];

                    domClass.remove(previous, 'active');
                    domClass.add(target, 'active');

                    switch(target.id) {
                        case "firesWeek":
                            where = "1 = 1";
                        break;
                        case "fires72":
                            date.setDate(date.getDate() - 4);
                        break;
                        case "fires48":
                            date.setDate(date.getDate() - 3);
                        break;
                        case "fires24":
                            date.setDate(date.getDate() - 2);
                        break;
                    }

                    if (where === "") {
                        dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
                                     date.getDate() + " " + date.getHours() + ":" +
                                     date.getMinutes() + ":" + date.getSeconds();
                        where = "ACQ_DATE > date '" + dateString + "'";
                    }

                    for (var i = 0; i < length; i++) {
                        defs[i] = where;
                    }

                    if (layer) {
                        layer.setLayerDefinitions(defs);
                    }
                });

            },

            updateForestLossLayer: function () {

                require(['mapui', 'esri/layers/RasterFunction'], function (MapUI, RasterFunction) {
                    var startIndex = document.getElementById('lossStartYear').selectedIndex;
                    var stopIndex = document.getElementById('lossEndYear').selectedIndex;
                    var lossConfig = Config.getConfig().forestCoverLoss;
                    var map = MapUI.getMap();
                    var layer = map.getLayer(lossConfig.id);
                    var range;

                    // Force the End Year to be greater then the start year, if its greater, update its value
                    if (startIndex > stopIndex) {
                        startIndex = stopIndex;
                        document.getElementById('lossStartYear').selectedIndex = stopIndex;
                    }

                    // Values in slider are from a 0 based index, the range starts at 1
                    // so we need to shift the values by 1 to have correct range
                    // Also the rule is [inclusive, exclusive], so if values are 3,3 use 3,3
                    // if they are 3,4 then use 3,5
                    range = (startIndex === stopIndex ? 
                            [startIndex + 1, stopIndex + 1] : 
                            [startIndex + 1, stopIndex + 2]
                    );

                    // Update the correct values in the raster function, dont update the config so copy the object first
                    var rasterFunc = JSON.parse(JSON.stringify(lossConfig.rasterFunction));
                    rasterFunc.rasterFunctionArguments.Raster.rasterFunctionArguments.InputRanges = range;
                    if (layer) {
                        layer.setRenderingRule(new RasterFunction(rasterFunc));
                    }
                });

            },

            updateTCDRenderingRule: function () {
                var self = this;
                require(['mapui', 'esri/layers/RasterFunction', 'toolsmodel'], function (MapUI, RasterFunction, ToolsModel) {
                    var tcdConfig = Config.getConfig().treeCoverDensity,
                        rasterFunc = tcdConfig.rasterFunction,
                        toolsModel = ToolsModel.getVM(),
                        map = MapUI.getMap(),
                        layer = map.getLayer(tcdConfig.id),
                        range = [toolsModel.tcdSelectorValue(), 101];

                    rasterFunc.rasterFunctionArguments.Raster.rasterFunctionArguments.InputRanges = range;

                    if (layer) {
                        layer.setRenderingRule(new RasterFunction(rasterFunc));
                    }

                    if (toolsModel.popupActiveTab() === 'popupAnalysisTab' && map.infoWindow.isShowing) {
                        self.updateAnalysisTab();
                    }

                });

            },

            animateForestLossLayer: function () {
                var playButton = document.getElementById('lossPlayButton');
                var startSelect = document.getElementById('lossStartYear');
                var stopSelect = document.getElementById('lossEndYear');
                var startIndex = startSelect.selectedIndex;
                var stopIndex = stopSelect.selectedIndex - 1;
                var duration = 1500;
                var nextOption;
                var self = this;

                // Remove the play class, give it the play icon, and stop the animation if its going
                function stopAnimation () {
                    domClass.remove(playButton, 'playing');
                    clearInterval(window.lossInterval);
                }

                if (domClass.contains(playButton, 'playing')) {
                    stopAnimation();
                    return;
                } else {
                    // Add the class, give it the stop button and continue
                    domClass.add(playButton, 'playing');
                }

                // Move the ending counter to the starting position, then animate towards the ending position
                stopSelect.value = startSelect.options[startIndex].value;
                self.updateForestLossLayer();

                window.lossInterval = setInterval(function () {
                    if (startIndex > stopIndex) {
                        stopAnimation();
                        return;
                    }

                    ++startIndex;
                    //nextOption = startSelect.options[startIndex];
                    nextOption = stopSelect.options[startIndex];
                    if (nextOption) {
                        //startSelect.value = nextOption.value;
                        stopSelect.value = nextOption.value;
                        self.updateForestLossLayer();
                    }

                }, duration);

            },

            updateLandsatLayer: function () {
                require(['toolsmodel', 'mapui'], function (ToolsModel, MapUI) {
                    var landsatConfig = Config.getConfig().landsatLayer,
                        checkbox = dom.byId('landsat-checkbox'),
                        vm = ToolsModel.getVM(),
                        map = MapUI.getMap(),
                        landsatLayer,
                        urlTemplate,
                        urlPath;

                    landsatLayer = map.getLayer(landsatConfig.id);

                    if (checkbox.checked) {
                        // Below outputs URLs like these:
                        // urlTemplate - https://wri-tiles.s3.amazonaws.com/umd_landsat/2000/${level}/${col}/${row}.png
                        // urlPath - umd_landsat/2000/${level}/${col}/${row}.png
                        urlTemplate = landsatConfig.urlBase + vm.selectedLandsatYear() + landsatConfig.urlTemplateSection;
                        urlPath = landsatConfig.urlFragment + vm.selectedLandsatYear() + landsatConfig.urlTemplateSection;
                        // Update the paths in the layer, then refresh the layer
                        landsatLayer.url = urlTemplate;
                        landsatLayer.urlPath = urlPath;
                        landsatLayer.urlTemplate = urlTemplate;
                        landsatLayer.refresh();
                        // If the layer is not showing, show it
                        if (!landsatLayer.visible) {
                            landsatLayer.setVisibility(true);
                        }
                    } else {
                        // Hide Layer
                        landsatLayer.setVisibility(false);
                    }

                });
            }

        }); //end declare
    }); //end define