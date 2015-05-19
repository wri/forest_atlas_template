define(
    ["declare",
        "mainmodel",
        "mainconfig",
        "registry",
        "topic",
        "hash",
        "all",
        "string",
        "class",
        "on",
        "featureLayer",
        "querytask",
        "query",
        "dom",
        "root/languages",
        "ioquery"
    ], function(declare, Model, Config, registry, topic, hash, all, string, domClass, on, FeatureLayer, queryTask, query, dom, languages, ioQuery) {
        var appType = "";
        var langType = "";

        return declare(null, {

            changeTitle: function(language) {
                var title = app.config.appLanguages[language].title;
                window.document.title = title;
            },

            UIcreationComplete: function(type, language) {
                appType = type;
                langType = language;

                //set the title based on language
                this.changeTitle(language);

                Model.initialize("headerView", appType, langType);


            },


            changeLanguage: function(value) {

                this.changeTitle(value);

                var newLanguage = value;
                var translation = languages[newLanguage];
                var mainmodel = Model.getVM();
                var prevLanguage = mainmodel.currentLanguage();
                var identifyParams, IdentifyTask;

                // Update the Hash in the URL
                var currentHash = hash();
                var hashObj = ioQuery.queryToObject(currentHash);
                hashObj.l = newLanguage;
                hash(ioQuery.objectToQuery(hashObj));

                //Change common elements here
                var title = app.config.appLanguages[newLanguage].title;
                var flagTitle = app.config.appLanguages[newLanguage].flagTitle;

                mainmodel.title(title);
                mainmodel.flagTitle(flagTitle);




                mainmodel.currentLanguage(newLanguage);


                require(["toolsmodel", "mapui", "mapmodel", "array", "mapcontroller"], function(ToolsModel, MapUI, MapModel, arrayUtil, MapController) {
                    var vm = MapModel.getVM();
                    var mp = vm.mapPoint();
                    var map = MapUI.getMap();
                    var infoLayer = map.infoWindow;

                    switch (appType) {
                        case "atlas":


                            var toolsmodel = ToolsModel.getVM();

                            toolsmodel.tabBasemapTitle(translation.tabBasemapTitle);
                            toolsmodel.tabLegendTitle(translation.tabLegendTitle);
                            toolsmodel.printDialog(translation.printDialog);

                            toolsmodel.tabLayersTitle(translation.tabLayersTitle);
                            toolsmodel.buttonLayersText(translation.buttonLayersText);

                            toolsmodel.about(translation.about);
                            toolsmodel.downloadData(translation.downloadData);
                            toolsmodel.sources(translation.sources);
                            toolsmodel.print(translation.print);
                            toolsmodel.mapThemesLabel(translation.mapThemesLabel);

                            toolsmodel.legislativeText(translation.legislativeText);
                            toolsmodel.printReport(translation.printReport);
                            toolsmodel.zoom(translation.zoom);

                            toolsmodel.closeButtonText(translation.closeButtonText);
                            toolsmodel.popupDataTab(translation.popupDataTab);
                            toolsmodel.popupAnalysisTab(translation.popupAnalysisTab);

                            toolsmodel.analysisLoss(translation.analysisLoss);
                            toolsmodel.analysisLC(translation.analysisLC);
                            toolsmodel.analysisTCD(translation.analysisTCD);
                            toolsmodel.analysisIFL(translation.analysisIFL);
                            toolsmodel.analysisCS(translation.analysisCS);
                            toolsmodel.analysisFire(translation.analysisFire);
                            toolsmodel.analysisLCComposition(translation.analysisLCComposition);

                            toolsmodel.analysisOptions(translation.analysisOptions);

                            toolsmodel.firesOneWeek(translation.firesOneWeek);
                            toolsmodel.fires72Hours(translation.fires72Hours);
                            toolsmodel.fires48Hours(translation.fires48Hours);
                            toolsmodel.fires24Hours(translation.fires24Hours);

                            toolsmodel.lossStartingYear(translation.lossStartingYear);
                            toolsmodel.lossEndingYear(translation.lossEndingYear);                        

                            toolsmodel.accordionForestCoverTitle(translation.accordionForestCoverTitle);
                            toolsmodel.accordionForestLossTitle(translation.accordionForestLossTitle);
                            toolsmodel.accordionLandUseTitle(translation.accordionLandUseTitle);

                            toolsmodel.forestCoverLossLabel(translation.forestCoverLossLabel);
                            toolsmodel.activeFiresLabel(translation.activeFiresLabel);
                            toolsmodel.treeCoverDensityLabel(translation.treeCoverDensityLabel);
                            toolsmodel.landCoverLabel(translation.landCoverLabel);

                            toolsmodel.treeCoverGainLabel(translation.treeCoverGainLabel);
                            toolsmodel.carbonLayerLabel(translation.carbonLayerLabel);
                            toolsmodel.intactForestLayerLabel(translation.intactForestLayerLabel);

                            toolsmodel.treeCoverAnalysis(translation.treeCoverAnalysis);
                            toolsmodel.otherAnalysisTypes(translation.otherAnalysisTypes);                        

                            toolsmodel.selectAll(translation.selectAll);
                            toolsmodel.clearAll(translation.clearAll);
                            toolsmodel.transparency(translation.transparency);

                            toolsmodel.basemapTitles(translation.basemapTitles);

                            toolsmodel.drawButtonText(translation.drawButtonText);
                            toolsmodel.uploadButtonText(translation.uploadButtonText);
                            toolsmodel.uploadInstructions(translation.uploadInstructions);

                            toolsmodel.clearAllFeatures(translation.clearAllFeatures);
                            toolsmodel.deleteCustomFeature(translation.deleteCustomFeature);

                            // update the current analysis type to the same type but in the new language
                            switch (toolsmodel.currentAnalysisType()) {
                                case languages[prevLanguage].analysisLoss:
                                    toolsmodel.currentAnalysisType(translation.analysisLoss);
                                break;
                                case languages[prevLanguage].analysisLC:
                                    toolsmodel.currentAnalysisType(translation.analysisLC);
                                break;
                                case languages[prevLanguage].analysisTCD:
                                    toolsmodel.currentAnalysisType(translation.analysisTCD);
                                break;  
                                case languages[prevLanguage].analysisIFL:
                                    toolsmodel.currentAnalysisType(translation.analysisIFL);
                                break;
                                case languages[prevLanguage].analysisCS:
                                    toolsmodel.currentAnalysisType(translation.analysisCS);
                                break;
                                case languages[prevLanguage].analysisFire:
                                    toolsmodel.currentAnalysisType(translation.analysisFire);
                                break;
                                case languages[prevLanguage].analysisLCComposition:
                                    toolsmodel.currentAnalysisType(translation.analysisLCComposition);
                                break;
                                default:
                                    toolsmodel.currentAnalysisType(translation.analysisLoss);
                                break;
                            }

                            //change map language layer
                            var language = newLanguage.toLowerCase();
                            var mapLayerLangId = "";
                            //console.log(map);
                            arrayUtil.some(map.layerIds, function(layerId) {
                                layerIdlowerCase = layerId.toLowerCase();
                                mapLayerLangId = layerId;
                                return (layerIdlowerCase.indexOf("_" + language) > -1);
                            }); //end array loop

                            var layoutObj = mainmodel.printLayouts();
                            //console.log(layoutObj);

                            vm.currentActiveLayer(map.getLayer(mapLayerLangId));
                            console.log(map);




                            arrayUtil.forEach(map.getLayer(mapLayerLangId).layerInfos, function(layerInfos, index) {

                                var sliderTitle = "sliderTitleDiv" + index;
                                var dataTitle = "dataTitleDiv" + index;
                                dom.byId(sliderTitle).innerHTML = layerInfos.name;


                            });

                            var toggleLanguage = [];

                            toggleLanguage = query(".language");

                            arrayUtil.forEach(toggleLanguage, function(togLanguage, index) {
                                var langValue = togLanguage.value;
                                if (langValue == newLanguage) {

                                    togLanguage.style.color = "white";
                                    togLanguage.style.fontWeight = "bold";
                                } else {
                                    togLanguage.style.color = "black";
                                    togLanguage.style.fontWeight = "normal";
                                }
                            });




                            arrayUtil.forEach(map.layerIds, function(layerId) {

                                if (layerId == mapLayerLangId) {
                                    var visLayers = map.getLayer(layerId).visibleLayers;
                                    map.getLayer(layerId).show();
                                    map.getLayer(layerId).setVisibleLayers(visLayers);
                                } else if ((layerId != mapLayerLangId) && (layerId != map.layerIds[0])) {

                                    arrayUtil.forEach(map.getLayer(layerId).layerInfos, function(layerInfo, k) {

                                        var layerInt = k + 1;

                                        var featureLayerId = layerId + "_" + layerInt;
                                        var targetFeatureLayer = map._layers[featureLayerId];

                                        if (targetFeatureLayer) {

                                            targetFeatureLayer.hide();
                                        }
                                    }); //end array loop */
                                    map.getLayer(layerId).hide();
                                }
                            });



                            var dynamicLayerInfo = map.getLayer(mapLayerLangId).createDynamicLayerInfosFromLayerInfos();
                            var visiblerLayers = map.getLayer(mapLayerLangId).visibleLayers;
                            console.log(visiblerLayers);
                            //Hide All Feature Layers, show if included in visiblerLayers
                            arrayUtil.forEach(dynamicLayerInfo, function(layerInfo, k) {
                                var layerInt = k + 1;

                                var featureLayerId = mapLayerLangId + "_" + layerInt;
                                var targetFeatureLayer = map._layers[featureLayerId];
                                if (targetFeatureLayer) {
                                    if (arrayUtil.indexOf(visiblerLayers, layerInt) > -1) {
                                        targetFeatureLayer.show();

                                    } else {

                                        targetFeatureLayer.hide();
                                    }

                                }


                            });



                            map.getLayer("maskLayer").show();
                            vm.currentActiveLayer(map.getLayer(mapLayerLangId));
                            registry.byId("legendDiv").refresh([{
                                layer: vm.currentActiveLayer(),
                                title: ""
                            }]);
                            //console.log(map._layers);
                            map.infoWindow.hide();


                            break;

                        case "other":


                            break;


                    } //end switch

                }); //end require



            }


        }); //end declare
    }); //end define