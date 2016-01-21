define(
    ["declare",
    "maincontroller",
    "topic"], function(declare,MainController,topic){
    var o =  declare(null, {

    	constructor:function(){
    		
    	var that = this;

        o._events = {
          	UIcreationComplete:"MainUIcreationComplete",
            changeLanguage:"changeLanguage"
        };

        var controller = new MainController();

                
        // LoginUI Events
        var UIcreationComplete = topic.subscribe(o._events.UIcreationComplete,function(appType,langType) {
        	that.debug("Main >>> UIcreationComplete");
	       	controller.UIcreationComplete(appType,langType);
        });     

        var changeLanguage = topic.subscribe(o._events.changeLanguage,function(value) {
            that.debug("Main >>> changeLanguage");
            controller.changeLanguage(value);
         
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

    return o;
    
});//end define