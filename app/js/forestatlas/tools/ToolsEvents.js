define(
    ["declare",
    "toolscontroller",
    "topic"], function(declare,toolscontroller,topic){
    var o =  declare(null, {

      constructor:function(){        
        var that = this;

        o._events = {
          UIcreationComplete:"ToolsUIcreationComplete",          
          changeLayerVisibility:"changeLayerVisibility",
          clickLayerVisibility:"clickLayerVisibility",
          clickLayerLegend:"clickLayerLegend",
          showMoreOptions:"showMoreOptions",
          toggleMapLayer:"toggleMapLayer",
          toggleExtraLayers: "toggleExtraLayers",
          transparencyChange:"transparencyChange",
          updateGeometry:"updateGeometry",
          addGeometry:"addGeometry",
          highlighGraphic:"highlighGraphic",
          clearHighlight:"clearHighlight",
          popupToggle:"popupToggle",
          showLoading:"showLoading",
          hideLoading:"hideLoading",
          search:"search",
          searchPopup:"searchPopup",
          showError:"showError",
          sendAdminEmail:"sendAdminEmail",
          selectAll:"selectAll",
          clearAll:"clearAll",
          mapUpdateEnd:"mapUpdateEnd",
          mapZoomEnd:"mapZoomEnd",
          printReport:"printReport",
          adjustLayerOpacity: "adjustLayerOpacity"
        };

        var controller = new toolscontroller();
                
        // LoginUI Events
        var UIcreationComplete = topic.subscribe(o._events.UIcreationComplete,function(results) {         
          that.debug("Tools >>> UIcreationComplete");
          controller.UIcreationComplete(results);
        });   


        var changeLayerVisibility = topic.subscribe(o._events.changeLayerVisibility,function(args,obj) {         
          that.debug("Tools >>> changeLayerVisibility");
          controller.changeLayerVisibility(args,obj);
        }); 

        var clickLayerVisibility = topic.subscribe(o._events.clickLayerVisibility,function(args,obj) {         
          that.debug("Tools >>> clickLayerVisibility");
          controller.clickLayerVisibility(args,obj);
        });             

        var clickLayerLegend = topic.subscribe(o._events.clickLayerLegend,function(args,obj) {         
          that.debug("Tools >>> clickLayerLegend");
          controller.clickLayerLegend(args,obj);
        });         

        var showMoreOptions = topic.subscribe(o._events.showMoreOptions,function(layerId) {         
          that.debug("Tools >>> showMoreOptions");
          controller.showMoreOptions(layerId);
        });
        
        var toggleMapLayer = topic.subscribe(o._events.toggleMapLayer,function(mapLanguageLayerIds,checkBoxChecked,arrayLayerValue) { 
            that.debug("Tools >>> toggleMapLayer");
            controller.toggleMapLayer(mapLanguageLayerIds,checkBoxChecked,arrayLayerValue);
          });

        var toggleExtraLayers = topic.subscribe(o._events.toggleExtraLayers, function (checked, layerId, container) {
          that.debug("Tools >>> toggleExtraLayers");
          controller.toggleExtraLayers(checked, layerId, container);
        });

        var adjustLayerOpacity = topic.subscribe(o._events.adjustLayerOpacity, function (layerId, opacity) {
          that.debug("Tools >>> adjustLayerOpacity");
          controller.adjustLayerOpacity(layerId, opacity);
        });

        var transparencyChange = topic.subscribe(o._events.transparencyChange,function(mapLanguageLayerIds,sliderValue,arrayLayerValue) {         
          that.debug("Tools >>> transparencyChange");
          controller.transparencyChange(mapLanguageLayerIds,sliderValue,arrayLayerValue);
        });  

        var updateGeometry = topic.subscribe(o._events.updateGeometry,function(args,obj,data) {         
          that.debug("Tools >>> updateGeometry");
          controller.updateGeometry(args,obj,data);
        });

         var addGeometry = topic.subscribe(o._events.addGeometry,function(geometry) {         
          that.debug("Tools >>> addGeometry");
          controller.addGeometry(geometry);
        });

        var highlighGraphic = topic.subscribe(o._events.highlighGraphic,function(geometry) {         
          that.debug("Tools >>> highlighGraphic");
          controller.highlighGraphic(geometry);
        });  

        var clearHighlight = topic.subscribe(o._events.clearHighlight,function() {         
          that.debug("Tools >>> clearHighlight");
          controller.clearHighlight();
        });  
        
        var popupToggle = topic.subscribe(o._events.popupToggle, function(count){
        	that.debug("Tools >>> popupToggle");
        	controller.popupToggle(count);
        });

         var showLoading = topic.subscribe(o._events.showLoading,function() {         
          that.debug("Tools >>> showLoading");
          controller.showLoading();
        }); 

          var hideLoading = topic.subscribe(o._events.hideLoading,function() {         
          that.debug("Tools >>> hideLoading");
          controller.hideLoading();
        }); 
          var search = topic.subscribe(o._events.search,function(inputValue,currentLayerId) {         
              that.debug("Tools >>> search");
              controller.search(inputValue,currentLayerId);
            });
          var searchPopup = topic.subscribe(o._events.searchPopup,function() {         
              that.debug("Tools >>> search popup");
              controller.searchPopup();
            });
          
        var showError = topic.subscribe(o._events.showError,function() {         
          that.debug("Tools >>> showError");
          controller.showError();
        }); 
             var sendAdminEmail = topic.subscribe(o._events.sendAdminEmail,function() {         
          that.debug("Tools >>> sendAdminEmail");
          controller.sendAdminEmail();
        }); 
        
        var selectAll = topic.subscribe(o._events.selectAll,function() {         
            that.debug("Tools >>> showError");
            controller.selectAll();
        }); 
                    
        var clearAll = topic.subscribe(o._events.clearAll,function() {         
            that.debug("Tools >>> clearAll");
            controller.clearAll();
        }); 

        var mapUpdateEnd = topic.subscribe(o._events.mapUpdateEnd,function(e) {         
            that.debug("Tools >>> mapUpdateEnd");
            controller.mapUpdateEnd(e);
        }); 

        var mapZoomEnd = topic.subscribe(o._events.mapZoomEnd,function(e) {         
            that.debug("Tools >>> mapZoomEnd");
            controller.mapZoomEnd(e);
        }); 
        
         var printReport = topic.subscribe(o._events.printReport,function(obj,evt) {         
            that.debug("Tools >>> printReport");
            controller.printReport(obj,evt);
        });

                  
      }, // End Constructor

      debug: function(message) {

        if (typeof message == 'string')
          {console.log(message);} 
              else 
          {console.dir(message);}      

      }

    });//end declare

    o.getEvents = function () {      
      return o._events;
    };

    o.initialize = function () {
    if (null == o._instance){
        o._instance = new o();
       // console.log(o._instance);
    }        
        return o._instance;
    };



    return o;
    
});//end define