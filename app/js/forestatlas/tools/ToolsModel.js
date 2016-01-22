define(
    ["declare", "mainmodel", "ko", "dom", "topic", "toolsconfig", "memory", "number", "array", "root/languages", "query", "attr", "toolsevents", "root/analysis/ethiopiaConfig"],
    function(declare, MainModel, ko, dom, topic, Config, Memory, number, arrayUtil, languages, query, attr, Events, ethiopiaConfig) {
        var o = declare(null, {


            constructor: function(domID, response) {

                var toolsconfig = Config.getConfig();

                var id = domID;
                o._vm = {};
                o._dataModel = {};


                require(["toolsevents"],

                    function(Events) {
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
                        };
                        o._vm.zoom = ko.observable(translation.zoom);

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

                        //nav link
                        o._vm.aboutLink = ko.observable(app.config.aboutLinkUrl);
                        o._vm.downloadLink = ko.observable(app.config.downloadDataUrl);

                        // Nav Dropdown - Map Theme Chooser
                        o._vm.mapThemes = ko.observableArray((currentLanguage === 'en' ? app.config.mapThemes : app.config.mapThemesAlternate));
                        o._vm.showMapThemes = ko.observable(false);
                        o._vm.mapThemesLabel = ko.observable(translation.mapThemesLabel);

                        // Buttons on the Map
                        o._vm.basemapGalleryVisible = ko.observable(false);
                        o._vm.analyzeToolsVisible = ko.observable(false);
                        o._vm.shareToolsVisible = ko.observable(false);
                        o._vm.showUploadTools = ko.observable(false);

                        // Enable/Disable Restoration Module for Ethiopia Atlas
                        o._vm.resotrationModule = ko.observable(true);
                        o._vm.restorationModuleType = ko.observable('restoration');
                        o._vm.resotrationModuleOptions = ko.observableArray(ethiopiaConfig.options);

                        // Items for Year Dropdown for forest cover loss layer
                        o._vm.forestLossYears = ko.observableArray([
                            '2001', '2002', '2003', '2004', '2005', '2006',
                            '2007', '2008', '2009', '2010', '2011', '2012',
                            '2013'
                        ]);

                        // Items for Analysis
                        o._vm.clearanceAlertBounds = ko.observable();
                        o._vm.clearanceAlertLabels = ko.observable();


                        // Items for Custom Popup
                        o._vm.popupDataTab = ko.observable(translation.popupDataTab);
                        o._vm.popupAnalysisTab = ko.observable(translation.popupAnalysisTab);
                        o._vm.popupDocumentTab = ko.observable(translation.popupDocumentTab);
                        o._vm.popupActiveTab = ko.observable('popupDataTab');
                        o._vm.popupIndex = ko.observable(0);
                        o._vm.popupCount = ko.observable(0);

                        o._vm.analysisLoss = ko.observable(translation.analysisLoss);
                        o._vm.analysisLC = ko.observable(translation.analysisLC);
                        o._vm.analysisGain = ko.observable(translation.analysisGain);
                        // o._vm.analysisTCD = ko.observable(translation.analysisTCD);
                        o._vm.analysisIFL = ko.observable(translation.analysisIFL);
                        o._vm.analysisCS = ko.observable(translation.analysisCS);
                        o._vm.analysisFire = ko.observable(translation.analysisFire);
                        o._vm.analysisLCComposition = ko.observable(translation.analysisLCComposition);
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
                        o._vm.landsatTextLabel = ko.observable(translation.landsatTextLabel);

                        o._vm.tcdSelectorBegin = ko.observable(translation.tcdSelectorBegin);
                        o._vm.tcdSelectorEnd = ko.observable(translation.tcdSelectorEnd);
                        o._vm.treeCoverSliderLabel = ko.observable(translation.treeCoverSliderLabel);
                        o._vm.tcdSelectorValue = ko.observable(30);

                        o._vm.landsatOptions = ko.observableArray([2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000]);
                        o._vm.selectedLandsatYear = ko.observable(2013);

                        o._vm.customFeatureShowing = ko.observable(false);

                        o._vm.featureDocuments = ko.observableArray([]);
                        o._vm.documentsUnavailable = ko.observable(translation.documentsUnavailable);

                        o._vm.documentType = ko.observable(translation.documentType);
                        o._vm.documentAuthor = ko.observable(translation.documentAuthor);
                        o._vm.documentDate = ko.observable(translation.documentDate);
                        o._vm.documentLink = ko.observable(translation.documentLink);


                        o._vm.changePopupTabs = function (model, evt) {
                            var target = evt.target ? evt.target : evt.srcElement;
                            model.popupActiveTab(target.id);
                            if (target.id === 'popupAnalysisTab') {
                              topic.publish('updateAnalysisTab');
                            } else if (target.id === 'popupDocumentTab') {
                              topic.publish('updateDocumentsTab');
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
                                var infoWindow = MapUI.getMap().infoWindow;
                                var activeFeature = infoWindow.getSelectedFeature();
                                var options = {};
                                var activeOption = target.options[target.selectedIndex];

                                if (currentType === model.restorationModuleType()) {
                                  options = {
                                    index: +activeOption.getAttribute('data-option')
                                  };
                                }

                                model.currentAnalysisType(currentType);
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
                                            Results.getResultsForType(currentType, featureSet.features[0], options);
                                        } else {
                                            Results.getResultsForType(currentType, activeFeature, options);
                                        }
                                    });
                                } else {
                                    Results.getResultsForType(currentType, activeFeature, options);
                                }

                            });
                        };

                        o._vm.landsatYearChanged = function (thisModel, evt) {
                            var checkbox = document.getElementById('landsat-checkbox');
                            if (checkbox.checked) {
                                topic.publish('updateLandsatLayer');
                            }
                        };

                        o._vm.canopyDensityClicked = function () {
                            require(['atlas/tools/TreeCoverDensityDialog'], function (TCDDialog) {
                                TCDDialog.show();
                            });
                        };

                        o._vm.treeCoverDialogClose = function () {
                            require(['atlas/tools/TreeCoverDensityDialog'], function (TCDDialog) {
                                TCDDialog.hide();
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
