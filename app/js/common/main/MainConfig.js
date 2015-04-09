define(
    ["declare", "res/Resources"], function(declare, resource) {

        console.log(app);

        var o = declare(null, {

            constructor: function() {

                o._config = {

                    contactUsURL: "http://emammal.si.edu/user/password",


                    browserChecklist: [{
                        id: "ie",
                        version: "Internet Explorer",
                        min: 9
                    }, {
                        id: "ff",
                        version: "Firefox",
                        min: 0
                    }, {
                        id: "chrome",
                        version: "Chrome",
                        min: 0
                    }],
                    browserCompatabilityMsg: "Your Browser is not supported",
                    title: "Suitability Mapper",
                    subtitle: "Find sites for sustainable palm oil in Indonesia",

                    ui: [{
                        nodeId: "headerView",
                        type: "div",
                        props: {
                            id: "mainTitle"
                        },
                        attrs: [{
                            id: "mainTitle",
                            attr: "data-bind",
                            value: "{text:title}"
                        }]
                    },{
                        nodeId: "mainBorderContainer",
                        type: "link",
                        containerProps: {
                            id: "mobileFlagContainer"
                        },
                        props: {
                            href: resource.flagLinkPath,
                            id: "mobileFlagContainerLink",
                            target: "_blank"
                        }
                    },{
                        nodeId: "mobileFlagContainerLink",
                        type: "img",
                        containerProps: {
                            id: "mobileCountryFlag"
                        },
                        props: {
                            src: resource.flagPath,
                            id: "mobileCountryFlag"
                        }
                    },{
                        nodeId: "headerView",
                        type: "link",
                        containerProps: {
                            id: "countryFlagContainer"
                        },
                        props: {
                            href: resource.flagLinkPath,
                            id: "countryFlagLink",
                            target: "_blank"
                        }
                    }, {
                        nodeId: "countryFlagLink",
                        type: "img",
                        containerProps: {
                            id: "countryFlag"
                        },
                        props: {
                            src: resource.flagPath,
                            id: "countryFlag"
                        }
                    }, {
                        nodeId: "headerView",
                        type: "link",
                        props: {
                            id: "flagTitle",
                            target: "_blank",
                            href: resource.flagLinkPath,
                            style: "width:" + resource.countryTextWidth + "!important;"
                        },
                        attrs: [{
                            attr: "data-bind",
                            value: "{text:flagTitle}",
                            id: "flagTitle"
                        }]
                    }]
                };
            }
        });

        o.getConfig = function() {
            return o._config;
        };

        o.initialize = function() {
            if (null == o._instance) {
                o._instance = new o();
            }
            return o._instance;
        };

        o.destroy = function() {
            delete o._instance;
        };


        return o;



    }); //end define