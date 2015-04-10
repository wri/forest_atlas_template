define(
    ["declare",
        "topic",
        "on",
        "dom",
        "dialog",
        "aspect",
        "root/languages",
        "mainconfig",
        "mainevents",
        "array",
        "query",
        "uifactory",
        "registry",
        "construct",
        "ready"
    ], function(declare, topic, on, dom, Dialog, aspect, languages, Config, Events, arrayUtil, query, UIFactory, registry, domConstruct, ready) {

        var o = declare(null, {

            constructor: function(appType, langType) {

                var mainevents = Events.getEvents();
                var mainconfig = Config.getConfig();
                var uifactory = UIFactory.initialize();

                arrayUtil.forEach(mainconfig.ui, function(item) {
                    uifactory.create(item);
                });
                topic.publish(mainevents.UIcreationComplete, appType, langType);

                var configuredLanguages = app.config.appLanguages;

                for (var lang in configuredLanguages) {
                    var languageButton = domConstruct.create("a", languages[lang].languageButtonProps, "languageToggle");
                    on(languageButton, "click", function() {
                        topic.publish(mainevents.changeLanguage, this.value);
                    });
                }


                var toggleLanguage = [];
                toggleLanguage = query(".language");
                arrayUtil.some(toggleLanguage, function(togLanguage, index) {
                    var langValue = togLanguage.value;
                    if (langValue == langType) {

                        togLanguage.style.color = "white";
                        togLanguage.style.textDecoration = "none";
                        togLanguage.style.fontWeight = "bold";
                    } else {
                        togLanguage.style.color = "black";
                        togLanguage.style.textDecoration = "none";
                    }
                });


            } //constructor   

        }); //end declare

        o.initialize = function(appType, langType) {
            if (null == o._instance) {
                o._instance = new o(appType, langType);
            }
            return o._instance;
        };


        return o;

    }); //end define