define(
    ["declare",
    "mapcontroller",
    "topic"], function(declare,MapController,topic){
    var o =  declare(null, {

      constructor:function(){
        
        var that = this;

        o._events = {
          mapclick:"mapclick", 
          zoomToDefault:"zoomToDefault",
          clickLayerLegend:"clickLayerLegend",
          UICreationComplete:"MapUICreationComplete",
          clickCoordinates:"clickCoordinates",
          layerAdded:"layerAdded",
          updateCustomInfoWindow: "updateCustomInfoWindow",
          updateAnalysisTab: "updateAnalysisTab",
          popupTabChanged: "popupTabChanged",
          updateLandsatLayer: 'updateLandsatLayer',
          updateTCDRenderingRule: 'updateTCDRenderingRule'
        };

        var controller = new MapController();
                 
        // LoginUI Events
        o.mapclick = topic.subscribe(o._events.mapclick,function() {
          that.debug("Map >>> mapclick");
          controller.mapclick();
        });  

        o.zoomToDefault = topic.subscribe(o._events.zoomToDefault,function() {
          that.debug("Map >>> zoomToDefault");
          controller.zoomToDefault();
        }); 
        

        o.UICreationComplete = topic.subscribe(o._events.UICreationComplete,function() {
          that.debug("Map >>> UICreationComplete");
          controller.UICreationComplete();
        });  
        
        o.clickCoordinates = topic.subscribe(o._events.clickCoordinates,function(evt){
        	that.debug("Map >>> clickCoordinates");
        	controller.clickCoordinates(evt);
        });

        o.updateCustomInfoWindow = topic.subscribe(o._events.updateCustomInfoWindow, function () {
          that.debug("Map >>> updateCustomInfoWindow");
          controller.updateCustomInfoWindow();
        });

        o.layerAdded = topic.subscribe(o._events.layerAdded,function(evt){
          that.debug("Map >>> layerAdded");
          controller.layerAdded(evt);
        });

        o.updateAnalysisTab = topic.subscribe(o._events.updateAnalysisTab, function () {
          that.debug("Map >>> updateAnalysisTab");
          controller.updateAnalysisTab();
        });

        o.popupTabChanged = topic.subscribe(o._events.popupTabChanged, function () {
          that.debug("Map >>> popupTabChanged");
          controller.popupTabChanged();
        });

        o.updateLandsatLayer = topic.subscribe(o._events.updateLandsatLayer, function () {
          that.debug("Map >>> updateLandsatLayer");
          controller.updateLandsatLayer();
        });

        o.updateTCDRenderingRule = topic.subscribe(o._events.updateTCDRenderingRule, function () {
          that.debug("Map >>> updateTCDRenderingRule");
          controller.updateTCDRenderingRule();
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
    }        
        return o._instance;
    };

     o.destroy = function () {
          o._apiResponseHandler.remove();          
          o._zoomToDeployments.remove();
          o._apiRefresh.remove();
          o._filterMapByStatus.remove();
          o._filterMapBySearch.remove();
          o._clickDeployment.remove();
          o._mouseOverDeployment.remove();
          o._mouseOutDeployment.remove();
          o._clickPreviousDeploymentList.remove();
          o._clickNextDeploymentList.remove();
          o._selectDeployment.remove();
          o._showStatusReason.remove();
      delete o._instance;
    };

    return o;
    
});//end define