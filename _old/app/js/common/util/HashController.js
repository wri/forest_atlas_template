define(
    ["declare",
        "hash",
        "topic",
        "connect",
        "registry",
        "ioquery",
        "mainmodel",
        "array"
    ], function(declare, hash, connect, topic, registry, ioQuery, MainModel, arrayUtil) {

        var o = declare(null, {

            constructor: function(initialize) {
                //console.log("init hash");

                topic.subscribe("/dojo/hashchange", function(changedHash) {
                    // Handle the hash change publish
                    var init = initialize;
                    var obj = ioQuery.queryToObject(changedHash);
                    var appType = obj.v;
                    var langType = obj.l;

                    if (init) { //Dynamically Load app Libaries
                        
                        require({
                            aliases: [
                                ["resources", "atlas/Resources"],
                                //tools
                                ["toolsconfig", "atlas/tools/ToolsConfig"],
                                ["toolsevents", "atlas/tools/ToolsEvents"],
                                ["toolsui", "atlas/tools/ToolsUI"],
                                ["toolsmodel", "atlas/tools/ToolsModel"],
                                ["toolscontroller", "atlas/tools/ToolsController"]
                            ]
                        });





                        //load common main
                        require(["mainconfig", "mainevents", "mainui"], function(mainconfig, mainevents, mainui) {
                            mainconfig.initialize(); //Must not have any dependencies
                            mainevents.initialize(); //no dependencies, Initializes maincontroller    
                            mainui.initialize(appType, langType); //config and events must be initialized
                        });

                        //load common map
                        require(["mapconfig", "mapevents", "mapui"], function(mapconfig, mapevents, mapui) {
                            mapconfig.initialize(); //Must not have any dependencies
                            mapevents.initialize(); //no dependencies, Initializes maincontroller   
                            mapui.initialize(); //config and events must be initialized
                            // The lat, lon, and zoom is set in the mapui constructor
                        });

                        return;
                    }

                });
            }

        });


        o.initialize = function(init) {
            if (!o._instance) {
                o._instance = new o(init);
            }
            return o._instance;
        };


        return o;



    }); //end define