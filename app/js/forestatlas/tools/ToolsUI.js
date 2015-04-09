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
        "res/Resources",
        "ko",
        "connect",
        "dojo/domReady!"
    ], function(declare, topic, on, all, domContruct, query, Query, FeatureLayer, Deferred, aspect, arrayUtil, registry, UIFactory, Config, Events, Model, MapConfig, InfoTemplate, dom, ready, attr, domClass, string, MapUI, MainModel, BasemapGallery, Graphic, arcgisUtils, legendDijit, Dialog, TooltipDialog, popup, PrintTemplate, HorizontalSlider, Scalebar, domStyle, contentPane, CheckBox, Memory, ComboBox, Print, LegendLayer, esriRequest, ArcGISTiledMapServiceLayer, resource, knockout, connect) {



        var o = declare(null, {

            constructor: function() {

                var AGOL_CONFIG = app && app.config;
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

                var layersToShow = (AGOL_CONFIG ? AGOL_CONFIG.layersToShow : resource.layersToShow);

                //mapLayerLangId == current language layer
                arrayUtil.forEach(map.layerIds, function(layerId) {
                    // alert(layerId)

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

                            if (layersToShow.indexOf(lid) > -1) {
                                visibleLayers.push(lid);
                            } else {
                                targetFeatureLayer.hide();
                            }
                        });
                        //map.getLayer(layerId).show();
                        map.getLayer(layerId).setVisibleLayers(visibleLayers);

                        return (layerIdlower.indexOf("_" + language) > -1);
                    }

                }); //end layer ID array



                mapLanguageLayerIds = dynamicLayersArray;
                // alert(mapLayerLangId);
                console.log(mapLanguageLayerIds);
                var subLayersList = [];
                subLayersList = map.getLayer(mapLayerLangId).layerInfos;

                var len = map.getLayer(mapLayerLangId).layerInfos.length;
                var visLayersArr = [];

                var allContainerDiv = domContruct.create("div", {
                    id: "allContainer",
                    "class": "allContainer"
                }, "closeLayersButton", "after");

                //Select all and clear all buttons
                var selectAll = domContruct.create("a", {
                    id: "selectAll",
                    "data-bind": "{text:selectAll}"
                }, "allContainer");
                var clearAll = domContruct.create("a", {
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
                for (i = 0; i < len; i++) {
                    visLayersArr[i] = i;
                    var visibleLayers = map.getLayer(mapLayerLangId).visibleLayers;
                    var checkValue = false;
                    arrayUtil.some(visibleLayers, function(id) {
                        if (i == id) {
                            checkValue = true;
                            return checkValue;
                        }
                    });

                    //create dom elements 
                    var containerDiv = domContruct.create("div", {
                        id: "container" + i,
                        "class": "toggleContainer"
                    }, "layersCP");
                    var checkBoxDiv = domContruct.create("div", {
                        id: "checkBoxDiv" + i
                    }, containerDiv);
                    var titleDiv = domContruct.create("div", {
                        id: "sliderTitleDiv" + i
                    }, containerDiv);
                    var sliderContainerDiv = domContruct.create("div", {
                        id: "sliderContainerDiv" + i,
                        "class": "sliderContainer"
                    }, containerDiv);
                    var sliderDiv = domContruct.create("div", {
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
                        value: resource.defaultLayerTransparency,
                        minimum: 0,
                        maximum: 100,
                        intermediateChanges: false,
                        onChange: function(sliderValue) {
                            topic.publish(toolsevents.transparencyChange, mapLanguageLayerIds, sliderValue, this.arrayLayerValue);
                        }
                    }, "sliderDiv" + i);

                    var sliderText = domContruct.create("div", {
                        id: "sliderText" + i,
                        "class": "sliderText"
                    }, containerDiv);
                    var hzLine = domContruct.create("div", {
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

                    arrayUtil.forEach(layerParams.layers, function (layer, i) {

                        var containerDiv = domContruct.create("div", {
                            id: layerParams.idPrefix + "container" + i,
                            "class": "toggleContainer"
                        }, layerParams.container);

                        var checkBoxDiv = domContruct.create("div", {
                            id: layerParams.idPrefix + "checkBoxDiv" + i
                        }, containerDiv);

                        var titleDiv = domContruct.create("div", {
                            id: layerParams.idPrefix + "sliderTitleDiv" + i,
                            "class": "sliderTitleDiv"
                        }, containerDiv);

                        var sliderContainerDiv = domContruct.create("div", {
                            id: layerParams.idPrefix + "sliderContainerDiv" + i,
                            "class": "sliderContainer"
                        }, containerDiv);

                        var sliderDiv = domContruct.create("div", {
                            id: layerParams.idPrefix + "sliderDiv" + i
                        }, sliderContainerDiv);

                        var sliderText = domContruct.create("div", {
                            id: layerParams.idPrefix + "sliderText" + i,
                            "class": "sliderText"
                        }, containerDiv);

                        if (layer.toolsContainerId) {
                            domContruct.create('div', {
                                'id': layer.toolsContainerId,
                                'class': 'tools-container',
                                'innerHTML': layer.toolContent,
                                'style': 'display: none;'
                            }, containerDiv);
                        }

                        var hzLine = domContruct.create("div", {
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
                            value: resource.defaultLayerTransparency,
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

                topic.publish(toolsevents.transparencyChange, mapLanguageLayerIds, resource.defaultLayerTransparency, visLayersArr);

                var sources = mainmodel.sourcesArray();
                var sourceContent;

                arrayUtil.some(sources, function(source) {
                    var id = source.id.toLowerCase();
                    if (id.indexOf(language) > -1) {
                        sourceContent = source.resourceInfo.serviceDescription;
                        return false;
                    }
                });

                sources = new Dialog({
                    id: "sources",
                    content: sourceContent,
                    style: "width: 300px"
                });
                attr.set(dom.byId("sources_title"), "data-bind", "{text:sources}");

                /* Add Download Data -----------------------------*/
                downloadData = new Dialog({
                    title: "",
                    id: "data",
                    style: "width: 330px"
                });

                on.once(downloadData, "show", function() {

                    var dataContent = query("#data .dijitDialogPaneContent");
                    dataContent[0].id = "dataContent";


                    attr.set(dom.byId("data_title"), "data-bind", "{text:downloadData}");
                    var requestHandle = esriRequest({
                        "url": (AGOL_CONFIG ? AGOL_CONFIG.dataDownloadURL : resource.dataDownloadURL),
                        "content": {
                            "f": "json"
                        },
                        "callbackParamName": "jsoncallback"
                    });
                    requestHandle.then(requestSucceeded, requestFailed);
                    var layerArray = [];

                    function requestSucceeded(response, io) {
                        console.log(response.parameters[0].choiceList);
                        console.log(response);
                        layerArray = response.parameters[0].choiceList;

                        dom.byId("data").style.top = "200px";

                        var layersHeader = domContruct.create("div", {
                            id: "layers",
                            "class": "header",
                            "data-bind": "{text:singleShapeDownload}"
                        }, "dataContent");
                        domContruct.create("ul", {
                            id: "dataContentList",
                            "class": "links"
                        }, "dataContent");
                        for (i = 0; i < layerArray.length; i++) {
                            domContruct.create("li", {
                                id: "listItem" + i,
                                "class": "links"
                            }, "dataContentList");
                            var dataTitleDiv = domContruct.create("a", {
                                id: "dataTitleDiv" + i,
                                "class": "links"
                            }, "listItem" + i);


                            var layersTitlePane = new contentPane({
                                content: layerArray[i],
                                layerValue: i,
                                style: "height:auto",
                                onClick: function() {
                                    var english = "es";
                                    arrayUtil.some(map.layerIds, function(layerId) {
                                        layerIdlower = layerId.toLowerCase();
                                        mapLayerLangId = layerId;
                                        return (layerIdlower.indexOf("_" + english) > -1);
                                    });
                                    //alert(this.layerValue);
                                    //alert(layerArray[this.layerValue]);
                                    topic.publish(toolsevents.dataDownload, layerArray[this.layerValue], this.layerValue);

                                    //fire event
                                    return false;
                                }
                            }, "dataTitleDiv" + i);


                        }
                        var downloadAll = domContruct.create("div", {
                            id: "downloadAll",
                            "class": "header",
                            "data-bind": "{text:allShapeDownload}"
                        }, "dataContent");
                        domContruct.create("ul", {
                            id: "dataAllList"
                        }, "dataContent");
                        domContruct.create("li", {
                            id: "listItemAll",
                            "class": "links"
                        }, "dataAllList");
                        var dataTitleDiv = domContruct.create("a", {
                            id: "downloadAllLink",
                            "class": "links",
                            "href": (AGOL_CONFIG ? AGOL_CONFIG.downloadAll : resource.downloadAll),
                            "innerHTML": "Download All shapefiles"
                        }, "listItemAll");


                        var kmzHeader = domContruct.create("div", {
                            id: "kmzHeader",
                            "class": "header",
                            "data-bind": "{text:kmlDownload}"
                        }, "dataContent");
                        domContruct.create("ul", {
                            id: "kmzList",
                            "class": "links"
                        }, "dataContent");
                        domContruct.create("li", {
                            id: "kmzItem",
                            "class": "links"
                        }, "kmzList");
                        var kmz = domContruct.create("a", {
                            id: "kmz",
                            innerHTML: "KML",
                            "class": "links"
                        }, "kmzItem");
                        var kmzUrl = map.getLayer(mapLayerLangId).url;
                        kmzUrl = kmzUrl + "/kml/mapImage.kmz";
                        kmz.href = kmzUrl;
                        ready(kmz, function() {
                            var dataModel = Model.getDataModel();
                            knockout.applyBindings(dataModel, dom.byId("data"));
                        });

                    }

                    function requestFailed(response, io) {
                        console.log(response);
                    }



                });
                on(dom.byId("downloadData"), "click", function() {
                    downloadData.show();
                });
                on(dom.byId("sources"), "click", function() {
                    sources.show();
                });
                on(dom.byId("mobile_sources"), "click", function () {
                    sources.show();
                });


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
                }


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
                    url: (AGOL_CONFIG ? AGOL_CONFIG.printURL : resource.printURL)
                }, dom.byId("printContent"));


                printDijit.startup();

                var loadingGif = domContruct.create("div", {
                    id: "laodingGif",
                    "class": "header",
                }, "printContent");


                on(dom.byId("print-button"), "click", function() {

                    var country = (AGOL_CONFIG ? AGOL_CONFIG.country : resource.country); 
                    var title = (AGOL_CONFIG ? AGOL_CONFIG.appLanguages[mainmodel.currentLanguage()].title : resource.appLanguages[mainmodel.currentLanguage()].title);
                    var subtitle = (AGOL_CONFIG ? AGOL_CONFIG.appLanguages[mainmodel.currentLanguage()].flagTitle : resource.appLanguages[mainmodel.currentLanguage()].flagTitle);

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
                var legendDiv = domContruct.create("div", {
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
                // var basemapsDiv = domContruct.create("div", {
                //     id: "basemapsDiv"
                // }, "basemapGalleryCP");
                o._basemapGallery = new BasemapGallery({
                    id: "basemapGallery",
                    showArcGISBasemaps: true,
                    map: map
                    // "data-bind": "{with:basemapTitles}"
                }, "basemap-gallery");
                o._basemapGallery.startup();


                on(o._basemapGallery, "error", function(msg) {
                    console.log(msg);
                });





                on(o._basemapGallery, "load", function() {

                    // registry.byId("basemapGallery").domNode.setAttribute("data-bind", "{with:basemapTitles}");

                    query(".esriBasemapGalleryLabelContainer span").forEach(function(node, index, arr) {

                        var title = node.title.toLowerCase();
                        title = title.replace(/ +/g, "_");

                        node.setAttribute("data-bind", "{html:basemapTitles()." + title + "}");

                        node.innerHTML = "";
                        // console.log(arr.length);

                    });

                    topic.publish(toolsevents.UIcreationComplete);

                });
                /*End Basemap Gallery ---------------------------------*/


                //topic.publish(toolsevents.UIcreationComplete);
                //topic.publish(toolsevents.mapZoomEnd);

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