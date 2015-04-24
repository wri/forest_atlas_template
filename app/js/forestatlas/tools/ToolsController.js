define(

    ["declare",
        "hash",
        "ioquery",
        "ko",
        "toolsmodel",
        "mapmodel",
        "mapconfig",
        "toolsconfig",
        "registry",
        "style",
        "dom",
        "array",
        "combobox",
        "menuitem",
        "menuseparator",
        "memory",
        "class",
        "query",
        "find",
        "findparameters",
        "number",
        "all",
        "string",
        "topic",
        "mainmodel",
        "cookie",
        "all",
        "win",
        "mapui",
        "grid",
        "ifrs",
        "uifactory",
        "construct",
        "attr",
        "esriquery",
        "querytask",
        "on",
        "connect",
        "graphic",
        "edit",
        "draw",
        "undomanager",
        "delete",
        "update",
        "add",
        "attachmenteditor",
        "memory",
        "filteringselect",
        "screenutils",
        "extent",
        "screenpoint",
        "dynamicMapLayer",
        "layerDrawingOptions",
        "featureLayer",
        "webMercatorUtils",
        "ioquery",
        "registry",
        "esrirequest",
        "tiledmap",
        "arcgisutil",
        "atlas/tools/DrawTools",
        "atlas/tools/Uploader",
        "atlas/tools/Helper"
    ], function (declare, hash, ioQuery, ko, Model, MapModel, MapConfig, Config, registry, style, dom, arrayUtil, ComboBox, MenuItem, MenuSeparator, Memory, domClass, query, FindTask, FindParameters, number, all, string, topic, MainModel, cookie, all, win, MapUI, Grid, ItemFileWriteStore, UIFactory, domContruct, domAttr, Query, QueryTask, on, connect, Graphic, Edit, Draw, UndoManager, Delete, Update, Add, AttachmentEditor, Memory, FilteringSelect, ScreenUtils, Extent, ScreenPoint, dynamicMapLayer, LayerDrawingOptions, FeatureLayer, webMercatorUtils, ioQuery, registry, esriRequest, ArcGISTiledMapServiceLayer, arcgisUtils, DrawTools, Uploader, Helper) {

        return declare(null, {

            UIcreationComplete: function(response) {

                //calculate score     

                Model.initialize("mapTools", response);

                var map = MapUI.getMap();
                var toolsmodel = Model.getVM();
                var mapResponse = MapUI.getWebMapResponse();
                var layersList = arcgisUtils.getLegendLayers(mapResponse);

                // var mainmodel = MainModel.getVM();
                arrayUtil.forEach(layersList, function(lyr) {
                    var layer = map.getLayer(lyr.layer.id);
                    on(layer, "update-end", function() {

                        if (toolsmodel.currentLayerId() == layer.id) {


                        }
                    });
                });

                // Initialize Add This
                addthis.init();

                // Bind Events
                this.addEvents();

                // Init the Draw Tools
                DrawTools.init();

                // Remove Hide On Load Classes so Dijits Appear Correctly
                query('.hideOnLoad').forEach(function (node) {
                    domClass.remove(node, 'hideOnLoad');
                });

                if (!Helper.isMobile()) {
                    registry.byId("legendTitlePane").toggle();
                }

                var basemapGallery = registry.byId('basemapGallery');
                // Apply bindings to the basemap gallery
                if (basemapGallery.loaded) {
                    ko.applyBindings(toolsmodel, document.getElementById('basemapGallery'));
                } else {
                    on.once(basemapGallery, 'load', function () {
                        ko.applyBindings(toolsmodel, document.getElementById('basemapGallery'));
                    });
                }

            },

            addEvents: function () {

                var vm = Model.getVM(),
                    map = MapUI.getMap(),
                    graphicsLayer = map.getLayer('customGraphicsLayer'),
                    self = this;


                on(dom.byId('analyze-button'), 'click', function () {
                    vm.analyzeToolsVisible(!vm.analyzeToolsVisible());
                    if (vm.shareToolsVisible()) {
                        vm.shareToolsVisible(false);
                    }
                    if (vm.basemapGalleryVisible()) {
                        vm.basemapGalleryVisible(false);
                    }

                    if (vm.analyzeToolsVisible() && graphicsLayer.graphics.length > 0) {
                        style.set('clearAllFeatures', 'display', 'block');
                    } else {
                        style.set('clearAllFeatures', 'display', 'none');
                    }


                });

                on(dom.byId('share-button'), 'click', function () {
                    vm.shareToolsVisible(!vm.shareToolsVisible());
                    if (vm.analyzeToolsVisible()) {
                        vm.analyzeToolsVisible(false);
                    }
                    if (vm.basemapGalleryVisible()) {
                        vm.basemapGalleryVisible(false);
                    }
                });

                on(dom.byId('basemap-button'), 'click', function () {
                    vm.basemapGalleryVisible(!vm.basemapGalleryVisible());
                    if (vm.shareToolsVisible()) {
                        vm.shareToolsVisible(false);
                    }
                    if (vm.analyzeToolsVisible()) {
                        vm.analyzeToolsVisible(false);
                    }
                });

                on(dom.byId('uploadFeatures'), 'click', function () {
                    vm.showUploadTools(!vm.showUploadTools());
                });

                on(dom.byId('drawFeatures'), 'click', function () {
                    DrawTools.toggle();
                    vm.analyzeToolsVisible(false);
                });

                on(document.uploadForm, 'change', function (evt) {
                    Uploader.beginUpload(evt);
                });

                on(dom.byId('mobileToggle'), 'click', function () {
                    var display = style.get('mobileMenu', 'display') === 'block' ? 'none' : 'block';
                    style.set('mobileMenu', 'display', display);
                });

                on(dom.byId('closeLayersButton'), 'click', function () {
                    self.toggleLayerPanel();
                });

                on(dom.byId('openLayersButton'), 'click', function () {
                   self.toggleLayerPanel(); 
                });

                on(dom.byId('clearAllFeatures'), 'click', function () {
                    graphicsLayer.clear();
                    style.set('clearAllFeatures', 'display', 'none');
                });

            },

            toggleLayerPanel: function () {
                var newWidth = Helper.isMobile() ? (window.innerWidth - 1) : 400; 
                var newValue = style.get('toolsContainer', 'width') === 0 ? newWidth : 0;
                var stackContainer = registry.byId('stackContainer');
                style.set('toolsContainer', 'width', newValue + 'px');
                style.set(stackContainer.domNode, 'left', newValue + 'px');
                registry.byId('mainBorderContainer').resize();

                if (newValue === 0) {
                    style.set('closeLayersButton', 'display', 'none');
                    style.set('openLayersButton', 'display', 'block');
                } else {
                    style.set('closeLayersButton', 'display', 'block');
                    style.set('openLayersButton', 'display', 'none');
                    // Resize the accordion to avoid weirdness with labels
                    dijit.byId('accordionContainer').resize();
                }

            },


            changeLayerVisibility: function(args, obj) {
                var map = MapUI.getMap();
                var layerId = obj.layerId;
                var targetLayer = map.getLayer(layerId);
                var visible = args[0];
                visible ? targetLayer.show() : targetLayer.hide();
            },

            clickLayerVisibility: function(args, obj) {

                var evt = args[0];
                evt.stopPropagation();

            },

            clickLayerLegend: function(args, obj) {
                var map = MapUI.getMap();
                map.infoWindow.hide();



                var nodeId = "legendDiv_" + obj.layerId;
                var layerId = obj.layerId;



                query(".selectedLegendItem").forEach(function(node) {
                    domClass.remove(node, "selectedLegendItem");
                });

                domClass.add(nodeId, "selectedLegendItem");
                require(["toolsevents"], function(Events) {
                    var toolsevents = Events.getEvents();
                    topic.publish(toolsevents.clearHighlight);
                });



            },

            highlighGraphic: function(geometry /*Array*/ ) {

                //first clear 
                require(["toolsevents"], function(Events) {
                    var toolsevents = Events.getEvents();
                    topic.publish(toolsevents.clearHighlight);

                    var map = MapUI.getMap();
                    var graphic = new Graphic(geometry[0]); //symbol,attributes,infoTemplate

                    var geometryType = geometry[0].type;

                    var highlightGraphicsLayer;

                    switch (geometryType) {
                        case "point":
                            highlightGraphicsLayer = map.getLayer("highlightGraphicsLayerPoint");
                            break;
                        case "polyline":
                            highlightGraphicsLayer = map.getLayer("highlightGraphicsLayerLine");
                            break;
                        case "polygon":
                            highlightGraphicsLayer = map.getLayer("highlightGraphicsLayerPoly");
                            break;
                    }

                    highlightGraphicsLayer.add(graphic);
                });
            },

            clearHighlight: function() {
                var map = MapUI.getMap();
                map.getLayer("highlightGraphicsLayerPoint").clear();
                map.getLayer("highlightGraphicsLayerLine").clear();
                map.getLayer("highlightGraphicsLayerPoly").clear();
                map.graphics.clear();
            },

            showMoreOptions: function(layerId) {

                //alert(layerId);
            },


            transparencyChange: function(mapLanguageLayerIds, sliderValue, arrayLayerValue) {

                for (var i = 0; i < mapLanguageLayerIds.length; i++) {

                    var map = MapUI.getMap();
                    var value = 100 - sliderValue;
                    var targetLayer = map.getLayer(mapLanguageLayerIds[i]);
                    var optionsArray = MapModel.getVM().layersDrawingOption();
                    var layerDrawingOption = new LayerDrawingOptions();

                    layerDrawingOption.transparency = value;
                    if (arrayLayerValue.length > 1) {
                        for (var j = 0; j < arrayLayerValue.length; j++)
                            optionsArray[j] = layerDrawingOption;
                    } else {
                        optionsArray[arrayLayerValue] = layerDrawingOption;
                    }
                    
                    MapModel.getVM().layersDrawingOption(optionsArray);
                    targetLayer.setLayerDrawingOptions(optionsArray);

                }
            },
            toggleMapLayer: function(mapLanguageLayerIds, checkBoxChecked, arrayLayerValue) {
                var vm = MapModel.getVM();
                var currentLayerId = vm.currentActiveLayer().id;



                var check = query("#layersCP .dijitCheckBox");
                if (checkBoxChecked == false) {
                    check[arrayLayerValue].style.backgroundImage = "none";
                    dom.byId("sliderContainerDiv" + arrayLayerValue).style.display = "none";
                    dom.byId("sliderText" + arrayLayerValue).style.display = "none";
                    dom.byId("sliderTitleDiv" + arrayLayerValue).style.color = "#cfcfcf";

                } else if (checkBoxChecked == true) {
                    check[arrayLayerValue].style.backgroundImage = "url('app/images/ico-checkmark.png')";
                    dom.byId("sliderContainerDiv" + arrayLayerValue).style.display = "block";
                    dom.byId("sliderText" + arrayLayerValue).style.display = "block";
                    dom.byId("sliderTitleDiv" + arrayLayerValue).style.color = "#000";
                }

                for (var i = 0; i < mapLanguageLayerIds.length; i++) {

                    var map = MapUI.getMap();
                    var targetLayer = map.getLayer(mapLanguageLayerIds[i]);
                    var featureLayerId = targetLayer.id + "_" + arrayLayerValue;
                    var targetFeatureLayer = map._layers[featureLayerId];

                    if (targetFeatureLayer) {
                        if (!checkBoxChecked) {
                            targetFeatureLayer.hide();

                        } else if (targetLayer.id == currentLayerId) {
                            targetFeatureLayer.show();
                        }
                    }
                    var dynamicLayerInfo = targetLayer.createDynamicLayerInfosFromLayerInfos();

                    var referenceArray = [];

                    for (var j = 0; j < dynamicLayerInfo.length; j++) {
                        referenceArray[j] = j;
                    }

                    //get index of reference array
                    var index = referenceArray.indexOf(arrayLayerValue);
                    var layerInd = targetLayer.visibleLayers.indexOf(index);

                    if (!checkBoxChecked) {
                        targetLayer.visibleLayers.splice(layerInd, 1);
                    } else {
                        targetLayer.visibleLayers.push(arrayLayerValue);
                    }


                    var j,
                        len = targetLayer.visibleLayers.length,
                        out = [],
                        obj = {};

                    for (j = 0; j < len; j++) {
                        obj[targetLayer.visibleLayers[j]] = 0;
                    }

                    for (j in obj) {
                        out.push(Number(j));
                    }

                    if (out.length == 0) {
                        out.push(-1);
                    }

                    targetLayer.visibleLayers = out;
                    targetLayer.setVisibleLayers(targetLayer.visibleLayers);                    
                    map.graphics.refresh();

                }


            },


            /**
            * Previous Function is too coupled to the webmap layers and UI elements, instead of forcing the new
            * extra layers through that into that format, handle them with this function
            */
            toggleExtraLayers: function (active, layerId, container) {
                var containerIdString = '#' + container;
                var style = (active ? 'block' : 'none');
                var color = (active ? '#000' : '#CFCFCF');
                var mapconfig = MapConfig.getConfig();
                var map = MapUI.getMap();
                var visibleLayers, layer, tempNode;

                // Update the styling of the checkboxes, do it in a similar way to the above function so everything looks the same
                // This should be refactored and done via css so we dont need to query the dom and update inline styles
                // every time

                query(containerIdString + ' .dijitCheckBox')[0].style.backgroundImage = (active ? "url('app/images/ico-checkmark.png')" : style);
                query(containerIdString + ' .sliderContainer')[0].style.display = style;
                query(containerIdString + ' .sliderText')[0].style.display = style;
                query(containerIdString + ' .sliderTitleDiv')[0].style.color = color;

                tempNode = query(containerIdString + ' .tools-container');
                if (tempNode.length > 0) {
                    tempNode[0].style.display = style;
                }

                if (active) {
                    // Update the Map Service
                    layer = map.getLayer(layerId);
                    if (layer) {
                        layer.show();
                    }

                    // Update Legend for Image Service layers
                    if (mapconfig[layerId].legendLayer) {
                        layer = map.getLayer(mapconfig.legendLayer.id);
                        visibleLayers = layer.visibleLayers;
                        visibleLayers.push(mapconfig[layerId].legendLayer);
                        layer.setVisibleLayers(visibleLayers);
                        layer.show(); 
                    }

                } else {
                    // Update the Map Service
                    layer = map.getLayer(layerId);
                    if (layer) {
                        layer.hide();
                    }

                    // Update Legend for Image Service layers
                    if (mapconfig[layerId].legendLayer) {
                        layer = map.getLayer(mapconfig.legendLayer.id);
                        visibleLayers = layer.visibleLayers;
                        var index = arrayUtil.indexOf(visibleLayers, mapconfig[layerId].legendLayer);
                        visibleLayers.splice(index, 1);
                        layer.setVisibleLayers(visibleLayers);
                        if (visibleLayers.length === 0) {
                            layer.hide();
                        }
                    }

                }

            },

            adjustLayerOpacity: function (layerId, opacity) {
                var map = MapUI.getMap();
                var layer = map.getLayer(layerId);
                if (layer) {
                    layer.setOpacity((opacity / 100));
                }
            },

            dataDownload: function(layer, layerNum) {

                var dataDownloadURL = app.config.dataDownloadURL;

                if (layerNum != "All") {

                    var write = dom.byId("listItem" + layerNum);
                    write.style.background = "url('app/images/ajax-loader.gif') no-repeat right";

                    require(["dojo/dom", "dojo/_base/array", "esri/tasks/Geoprocessor"], function(dom, arrayUtil, Geoprocessor) {
                        gp = new Geoprocessor(dataDownloadURL);
                        gp.setOutSpatialReference({
                            wkid: 102100
                        });

                        var params = {
                            "Layers_to_Clip": [layer],
                            "Area_of_Interest": {
                                "displayFieldName": "",
                                "geometryType": "esriGeometryPolygon",
                                "spatialReference": {
                                    "wkid": null
                                },
                                "fields": [{
                                    "name": "FID",
                                    "type": "esriFieldTypeOID",
                                    "alias": "FID"
                                }, {
                                    "name": "Id",
                                    "type": "esriFieldTypeInteger",
                                    "alias": "Id"
                                }, {
                                    "name": "Shape_Length",
                                    "type": "esriFieldTypeDouble",
                                    "alias": "Shape_Length"
                                }, {
                                    "name": "Shape_Area",
                                    "type": "esriFieldTypeDouble",
                                    "alias": "Shape_Area"
                                }],
                                "features": [],
                                "exceededTransferLimit": false
                            },
                            "Feature_Format": "Shapefile - SHP - .shp"
                        };

                        gp.execute(params, completeCallback, statusCallback, function(error) {
                            console.log("Tools Controller >>>>>>>>>>>>>>> Status Error Data Download");
                            console.log(error);
                        });

                        function completeCallback(jobinfo) {
                            var url = jobinfo[0].value.url;
                            window.open(url, "Download");
                            write.style.background = "none";
                            console.log("Tools Controller >>>>>>>>>>>>>>>> Download Success");

                        }

                        function statusCallback(jobinfo) {
                            // console.dir(jobinfo);
                        }

                    });
                } else {

                    var write = dom.byId("allItem");
                    write.style.background = "url('app/images/ajax-loader.gif') no-repeat right";
                    require(["dojo/dom", "esri/tasks/Geoprocessor"], function(dom, Geoprocessor) {
                        gp = new Geoprocessor(dataDownloadURL);
                        gp.setOutSpatialReference({
                            wkid: 102100
                        });                        
                        var params = {
                            "Layers_to_Clip": layer,
                            "Area_of_Interest": {
                                "displayFieldName": "",
                                "geometryType": "esriGeometryPolygon",
                                "spatialReference": {
                                    "wkid": null
                                },
                                "fields": [{
                                    "name": "FID",
                                    "type": "esriFieldTypeOID",
                                    "alias": "FID"
                                }, {
                                    "name": "Id",
                                    "type": "esriFieldTypeInteger",
                                    "alias": "Id"
                                }, {
                                    "name": "Shape_Length",
                                    "type": "esriFieldTypeDouble",
                                    "alias": "Shape_Length"
                                }, {
                                    "name": "Shape_Area",
                                    "type": "esriFieldTypeDouble",
                                    "alias": "Shape_Area"
                                }],
                                "features": [],
                                "exceededTransferLimit": false
                            },
                            "Feature_Format": "Shapefile - SHP - .shp"
                        };

                        gp.setUpdateDelay(10000);

                        gp.submitJob(params, completeCallback, statusCallback, function(error) {
                            console.log("Tools Controller >>>>>>>>>>>>>>> Status Error Data Download");
                            console.log(error);
                        });

                        function completeCallback(jobinfo) {
                            //var url = jobinfo[0].value.url;
                            console.log(jobinfo);
                            window.open(url, "Download");
                            write.style.background = "none";
                            console.log("Tools Controller >>>>>>>>>>>>>>>> Download Success");

                        }

                        function statusCallback(jobinfo) {
                            console.dir(jobinfo);
                        }

                    });
                }


            },
            search: function(inputValue, currentLayerId) {
                var map = MapUI.getMap(),
                    vm = MapModel.getVM(),
                    layerId = vm.currentActiveLayer().id,
                    visibleLayersArr = map.getLayer(layerId).visibleLayers,
                    url = map.getLayer(layerId).url,
                    layersArr = [],
                    fieldsArr = [],
                    outfields, count = 0,
                    nameValue, mapResponse = MapUI.getWebMapResponse();

                arrayUtil.forEach(visibleLayersArr, function(layer) {
                    layersArr[layer] = map.getLayer(layerId + "_" + layer);
                    outfields = layersArr[layer];

                    if (outfields) {

                        arrayUtil.forEach(outfields.fields, function(item) {
                            if (item.type === "esriFieldTypeString") {
                                fieldsArr[count] = item.name;
                                count++;
                            }
                        });
                    } else {

                    }
                });


                var find = new FindTask(url);
                var params = new FindParameters();
                params.searchFields = fieldsArr;
                params.layerIds = visibleLayersArr;
                params.returnGeometry = false;
                params.searchText = inputValue;
                find.execute(params, showResults);

                function showResults(results) {

                    var result, attribs, data = [],
                        nameValue;
                    var objectId;
                    var parentLayerId = layerId;

                    arrayUtil.forEach(results, function(result, index) {

                        var title, count = 0,
                            opLayers = mapResponse.itemInfo.itemData.operationalLayers;

                        arrayUtil.some(opLayers, function(opLayer) {

                            if (opLayer.id == parentLayerId) {

                                var layersArr = opLayer.layers;

                                arrayUtil.some(layersArr, function(layer) {

                                    if (layer.id == result.layerId) {

                                        var subTitle = layer.popupInfo.title;
                                        subTitle = subTitle.match(/[^{]+(?=\})/g);
                                        var fieldInfos = layer.popupInfo.fieldInfos;

                                        arrayUtil.some(fieldInfos, function(fieldInfo) {
                                            if (subTitle == fieldInfo.fieldName) {
                                                title = fieldInfo.label;

                                            }
                                        });

                                    }
                                });
                            }
                        });

                        for (name in result.feature.attributes) {
                            count++;
                            if (name == title) {
                                nameValue = result.feature.attributes[name];
                            }
                        }

                        var layers = mapResponse.itemInfo.itemData.operationalLayers[0].layers;
                        arrayUtil.some(layers, function(layer) {
                            var layerId = result.layerId;

                            if (layerId == layer.id) {

                                var feature = result.feature;
                                data.push({
                                    name: result.value + " | " + result.layerName + ": " + nameValue,
                                    id: "result" + index,
                                    layerId: layerId,
                                    feature: feature,
                                    layerName: result.layerName
                                });
                            }

                        });

                    });

                    var searchStore = new Memory({
                        data: data
                    });

                    registry.byId("search").store.setData(data);
                    var dropDownMenu = registry.byId("search_popup");
                    dropDownMenu.domNode.lastElementChild.parentNode.style.display = "block";

                }
            },

            searchPopup: function() {
                var vm = MapModel.getVM();
                var map = MapUI.getMap();
                var searchObj = registry.byId("search");
                
                if (searchObj.item != null) {
                    map.infoWindow.hide();

                    var title = searchObj.item.layerName;
                    var titleValue;

                    var attributes = searchObj.item.feature.attributes;


                    var layerId = vm.currentActiveLayer().id;
                    var subLayerId = layerId + "_" + searchObj.item.layerId;
                    var targetLayer = map._layers[subLayerId];
                    var objectIdField = targetLayer.objectIdField;

                    var query = new Query();
                    query.returnGeometry = true;
                    query.where = objectIdField + "=" + attributes[objectIdField];
                    targetLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW, function(features, method) {

                        var geometryPopup;
                        if (features[0].geometry.type == "polygon") {
                            geometryPopup = features[0].geometry.getExtent().getCenter();
                            map.setExtent(features[0].geometry.getExtent(), true);
                        }

                        if (features[0].geometry.type == "point") {
                            geometryPopup = features[0].geometry;
                            map.centerAt(geometryPopup);
                        }

                        map.infoWindow.setFeatures(features);
                        map.infoWindow.show(geometryPopup);


                    }); //target select features
                }

            },


            showLoading: function() {
                domClass.remove("loading", "dijitHidden");
                domClass.remove("loadingMsg", "dijitHidden");
            },

            hideLoading: function() {
                domClass.add("loading", "dijitHidden");
                domClass.add("loadingMsg", "dijitHidden");
            },

            showError: function() {

                domClass.add("loadingMsg", "dijitHidden");
                domClass.remove("errorMsg", "dijitHidden");
                setTimeout(function() {
                    domClass.add("loading", "dijitHidden");
                    domClass.add("errorMsg", "dijitHidden");
                }, 2000);
            },

            sendAdminEmail: function() {
                var link = "mailto:PDouard@wri.org?"
                    //+ "?cc=PDouard@wri.org;PDouard@wri.org"
                    + "subject=Notifier la dernière session d’édition" + "&body=(username) a une message pour vous";

                window.location.href = link;



            },
            addBindingsBasemapTitles: function() {

            },


            downloadDataService: function(layerName) {
                //use esriRequest
                //http://gis-forestatlas.wri.org/arcgis/rest/services/ForestAtlasDataExtractor/GPServer
            },

            selectAll: function() {
                var _self = this;
                var map = MapUI.getMap();
                var vm = MapModel.getVM();

                var layerId = vm.currentActiveLayer().id;
                var dynamicLayersArray = [];
                var index = 0;
                var layersArray = [];
                var out = [];
                var targetLayer;
                //mapLayerLangId == current language layer
                arrayUtil.forEach(map.layerIds, function(lid, index) {

                    // Only apply to ArcGIS Online Layers
                    if (lid.search('online') === -1) {
                        return;
                    }


                    if (map.getLayer(lid).supportsDynamicLayers === true) {
                        dynamicLayersArray[index] = lid;

                        targetLayer = map.getLayer(lid);
                        var dynamicLayerInfo = targetLayer.createDynamicLayerInfosFromLayerInfos();

                        arrayUtil.forEach(dynamicLayerInfo, function(layerInfo, k) {
                            var layerInt = k + 1;
                            out[layerInt] = layerInt;
                            targetLayer.visibleLayers = out;
                            targetLayer.setVisibleLayers(targetLayer.visibleLayers);

                            var featureLayerId = lid + "_" + layerInt;
                            var targetFeatureLayer = map._layers[featureLayerId];
                            if (targetFeatureLayer && lid == layerId) {
                                targetFeatureLayer.show();
                            } else if (lid != layerId) {
                                // targetFeatureLayer.hide();
                            }
                        });

                    }
                });


                var checkArray = query("#toolsContainer .dijitCheckBox");
                arrayUtil.some(checkArray, function(checkBox, index) {
                    checkBox.style.backgroundImage = "url('app/images/ico-checkmark.png')";
                    layersArray[index] = index;
                });


                var landUseInputs = query("#layersCP .dijitCheckBox .dijitCheckBoxInput");
                arrayUtil.some(landUseInputs, function(input, index) {
                    if (input.checked !== true) {
                        domAttr.set(input, "aria-checked", "true");
                        domAttr.set(input, "checked", true);
                        if (dijit.byId("checkBoxDiv" + index)) {
                            dijit.byId("checkBoxDiv" + index).set("checked", true);
                        }
                    }
                });

                var landCoverDynamicInputs = query("#forestLossLayers .dijitCheckBox .dijitCheckBoxInput");
                arrayUtil.forEach(landCoverDynamicInputs, function (checkbox) {
                    if (checkbox.checked !== true) {
                        domAttr.set(checkbox, "aria-checked", "true");
                        domAttr.set(checkbox, "checked", true);
                        if (dojo.byId(checkbox.id)) {
                            on.emit(dojo.byId(checkbox.id), 'click', { bubbles: true, cancelable: true });
                        }
                    }
                });

                // Show the Container of the tools
                var landCoverDynamicTools = query("#forestLossLayers .tools-container");
                arrayUtil.forEach(landCoverDynamicTools, function (toolbox) {
                    style.set(toolbox, 'display', 'block');
                });


                var landCoverInputs = query("#forestCoverLayers .dijitCheckBox .dijitCheckBoxInput");
                arrayUtil.forEach(landCoverInputs, function (checkbox) {
                    if (checkbox.checked !== true) {
                        domAttr.set(checkbox, "aria-checked", "true");
                        domAttr.set(checkbox, "checked", true);
                        if (dijit.byId(checkbox.id)) {
                            on.emit(dojo.byId(checkbox.id), 'click', { bubbles: true, cancelable: true });
                        }
                    }
                });

                var title = query("#toolsContainer .title");
                arrayUtil.some(title, function(title) {
                    title.style.color = "#000";
                });

                var sliderContainerArray = query("#toolsContainer .sliderContainer");
                arrayUtil.some(sliderContainerArray, function(sliderContainer) {
                    sliderContainer.style.display = "block";
                });

                var sliderTextArray = query("#toolsContainer .sliderText");
                arrayUtil.some(sliderTextArray, function(sliderText) {
                    sliderText.style.display = "block";
                });
            },

            clearAll: function() {
                var _self = this;
                var map = MapUI.getMap();
                var vm = MapModel.getVM();
                var layerId = vm.currentActiveLayer().id;
                var dynamicLayersArray = [];
                var index = 0;
            
                arrayUtil.forEach(map.layerIds, function(lid) {

                    // Only apply to ArcGIS Online Layers
                    if (lid.search('online') === -1) {
                        return;
                    }

                    if (map.getLayer(lid).supportsDynamicLayers === true) {

                        var targetLayer = map.getLayer(lid);
                        var out = [];

                        targetLayer.setVisibleLayers(out);

                        var dynamicLayerInfo = targetLayer.createDynamicLayerInfosFromLayerInfos();

                        arrayUtil.forEach(dynamicLayerInfo, function(layerInfo, k) {
                            var layerInt = k + 1;
                            var featureLayerId = lid + "_" + layerInt;

                            var targetFeatureLayer = map._layers[featureLayerId];
                            if (targetFeatureLayer) {
                                targetFeatureLayer.hide();
                            }
                        });


                    }
                });

                var checkArray = query("#toolsContainer .dijitCheckBox");
                arrayUtil.some(checkArray, function(checkBox, index) {
                    checkBox.style.backgroundImage = "none";
                });

                var inputArray = query("#layersCP .dijitCheckBox .dijitCheckBoxInput");
                arrayUtil.some(inputArray, function(input, index) {

                    domAttr.set(input, "aria-checked", "false");
                    domAttr.set(input, "checked", false);
                    if (dijit.byId("checkBoxDiv" + index)) {
                        dijit.byId("checkBoxDiv" + index).set("checked", false);
                    }
                    //_self.toggleMapLayer(dynamicLayersArray,false,index);
                });

                var landCoverDynamicInputs = query("#forestLossLayers .dijitCheckBox .dijitCheckBoxInput");
                arrayUtil.forEach(landCoverDynamicInputs, function (checkbox) {
                    if (checkbox.checked !== false) {
                        domAttr.set(checkbox, "aria-checked", "false");
                        domAttr.set(checkbox, "checked", false);
                        if (dojo.byId(checkbox.id)) {
                            on.emit(dojo.byId(checkbox.id), 'click', { bubbles: true, cancelable: true });
                        }
                    }
                });

                // Show the Container of the tools
                var landCoverDynamicTools = query("#forestLossLayers .tools-container");
                arrayUtil.forEach(landCoverDynamicTools, function (toolbox) {
                    style.set(toolbox, 'display', 'none');
                });


                var landCoverInputs = query("#forestCoverLayers .dijitCheckBox .dijitCheckBoxInput");
                arrayUtil.forEach(landCoverInputs, function (checkbox) {
                    if (checkbox.checked) {
                        domAttr.set(checkbox, "aria-checked", "false");
                        domAttr.set(checkbox, "checked", false);
                        if (dijit.byId(checkbox.id)) {
                            on.emit(checkbox, 'click', { bubbles: true, cancelable: true });
                        }
                    }
                });

                var title = query("#toolsContainer .title");
                arrayUtil.some(title, function(title) {
                    title.style.color = "#cfcfcf";
                });

                var sliderContainerArray = query("#toolsContainer .sliderContainer");
                arrayUtil.some(sliderContainerArray, function(sliderContainer) {
                    sliderContainer.style.display = "none";
                });

                var sliderTextArray = query("#toolsContainer .sliderText");
                arrayUtil.some(sliderTextArray, function(sliderText) {
                    sliderText.style.display = "none";
                });

            },

            mapUpdateEnd: function(e) {
                var map = e.target;
                var zoom = map.getLevel();
                var center = map.extent.getCenter();
                var lat = center.getLatitude().toFixed(4); //y
                var lon = center.getLongitude().toFixed(4); //x

                // Update the Hash in the URL
                var currentHash = hash();
                var hashObj = ioQuery.queryToObject(currentHash);
                hashObj.x = lon;
                hashObj.y = lat;
                hashObj.z = zoom;
                hash(ioQuery.objectToQuery(hashObj));

            },

            mapZoomEnd: function(e) {


                var map = MapUI.getMap();
                var vm = MapModel.getVM();

                var layerId = vm.currentActiveLayer().id;

                var layer = map.getLayer(layerId);
                var visibleLayers = layer.visibleLayers;

                var currentScale = map.getScale();
                var layerMinScale = layer.minScale;
                var layerMaxScale = layer.maxScale;
                var hideAll = false;

                hideAll = (currentScale <= layerMinScale && currentScale >= layerMaxScale) ? false : true;
                if (layerMinScale === 0 && layerMaxScale === 0) hideAll = false;

                arrayUtil.forEach(layer.layerInfos, function(linfo, i) {

                    if (hideAll) {
                        domClass.add("container" + i, "dijitHidden");
                        return;
                    }

                    var minScale = linfo.minScale;
                    var maxScale = linfo.maxScale;

                    if (minScale === 0 && maxScale === 0) {
                        domClass.remove("container" + i, "dijitHidden");
                        return;
                    }

                    if ((currentScale <= minScale) && (currentScale >= maxScale)) {
                        domClass.remove("container" + i, "dijitHidden");
                    } else {
                        domClass.add("container" + i, "dijitHidden");
                    }

                });

            },


            printReport: function(obj, evt) {
                var map = MapUI.getMap();
                var vm = MainModel.getVM();
                var mapmodel = MapModel.getVM();
                var mapconfig = MapConfig.getConfig();
                var toolsmodel = Model.getVM();

                var selectedFeature = map.infoWindow.getSelectedFeature();
                var layer = selectedFeature.getLayer();
                var objectIdField = layer.objectIdField;

                var featureId = selectedFeature.attributes[objectIdField];
                var basemap = registry.byId("basemapGallery").getSelected();

                var basemapID;

                if (basemap) {
                    var title = basemap.title.toLowerCase();
                    title = title.replace(/ +/g, "_");
                    switch (title) {
                        case "openstreetmap":
                            basemapID = "osm";
                            break;
                        case "oceans":
                            basemapID = "oceans";
                            break;
                        case "national_geographic":
                            basemapID = "national-geographic";
                            break;
                        case "light_gray_canvas":
                            basemapID = "gray";
                            break;
                        case "terrain_with_labels":
                            basemapID = "terrain";
                            break;
                        case "topographic":
                            basemapID = "topo";
                            break;
                        case "streets":
                            basemapID = "streets";
                            break;
                        case "imagery_with_labels":
                            basemapID = "hybrid";
                            break;
                        case "imagery":
                            basemapID = "satellite";
                            break;
                        case "dark_gray_canvas":
                            basemapID = "dark-gray";
                            break;
                        case "usa_topo_maps":
                            basemapID = "terrain"; //default to terrain
                            break;
                        case "usgs_national_map":
                            basemapID = "terrain"; //default to terrain
                            break;
                    }
                } else {
                    basemapID = app.config.basemap;
                }
                var url = layer.url;
                var urlSplit = url.split("/");
                var layerId = urlSplit.pop();

                var mapService = urlSplit.join("/");

                var targetLayer = map.getLayer(mapmodel.currentActiveLayer().id);
                var visibleLayers = targetLayer.visibleLayers;

                var transparecnyArr = [];
                arrayUtil.forEach(MapModel.getVM().layersDrawingOption(), function(ldo) {
                    transparecnyArr.push(ldo.transparency);
                });



                var queryObj = {
                    idField: objectIdField,
                    idValue: selectedFeature.attributes[objectIdField],
                    mapService: mapService,
                    layerId: layerId,
                    visibleLayers: visibleLayers.join(","),
                    transparency: transparecnyArr.join(","),
                    basemap: basemapID,
                    title: vm.title(),
                    flagTitle: vm.flagTitle(),
                    flagPath: app.config.flagPath,
                    webMap: mapconfig.webMapID,
                    locale: vm.currentLanguage()
                    //extents:extentsLatLon.xmin.toFixed(2)+","+extentsLatLon.ymin.toFixed(2)+","+extentsLatLon.xmax.toFixed(2)+","+extentsLatLon.ymax.toFixed(2)
                };

                var printLocation = (location.href.search('wri.github.io') > -1 ? 'printReport.htm?' : '../printReport.htm?');
                var queryStr = ioQuery.objectToQuery(queryObj);
                window.open(printLocation + queryStr, "_blank");

            },

            popupToggle: function(feature) {

                var map = MapUI.getMap();

                if (map.infoWindow.features && map.infoWindow.features.length !== 0) {
                    query("#printReport").forEach(function(node) {
                        domClass.remove(node, "dijitHidden");
                    });
                } else {

                    query("#printReport").forEach(function(node) {
                        domClass.add(node, "dijitHidden");
                    });
                    return;
                }


                var legislative = dom.byId("legislative"),
                    pdfValue,
                    name;


                if (feature !== undefined) {
                    var attributes = feature.attributes;
                    var pdfURL = app.config.pdfURL;


                    if (legislative) {
                        legislative.style.display = "none";
                    }

                    if (!attributes) {
                        return;
                    }

                    for (name in attributes) {
                        value = attributes[name];
                        if (name == "doc_pdf" || name == "Doc_pdf") {
                            if (value === null && legislative) {
                                legislative.style.display = "none";
                            } else {
                                if (legislative) {
                                    legislative.style.display = "block";
                                    legislative.href = pdfURL + value + ".pdf";
                                }
                                pdfValue = value;
                            }
                        }

                    }

                    var attributesName = query(".attrName");
                    arrayUtil.some(attributesName, function(name) {
                        if (name.innerHTML == "doc_pdf" || name.innerHTML == "Doc_pdf") {
                            name.style.display = "none";
                        }
                    });

                    var attributesValue = query(".attrValue");
                    arrayUtil.some(attributesValue, function(value) {
                        if (value.innerHTML == pdfValue) {
                            value.style.display = "none";
                        }
                    });

                    for (name in attributes) {
                        value = attributes[name];
                        if (name == "doc_pdf" || name == "Doc_pdf") {
                            if (value === null && legislative) {
                                dom.byId("legislative").style.display = "none";
                            } else {
                                if (legislative) {
                                    dom.byId("legislative").style.display = "block";
                                    legislative.href = pdfURL + value + ".pdf";
                                }
                            }
                        }
                    }
                }
            }
        }); //end declare
    }); //end define