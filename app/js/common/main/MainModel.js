define(
    ["declare"], function(declare) {


        var o = declare(null, {


            constructor: function(domID, appType, langType) {

                var id = domID;
                var appType = appType;
                var langType = langType;
                o._vm = {};

                require(["ko", "mainconfig", "dom", "topic", "mainevents", "keyscontroller", "res/Resources", "root/languages"],

                    function(ko, Config, dom, topic, Events, keyscontroller, resource, languages) {


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
                        o._vm.title = ko.observable(resource.appLanguages[language].title);
                        o._vm.flagTitle = ko.observable(resource.appLanguages[language].flagTitle);

                        o._vm.flagPath = ko.observable(resource.flagPath);
                        o._vm.flagName = ko.observable(resource.flagName);

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
                        /*                        o._vm.basemapTitle0 = ko.observable(translation.basemapTitle0);
                        o._vm.basemapTitle1 = ko.observable(translation.basemapTitle1);
                        o._vm.basemapTitle2 = ko.observable(translation.basemapTitle2);
                        o._vm.basemapTitle3 = ko.observable(translation.basemapTitle3);
                        o._vm.basemapTitle4 = ko.observable(translation.basemapTitle4);
                        o._vm.basemapTitle5 = ko.observable(translation.basemapTitle5);
                        o._vm.basemapTitle6 = ko.observable(translation.basemapTitle6);
                        o._vm.basemapTitle7 = ko.observable(translation.basemapTitle7);
                        o._vm.basemapTitle8 = ko.observable(translation.basemapTitle8);
*/
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
            //  console.log("destroy me");
            delete o._instance;
        };

        return o;
    });