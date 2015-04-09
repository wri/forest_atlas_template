define(
    ["declare"], function(declare) {


        var o = declare(null, {


            constructor: function(domID, appType, langType) {

                var id = domID;
                o._vm = {};

                require(["ko", "mainconfig", "dom", "topic", "mainevents", "keyscontroller", "res/Resources", "root/languages"],

                    function(ko, Config, dom, topic, Events, keyscontroller, resource, languages) {

                        var AGOL_CONFIG = app && app.config;

                        var mainconfig = Config.getConfig();
                        var mainevents = Events.getEvents();

                        var language = langType;
                        var translation = languages[language];
                        //from map
                        o._vm.initExtent = ko.observable({});

                        //from main
                        o._vm.appType = ko.observable(appType);
                        o._vm.langType = ko.observable(langType);
                        o._vm.currentLanguage = ko.observable(language);
                        o._vm.printTitle = ko.observable();

                        o._vm.currentInfoTemplates = ko.observable({});
                        o._vm.currentSelectedLayers = ko.observableArray([]);

                        //top titles
                        var title = (AGOL_CONFIG ? AGOL_CONFIG.appLanguages[language].title : resource.appLanguages[language].title);
                        var flagTitle = (AGOL_CONFIG ? AGOL_CONFIG.appLanguages[language].flagTitle : resource.appLanguages[language].flagTitle);
                        var flagPath = (AGOL_CONFIG ? AGOL_CONFIG.flagPath : resource.flagPath);
                        var flagName = (AGOL_CONFIG ? AGOL_CONFIG.flagName : resource.flagName);

                        o._vm.title = ko.observable(title);
                        o._vm.flagTitle = ko.observable(flagTitle);
                        o._vm.flagPath = ko.observable(flagPath);
                        o._vm.flagName = ko.observable(flagName);

                        //nav window titles
                        o._vm.about = ko.observable(translation.about);
                        o._vm.downloadData = ko.observable(translation.downloadData);
                        o._vm.sources = ko.observable(translation.sources);
                        o._vm.print = ko.observable(translation.print);

                        //popup titles
                        o._vm.legislativeText = ko.observable(translation.legislativeText);
                        o._vm.printReport = ko.observable(translation.printReport);
                        o._vm.zoom = ko.observable(translation.zoom);

                        // download data titles
                        o._vm.singleShapeDownload = ko.observable(translation.singleShapeDownload);
                        o._vm.allShapeDownload = ko.observable(translation.allShapeDownload);
                        o._vm.kmlDownload = ko.observable(translation.kmlDownload);

                        //tools tranParency and toggle titles
                        o._vm.selectAll = ko.observable(translation.selectAll);
                        o._vm.clearAll = ko.observable(translation.clearAll);
                        o._vm.transparency = ko.observable(translation.transparency);

                        //basemap titles
                        o._vm.basemapTitles = ko.observable(translation.basemapTitles);

                        // Apply Bindings
                        o._vm.currentActiveLayer = ko.observable();
                        o._vm.sourcesArray = ko.observableArray([]);
                        o._vm.printLayouts = ko.observableArray([]);

                        ko.applyBindings(o._vm, dom.byId(id));


                    });
            }


        });

        o.getVM = function() {
            return o._vm;
        };

        o.initialize = function(domID, appType, langType) {
            if (null == o._instance) {
                o._instance = new o(domID, appType, langType);
            }
            return o._instance;
        };

        o.destroy = function() {
            delete o._instance;
        };

        return o;
    });