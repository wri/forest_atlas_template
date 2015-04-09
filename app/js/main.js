define(
    ["declare",
        //"xparser",
        "mparser",
        "mainevents",
        "mainconfig",
        "mainui",
        "hashcontroller",
        "hash",
        "ioquery",
        "dijit/form/TextBox", //Call layout Widgets here
        "dijit/form/Button",
        "dijit/form/CheckBox",
        "dijit/layout/StackContainer",
        "dijit/layout/ContentPane",
        "dijit/layout/BorderContainer",
        "dijit/TitlePane",
        "dijit/form/SimpleTextarea",
        "dijit/Dialog",

        "dojo/domReady!"
    ], function(declare, mparser, mainevents, mainconfig, mainui, hashcontroller, hash, ioQuery) {

        return declare(null, {

            constructor: function(lang) {

                mparser.parse();
                //Hash Controller init
                //hash("v=login");
                hashcontroller.initialize(true);

                var url = window.location.href;
                var initHash = "v=atlas&l=" + lang;

                var urlArr = url.split("#");
                var query;

                if (urlArr.length == 2) {
                    var obj = ioQuery.queryToObject(urlArr[1]);
                    //remove init=y	
                    lang = obj.l;
                    if (obj.init) {
                        delete obj.init;
                        query = ioQuery.objectToQuery(obj);
                        initHash = query; //Go to User hash, 		
                    } else {
                        query = ioQuery.objectToQuery(obj);
                        initHash = query + "&init=y";
                    }

                }

                hash(initHash); //Go to default hash		

            }

        }); //end declare

    }); //end define