define(
  ["declare",
  "on",
  "topic",
  "keys",
  "mainmodel",
  "mainevents",  
  "class",
  "win"

  ], function(declare,on,topic,keys,MainModel,MainEvents,domClass,win){

     var o =  declare(null, {

      constructor: function(){
          var mainmodel = MainModel.getVM();

          var mainevents = MainEvents.getEvents();
          

         

          on(win.body(), "keyup", function(evt){
            evt.stopPropagation();
            var charOrCode = evt.charCode || evt.keyCode;
            //console.log("keyup " + charOrCode);
            switch(charOrCode){
                  case keys.ENTER:     
                      if (mainmodel.currentView()==="login"){                       
                         topic.publish(mainevents.clickLogin);
                      }    
                      if (mainmodel.currentView()==="deployment"){ 
                        require(["deploymentmodel"],function(DeploymentModel){
                          var deploymentmodel = DeploymentModel.getVM();
                          var obj = deploymentmodel.sequences()[deploymentmodel.currentDeploymentActivePos()];
                          deploymentmodel.clickImage(obj);                          
                        })  
                      }   
                      if (mainmodel.currentView()==="species"){ 
                        require(["speciesmodel"],function(SpeciesModel){
                          var speciesmodel = SpeciesModel.getVM();
                          var obj = speciesmodel.sequences()[speciesmodel.currentSpeciesActivePos()];
                          speciesmodel.clickImage(obj);                          
                        })  
                      }                
                  break;

                  case keys.ESCAPE:                       
                      
                      if (mainmodel.currentView()==="sequenceDeployment"){ 
                      
                        var isFullScreenMode = domClass.contains("fullScreenToggle","fullScreenMode");
                        
                        if  (isFullScreenMode) {
                          topic.publish(mainevents.toggleFullScreen);
                        } 
                         
                         
                      }                      
                  break;

                  case keys.RIGHT_ARROW: 
                      if (mainmodel.currentView()==="deployment"){ 
                        require(["deploymentevents"],function(DeploymentEvents){
                          var deploymentevents = DeploymentEvents.getEvents();
                          topic.publish(deploymentevents.activeNext);
                        })                         
                      }
                      if (mainmodel.currentView()==="species"){ 
                        require(["speciesevents"],function(SpeciesEvents){
                          var speciesevents = SpeciesEvents.getEvents();
                          topic.publish(speciesevents.activeNext);
                        })                         
                      }
                  break;

                  case keys.LEFT_ARROW: 
                      if (mainmodel.currentView()==="deployment"){ 
                         require(["deploymentevents"],function(DeploymentEvents){
                            var deploymentevents = DeploymentEvents.getEvents();
                            topic.publish(deploymentevents.activePrev);
                         })
                      }
                      if (mainmodel.currentView()==="species"){ 
                         require(["speciesevents"],function(SpeciesEvents){
                            var speciesevents = SpeciesEvents.getEvents();
                            topic.publish(speciesevents.activePrev);
                         })
                      }
                  break;
                }
           
          });
       }//constructor

    });


    o.initialize = function () {
    if (null == o._instance){
      o._instance = new o();
    }      
        return o._instance;
    };

     o.destroy = function () {
      delete o._instance;
    }
    
    return o;



});//end define