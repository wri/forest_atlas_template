define(
    ["declare",
        "topic",
        "on",
        "all",
        "construct",
        "query",
        "esriquery",
        "featureLayer",
        "deferred",
        "aspect",
        "array",
        "registry",
        "uifactory",
        "toolsconfig",
        "toolsevents",
        "toolsmodel",
        "mapconfig",
        "infotemplate",
        "dom",
        "ready",
        "attr",
        "class",
        "string",
        "mapui",
        "mainmodel",
        "basemap",
        "graphic",
        "arcgisutil",
        "legend",
        "dialog",
        "tooltipdialog",
        "popup",
        "printtemplate",
        "hslider",
        "scalebar",
        "style",
        "contentpane",
        "checkbox",
        "memory",
        "combobox",
        "print",
        "legendlayer",
        "esrirequest",
        "tiledmap",
        "ko",
        "connect"
    ], function (declare, topic, on, all, domConstruct, query, Query, FeatureLayer, Deferred, aspect, arrayUtil, registry, UIFactory, Config, Events, Model, MapConfig, InfoTemplate, dom, ready, attr, domClass, string, MapUI, MainModel, BasemapGallery, Graphic, arcgisUtils, legendDijit, Dialog, TooltipDialog, popup, PrintTemplate, HorizontalSlider, Scalebar, domStyle, contentPane, CheckBox, Memory, ComboBox, Print, LegendLayer, esriRequest, ArcGISTiledMapServiceLayer, knockout, connect) {

        var o = declare(null, {

            constructor: function() {
                var toolsevents = Events.getEvents();
                var toolsconfig = Config.getConfig();
                var mainmodel = MainModel.getVM();
                var mapconfig = MapConfig.getConfig();
                var attributes;
                var pdfValue;
                var language = "en";
                var map = MapUI.getMap();
                var mapResponse = MapUI.getWebMapResponse();

                //create UI through Factory
                var uifactory = UIFactory.initialize();
                arrayUtil.forEach(toolsconfig.ui, function(item) {
                    uifactory.create(item);
                });

                //sets legislative text to display none
                map.on("click", function(evt) {
                    if (dom.byId("legislative")) {
                        dom.byId("legislative").style.display = "none";
                    }
                });

                // Set the Default Open Accordion Pane Under Layers
                registry.byId('accordionContainer').selectChild(registry.byId('layersCP'));


                /*  aspect.after(map.infoWindow, "show", function() {
                    if (map.infoWindow.features.length) {
                        topic.publish(toolsevents.popupToggle, map.infoWindow.getSelectedFeature());
                    }
                });*/

                //popup window shows legislative text link if pdf field is present
                on(map.infoWindow, "selection-change", function() {
                    topic.publish(toolsevents.popupToggle, map.infoWindow.getSelectedFeature());
                }); //end infoWindow on show



                var layersList = arcgisUtils.getLegendLayers(mapResponse);


                //add scalebar
                var scalebar = new Scalebar({
                    scalebarUnit: "metric",
                    attachTo: "bottom-left",
                    map: map
                });

                /* Start Checkbox's and Transparency Sliders -------------*/
                //Get layerIds
                var language = mainmodel.langType().toLowerCase();
                var mapLayerLangId = "";
                var mapLanguageLayerIds; // = map.layerIds;
                var dynamicLayersArray = [];
                var index = 0;

                var layersToHide = app.config.layersToHide;

                //mapLayerLangId == current language layer
                arrayUtil.forEach(map.layerIds, function(layerId) {

                    // Exit for Extra Layers, code below is for webmap layers and will break on these layers
                    if (layerId === 'landCover' || layerId === 'activeFires' || layerId === 'legendLayer' ||
                        layerId === 'carbonLayer' || layerId === 'intactForestLayer' )
                    {
                        return;
                    }

                    if (map.getLayer(layerId).supportsDynamicLayers === true) {
                        dynamicLayersArray.push(layerId);
                        layerIdlower = layerId.toLowerCase();
                        mapLayerLangId = layerId;

                        var visibleLayers = [];
                        var tempVisLayers = map.getLayer(layerId).visibleLayers;

                        var targetLayer = map.getLayer(layerId); //dynamic layer


                        arrayUtil.forEach(tempVisLayers, function(lid) {

                            var featureLayerId = targetLayer.id + "_" + lid;
                            var targetFeatureLayer = map.getLayer(featureLayerId);

                            if (layersToHide.indexOf(lid) === -1) {
                                visibleLayers.push(lid);
                            }
                            //  else {
                            //   console.log(targetFeatureLayer);
                            //   targetFeatureLayer.hide();
                            // }
                        });
                        //map.getLayer(layerId).show();
                        map.getLayer(layerId).setVisibleLayers(visibleLayers);

                        return (layerIdlower.indexOf("_" + language) > -1);
                    }

                }); //end layer ID array



                mapLanguageLayerIds = dynamicLayersArray;
                var subLayersList = [];
                subLayersList = map.getLayer(mapLayerLangId).layerInfos;

                var len = map.getLayer(mapLayerLangId).layerInfos.length;
                var visLayersArr = [];

                var allContainerDiv = domConstruct.create("div", {
                    id: "allContainer",
                    "class": "allContainer"
                }, "closeLayersButton", "after");

                //Select all and clear all buttons
                var selectAll = domConstruct.create("a", {
                    id: "selectAll",
                    "data-bind": "{text:selectAll}"
                }, "allContainer");
                var clearAll = domConstruct.create("a", {
                    id: "clearAll",
                    "data-bind": "{text:clearAll}"
                }, "allContainer");

                on(selectAll, "click", function() {
                    topic.publish(toolsevents.selectAll);
                });
                on(clearAll, "click", function() {
                    topic.publish(toolsevents.clearAll);
                });

                //Add Sliders and Checkboxes
                for (var i = 0; i < len; i++) {
                    visLayersArr[i] = i;
                    var visibleLayers = map.getLayer(mapLayerLangId).visibleLayers;
                    var checkValue = false;
                    arrayUtil.some(visibleLayers, function(id) {
                        if (i === id) {
                            checkValue = true;
                            return checkValue;
                        }
                    });

                    //create dom elements
                    var containerDiv = domConstruct.create("div", {
                        id: "container" + i,
                        "class": "toggleContainer"
                    }, "layersCP");
                    var checkBoxDiv = domConstruct.create("div", {
                        id: "checkBoxDiv" + i
                    }, containerDiv);
                    var titleDiv = domConstruct.create("div", {
                        id: "sliderTitleDiv" + i
                    }, containerDiv);
                    var sliderContainerDiv = domConstruct.create("div", {
                        id: "sliderContainerDiv" + i,
                        "class": "sliderContainer"
                    }, containerDiv);
                    var sliderDiv = domConstruct.create("div", {
                        id: "sliderDiv" + i
                    }, sliderContainerDiv);
                    var subLayersTitle = subLayersList[i].name;

                    //add check box
                    var checkBox = new CheckBox({
                        name: "checkBox",
                        "class": "list_item",
                        arrayLayerValue: i,
                        value: "agreed",
                        checked: checkValue,
                        onClick: function(evt) {
                            var checkBoxChecked = evt.target.checked;
                            topic.publish(toolsevents.toggleMapLayer, dynamicLayersArray, checkBoxChecked, this.arrayLayerValue);
                        }
                    }, "checkBoxDiv" + i);


                    //add slider title
                    arrayUtil.some(map.layerIds, function(layerId) {
                        layerIdlower = layerId.toLowerCase();
                        current = layerId;
                        return (layerIdlower.indexOf("_" + mainmodel.currentLanguage()) > -1);
                    });

                    var layerName = map.getLayer(current).layerInfos[i].name;

                    var titlePane = new contentPane({
                        content: layerName,
                        "class": "title",
                    }, "sliderTitleDiv" + i);

                    //add transparency sliders
                    var slider = new HorizontalSlider({
                        name: "slider" + i,
                        arrayLayerValue: i,
                        value: app.config.defaultLayerTransparency,
                        minimum: 0,
                        maximum: 100,
                        intermediateChanges: false,
                        onChange: function(sliderValue) {
                            topic.publish(toolsevents.transparencyChange, mapLanguageLayerIds, sliderValue, this.arrayLayerValue);
                        }
                    }, "sliderDiv" + i);

                    var sliderText = domConstruct.create("div", {
                        id: "sliderText" + i,
                        "class": "sliderText"
                    }, containerDiv);
                    var hzLine = domConstruct.create("div", {
                        id: "hzline" + i,
                        "class": "hzline"
                    }, containerDiv);

                    sliderText.innerHTML = "<div class='left'>+</div><span class='middle' data-bind='{text:transparency}'></span><div class='right'>-</div>";

                    if (checkValue == false) {
                        var check = query(".dijitCheckBox");
                        check[i].style.backgroundImage = "none";
                        dom.byId("sliderContainerDiv" + i).style.display = "none";
                        dom.byId("sliderText" + i).style.display = "none";
                        dom.byId("sliderTitleDiv" + i).style.color = "#cfcfcf";
                    }
                }


                /**
                * @param layerParams {Object} - config object for new layers to be added to the accordions
                */
                function generateUIForLayers (layerParams) {

                    layerParams.layers = arrayUtil.filter(layerParams.layers, function (layer, i) {

                      // If the layer has been configured to not be rendered, then return here
                      // after removing its analysis layer from the app
                      if (
                        (layer.id === "activeFires" && !app.config.activeFiresIncluded) || (layer.id === "landCover" && !app.config.landCoverIncluded) ||
                        (layer.id === "carbonLayer" && !app.config.biomassIncluded) || (layer.id === "intactForestLayer" && !app.config.iflIncluded)
                      ) {

                        // Remove the associated analysis layer
                        switch (layer.id) {
                          case "activeFires":
                            query('.fireAnalysis').forEach(function (node) {
                              domConstruct.destroy(node);
                            });
                          break;
                          case "landCover":
                            query('.landCoverAnalysis').forEach(function (node) {
                              domConstruct.destroy(node);
                            });
                            query('.landCoverCompAnalysis').forEach(function (node) {
                              domConstruct.destroy(node);
                            });
                          break;
                          case "carbonLayer":
                            query('.biomassAnalysis').forEach(function (node) {
                              domConstruct.destroy(node);
                            });
                          break;
                          case "intactForestLayer":
                            query('.iflAnalysis').forEach(function (node) {
                              domConstruct.destroy(node);
                            });
                          break;
                        }

                        return false;
                      }

                      return true;

                    });

                    console.log(layerParams.layers);

                    arrayUtil.forEach(layerParams.layers, function (layer, i) {

                        var containerDiv = domConstruct.create("div", {
                            id: layerParams.idPrefix + "container" + i,
                            "class": "toggleContainer"
                        }, layerParams.container);

                        var checkBoxDiv = domConstruct.create("div", {
                            id: layerParams.idPrefix + "checkBoxDiv" + i
                        }, containerDiv);

                        var titleDiv = domConstruct.create("div", {
                            id: layerParams.idPrefix + "sliderTitleDiv" + i,
                            "class": "sliderTitleDiv"
                        }, containerDiv);

                        var sliderContainerDiv = domConstruct.create("div", {
                            id: layerParams.idPrefix + "sliderContainerDiv" + i,
                            "class": "sliderContainer"
                        }, containerDiv);

                        var sliderDiv = domConstruct.create("div", {
                            id: layerParams.idPrefix + "sliderDiv" + i
                        }, sliderContainerDiv);

                        var sliderText = domConstruct.create("div", {
                            id: layerParams.idPrefix + "sliderText" + i,
                            "class": "sliderText"
                        }, containerDiv);

                        if (layer.toolsContainerId) {
                            domConstruct.create('div', {
                                'id': layer.toolsContainerId,
                                'class': 'tools-container',
                                'innerHTML': layer.toolContent,
                                'style': 'display: none;'
                            }, containerDiv);
                        }

                        var hzLine = domConstruct.create("div", {
                            id: layerParams.idPrefix + "hzline" + i,
                            "class": "hzline"
                        }, containerDiv);

                        var checkBox = new CheckBox({
                            // The container will be used for some css targeting in the toolsevents.toggleExtraLayers
                            container: layerParams.idPrefix + "container" + i,
                            "class": "list_item",
                            checked: false,
                            layerId: layer.id,
                            onClick: function(evt) {
                                topic.publish(toolsevents.toggleExtraLayers, this.checked, this.layerId, this.container);
                            }
                        }, layerParams.idPrefix + "checkBoxDiv" + i);

                        var titlePane = new contentPane({
                            content: "<div data-bind='text:" + layer.textBinding + " '></div>",
                            "class": "title",
                        }, layerParams.idPrefix + "sliderTitleDiv" + i);

                        //add transparency sliders
                        var slider = new HorizontalSlider({
                            name: layerParams.idPrefix + "slider" + i,
                            value: app.config.defaultLayerTransparency,
                            layerId: layer.id,
                            minimum: 0,
                            maximum: 100,
                            intermediateChanges: false,
                            onChange: function(sliderValue) {
                                topic.publish(toolsevents.adjustLayerOpacity, this.layerId, sliderValue);
                            }
                        }, layerParams.idPrefix + "sliderDiv" + i);

                        sliderText.innerHTML = "<div class='left'>+</div><span class='middle' data-bind='{text:transparency}'></span><div class='right'>-</div>";

                        // Set Checkboxes to off by default
                        var check = query("#" + layerParams.container + " .dijitCheckBox");
                        check[i].style.backgroundImage = "none";
                        dom.byId(layerParams.idPrefix + "sliderContainerDiv" + i).style.display = "none";
                        dom.byId(layerParams.idPrefix + "sliderText" + i).style.display = "none";
                        dom.byId(layerParams.idPrefix + "sliderTitleDiv" + i).style.color = "#cfcfcf";

                    });

                }

                generateUIForLayers(toolsconfig.forestLossLayers);
                generateUIForLayers(toolsconfig.forestCoverLayers);
                topic.publish(toolsevents.transparencyChange, mapLanguageLayerIds, app.config.defaultLayerTransparency, visLayersArr);

                if (app.config.excludeDocumentsTab) {
                  // Remove the dom elements associated to this tab
                  var tab = document.getElementById("popupDocumentTab"),
                      container = document.getElementById("popupDocument");

                  if (tab) { tab.remove(); }
                  if (container) { container.remove(); }
                }

                /* Add Print widget ----------------------------*/
                print = new Dialog({
                    title: "Print",
                    id: "print",
                    content: "<div data-bind='html:printDialog' style='width:100%'></div>",
                    style: "width: 300px"
                });


                attr.set(dom.byId("print_title"), "data-bind", "{text:print}");
                var printContent = query("#print .dijitDialogPaneContent");
                printContent[0].id = "printContent";


                // var layoutTemplate, templateNames, mapOnlyIndex, templates;
                // var legendLayers = new esri.tasks.LegendLayer();
                // legendLayers.layerId = "GNQ_online_en_474";
                // legendLayers.subLayerIds = [3,4,5];

                // create an array of objects that will be used to create print templates

                var options = {
                    //legendLayers: [3,4,5],
                    scalebarUnit: "Kilometers",
                    titleText: "",
                    customTextElements: [{
                        "subtitle": ""
                    }]
                };


                var layouts = [{
                    name: "GNQ_Landscape", //For PDF, Name must always start with ISO3_
                    label: "Landscape (PDF)",
                    format: "pdf",
                    options: options

                }, {
                    name: "MAP_ONLY",
                    label: "Map Image (JPG)",
                    format: "jpg",
                    options: options
                }];


                mainmodel.printLayouts(layouts);
                // create the print templates
                var templates = arrayUtil.map(layouts, function(lo) {
                    var t = new PrintTemplate();
                    t.layout = lo.name;
                    t.label = lo.label;
                    t.format = lo.format;
                    t.layoutOptions = lo.options;
                    return t;
                });

                //Choose a Layout


                var printDijit = new Print({
                    map: map,
                    templates: templates,
                    url: app.config.printURL
                }, dom.byId("printContent"));

                printDijit.startup();

                printDijit.on('print-start', function () {
                    // Send Event to Google Analytics
                    ga('A.send', 'event', 'Event', 'Print Map', 'User clicked the Print Map button on the map.');
                });

                var loadingGif = domConstruct.create("div", {
                    id: "laodingGif",
                    "class": "header",
                }, "printContent");


                on(dom.byId("print-button"), "click", function() {

                    var country = app.config.country;
                    var title = app.config.appLanguages[mainmodel.currentLanguage()].title;
                    var subtitle = app.config.appLanguages[mainmodel.currentLanguage()].flagTitle;

                    arrayUtil.forEach(printDijit.templates, function(printTemplate) {
                        if (printTemplate.format == "pdf") {
                            printTemplate.layout = country + "_" + printTemplate.layout.split("_")[1];
                        }

                        printTemplate.layoutOptions.titleText = title;
                        printTemplate.layoutOptions.customTextElements[0].subtitle = subtitle;

                    });

                    print.show();

                });


                /*add search -----------------------------------------*/
                var searchStore = new Memory({
                    data: []
                });

                var comboBox = new ComboBox({
                    id: "search",
                    name: "state",
                    store: searchStore,
                    searchAttr: "name",
                    placeholder: " search...",
                    onKeyUp: function(evt) {

                        var inputValue = evt.target.value;
                        var key = evt.keyCode;

                        if (inputValue.length != 0) {
                            topic.publish(toolsevents.search, inputValue, mapLayerLangId);
                        };

                        if (key == "13") {
                            topic.publish(toolsevents.searchPopup);

                        }


                    },

                    onChange: function(evt) {
                        topic.publish(toolsevents.searchPopup);
                    }


                }, "search").startup();

                on(dom.byId("searchButton"), "click", function() {
                    if (registry.byId('search').get('value').length > 0) {
                        topic.publish(toolsevents.searchPopup);
                    }
                });


                var activeLayer;
                arrayUtil.some(layersList, function(layerItem) {
                    var title = layerItem.title.toLowerCase();
                    activeLayer = layerItem;
                    return (mapLayerLangId.indexOf(title) > -1)
                });

                //add the legend
                var legendDiv = domConstruct.create("div", {
                    id: "legendDiv"
                }, "legendCP");
                o._legend = new legendDijit({
                    map: map,
                    layerInfos: [{
                        layer: activeLayer.layer, // mainmodel.currentActiveLayer()
                        title: ""
                    }], //[activeLayer],//layersList,
                    autoUpdate: true
                }, "legendDiv");
                o._legend.startup();

                var node = query(".dijitTitlePaneTextNode");

                attr.set(node[0], "data-bind", "text:tabLegendTitle");


                var defaultLayerOpacity = toolsconfig.defaultLayerOpacity;
                arrayUtil.forEach(layersList, function(layer) {
                    //add check boxes
                    //console.log(layer);
                    var layerId = layer.layer.id;
                    var targetLayer = map.getLayer(layerId);
                    // targetLayer.setOpacity(defaultLayerOpacity/100);

                    domClass.add(legendDiv, "legendDivItem");
                }); //End for each layer


                /* Start Basemap Gallery ----------------------------*/
                o._basemapGallery = new BasemapGallery({
                    id: "basemapGallery",
                    showArcGISBasemaps: true,
                    map: map
                }, "basemap-gallery");
                o._basemapGallery.startup();


                on(o._basemapGallery, "error", function(msg) {
                    console.log(msg);
                });

                on(o._basemapGallery, "load", function() {


                    query(".esriBasemapGalleryLabelContainer span").forEach(function(node, index, arr) {

                        var title = node.title.toLowerCase();
                        title = title.replace(/ +/g, "_");

                        node.setAttribute("data-bind", "{html:basemapTitles()." + title + "}");

                        node.innerHTML = "";

                    });

                });

                topic.publish(toolsevents.UIcreationComplete);


            } //constructor

        }); //end declare

        o.initialize = function() {
            if (null == o._instance) {
                o._instance = new o();
            }
            return o._instance;
        };

        o.getBasemap = function() {
            return o._basemapGallery;
        };


        return o;

    }); //end define
