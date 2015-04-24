define(
    ["declare", "ko", "dom", "topic", "toolsconfig", "memory", "number", "array", "root/languages", "query", "attr"],
    function(declare, ko, dom, topic, Config, Memory, number, arrayUtil, languages, query, attr) {
        var o = declare(null, {


            constructor: function(domID, response) {

                var toolsconfig = Config.getConfig();

                var id = domID;
                o._vm = {};
                o._dataModel = {};


                require(["toolsevents", "mainmodel", "topic"],

                    function(Events, MainModel, topic) {
                        var mainmodel = MainModel.getVM();
                        var currentLanguage = mainmodel.currentLanguage();

                        var title = app.config.appLanguages[currentLanguage].title;
                        var flagTitle = app.config.appLanguages[currentLanguage].flagTitle;

                        var translation = languages[currentLanguage];
                        var toolsevents = Events.getEvents();

                        o._vm.tabBasemapTitle = ko.observable(translation.tabBasemapTitle);
                        o._vm.tabLegendTitle = ko.observable(translation.tabLegendTitle);
                        o._vm.tabLayersTitle = ko.observable(translation.tabLayersTitle);
                        o._vm.buttonLayersText = ko.observable(translation.buttonLayersText);
                        o._vm.closeButtonText = ko.observable(translation.closeButtonText);

                        o._vm.title = ko.observable(title);
                        o._vm.flagTitle = ko.observable(flagTitle);

                        o._vm.printDialog = ko.observable(translation.printDialog);

                        o._vm.layersDrawingOption = ko.observable([]);

                        o._vm.about = ko.observable(translation.about);
                        o._vm.downloadData = ko.observable(translation.downloadData);
                        o._vm.sources = ko.observable(translation.sources);
                        o._vm.print = ko.observable(translation.print);

                        o._vm.legislativeText = ko.observable(translation.legislativeText);
                        o._vm.printReport = ko.observable(translation.printReport);
                        o._vm.clickPrintReport = function(obj, evt) {
                            topic.publish(toolsevents.printReport, obj, evt);
                        }
                        o._vm.zoom = ko.observable(translation.zoom);


                        o._dataModel.downloadData = ko.observable(translation.downloadData);
                        o._dataModel.singleShapeDownload = ko.observable(translation.singleShapeDownload);
                        o._dataModel.allShapeDownload = ko.observable(translation.allShapeDownload);
                        o._dataModel.kmlDownload = ko.observable(translation.kmlDownload);
                        o._dataModel.allShapeDownload = ko.observable(translation.allShapeDownload);

                        o._vm.selectAll = ko.observable(translation.selectAll);
                        o._vm.clearAll = ko.observable(translation.clearAll);
                        o._vm.transparency = ko.observable(translation.transparency);

                        o._vm.basemapTitles = ko.observable(translation.basemapTitles);

                        o._vm.editingEnabled = ko.observable(false); //write
                        o._vm.editingFeatureEnabled = ko.observable(false); //write
                        o._vm.addFeatureEnabled = ko.observable(false); //write

                        o._vm.currentLayerId = ko.observable("");
                        o._vm.currentEditableGraphic = ko.observable({});
                        o._vm.originalEditableGraphic = ko.observable({});

                        //about link
                        var aboutLinkURL = app.config.aboutLinkUrl;
                        o._vm.aboutLink = ko.observable(aboutLinkURL);

                        // Buttons on the Map
                        o._vm.basemapGalleryVisible = ko.observable(false);
                        o._vm.analyzeToolsVisible = ko.observable(false);
                        o._vm.shareToolsVisible = ko.observable(false);
                        o._vm.showUploadTools = ko.observable(false);


                        // Items for Year Dropdown for forest cover loss layer
                        o._vm.forestLossYears = ko.observableArray([
                            '2001', '2002', '2003', '2004', '2005', '2006',
                            '2007', '2008', '2009', '2010', '2011', '2012'
                        ]);

                        // Items for Analysis
                        o._vm.clearanceAlertBounds = ko.observable();
                        o._vm.clearanceAlertLabels = ko.observable();


                        // Items for Custom Popup
                        o._vm.popupDataTab = ko.observable(translation.popupDataTab);
                        o._vm.popupAnalysisTab = ko.observable(translation.popupAnalysisTab);
                        o._vm.popupActiveTab = ko.observable('popupDataTab');
                        o._vm.popupIndex = ko.observable(0);
                        o._vm.popupCount = ko.observable(0);

                        o._vm.analysisLoss = ko.observable(translation.analysisLoss);
                        o._vm.analysisLC = ko.observable(translation.analysisLC);
                        o._vm.analysisTCD = ko.observable(translation.analysisTCD);
                        o._vm.analysisIFL = ko.observable(translation.analysisIFL);
                        o._vm.analysisCS = ko.observable(translation.analysisCS);
                        o._vm.analysisFire = ko.observable(translation.analysisFire);

                        o._vm.analysisOptions = ko.observableArray(translation.analysisOptions);

                        o._vm.firesOneWeek = ko.observable(translation.firesOneWeek);
                        o._vm.fires72Hours = ko.observable(translation.fires72Hours);
                        o._vm.fires48Hours = ko.observable(translation.fires48Hours);
                        o._vm.fires24Hours = ko.observable(translation.fires24Hours);

                        o._vm.lossStartingYear = ko.observable(translation.lossStartingYear);
                        o._vm.lossEndingYear = ko.observable(translation.lossEndingYear);

                        o._vm.accordionForestCoverTitle = ko.observable(translation.accordionForestCoverTitle);
                        o._vm.accordionForestLossTitle = ko.observable(translation.accordionForestLossTitle);
                        o._vm.accordionLandUseTitle = ko.observable(translation.accordionLandUseTitle);

                        o._vm.analysisLCComposition = ko.observable(translation.analysisLCComposition);
                        o._vm.treeCoverAnalysis = ko.observable(translation.treeCoverAnalysis);
                        o._vm.otherAnalysisTypes = ko.observable(translation.otherAnalysisTypes);

                        o._vm.forestCoverLossLabel = ko.observable(translation.forestCoverLossLabel);
                        o._vm.activeFiresLabel = ko.observable(translation.activeFiresLabel);
                        o._vm.treeCoverDensityLabel = ko.observable(translation.treeCoverDensityLabel);
                        o._vm.landCoverLabel = ko.observable(translation.landCoverLabel);
                        o._vm.treeCoverGainLabel = ko.observable(translation.treeCoverGainLabel);
                        o._vm.carbonLayerLabel = ko.observable(translation.carbonLayerLabel);
                        o._vm.intactForestLayerLabel = ko.observable(translation.intactForestLayerLabel);


                        o._vm.uploadInstructions = ko.observableArray(translation.uploadInstructions);
                        o._vm.drawButtonText = ko.observable(translation.drawButtonText);
                        o._vm.uploadButtonText = ko.observable(translation.uploadButtonText);

                        o._vm.currentAnalysisType = ko.observable(translation.analysisLoss);

                        o._vm.clearAllFeatures = ko.observable(translation.clearAllFeatures);
                        o._vm.deleteCustomFeature = ko.observable(translation.deleteCustomFeature);

                        o._vm.customFeatureShowing = ko.observable(false);


                        o._vm.changePopupTabs = function (model, evt) {
                            var target = evt.target ? evt.target : evt.srcElement;
                            model.popupActiveTab(target.id);
                            if (target.id === 'popupAnalysisTab') {
                                topic.publish('updateAnalysisTab');
                            }
                            // Publish Notification of Tab Changing Incase any controllers care about it
                            // they can subscribe to it
                            topic.publish('popupTabChanged');
                        };

                        o._vm.prevFeature = function (model, evt) {
                            require(['mapui'], function (MapUI) {
                                var map = MapUI.getMap();
                                map.infoWindow.selectPrevious();
                                topic.publish('updateCustomInfoWindow');
                            });
                        };

                        o._vm.nextFeature = function (model, evt) {
                            require(['mapui'], function (MapUI) {
                                var map = MapUI.getMap();
                                map.infoWindow.selectNext();
                                topic.publish('updateCustomInfoWindow');
                            });
                        };

                        o._vm.selectAnalysisType = function (model, evt) {
                            require(['mapui', 'atlas/tools/Results', 'esri/tasks/query', 'esri/tasks/QueryTask'], function (MapUI, Results, EsriQuery, QueryTask) {
                                var target = evt.target ? evt.target : evt.srcElement;
                                var currentType = target.value; //target.getAttribute('data-class');
                                model.currentAnalysisType(currentType);
                                var infoWindow = MapUI.getMap().infoWindow;
                                var activeFeature = infoWindow.getSelectedFeature();

                                if (activeFeature.attributes.OBJECTID) {
                                    var objectId = activeFeature.attributes.OBJECTID;
                                    var layer = activeFeature._layer;
                                    var url = layer._url.path;
                                    var queryTask = new QueryTask(url);
                                    var esriQuery = new EsriQuery();
                                    esriQuery.objectIds = [objectId];
                                    esriQuery.outFields = ['*'];
                                    esriQuery.returnGeometry = true;
                                    esriQuery.maxAllowableOffset = 0;

                                    queryTask.execute(esriQuery, function(featureSet) {
                                        if (featureSet.features.length > 0) {
                                            Results.getResultsForType(currentType, featureSet.features[0]);
                                        } else {
                                            Results.getResultsForType(currentType, activeFeature);
                                        }
                                    });
                                } else {
                                    Results.getResultsForType(currentType, activeFeature);
                                }

                            });
                        };

                        // Apply Bindings
                        ko.applyBindings(o._vm, document.body);

                    });



            }


        });

        o.getDataModel = function() {
            return o._dataModel;
        };

        o.getVM = function() {
            return o._vm;
        };

        o.initialize = function(domID, response) {
            if (o._created) {
                o._update(domID, response);

            } else {
                o._instance = new o(domID, response);
            }
            return o._instance;
        };

        o.destroy = function() {
            delete o._instance;
        };

        return o;
    });