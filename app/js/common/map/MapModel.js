define(
    ["declare","ko","mapconfig","dom","topic","array"], //"color","mainmodel"
    function(declare,ko,Config,dom,topic,arrayUtil){//Color,MainModel
    var o = declare(null, {

      
      constructor: function(){//domID,response
        
    	var mapconfig = Config.getConfig();
        
        o._vm = {};

        require(["mapevents"],
          function(Events){
            
            var mapevents = Events.getEvents();

            o._vm.deployments=ko.observableArray([]);//deployments.rows)     
            o._vm.onClickDeployment = function(deploymentGraphic,evt,deployment_id){     
           
          };
            
            o._vm.mapPoint=ko.observable();           
            o._vm.currentActiveLayer=ko.observable();
            o._vm.layersDrawingOption=ko.observable([]);
            
        });
      }
    });

    //UPDATE VIEW MODEL
    o._update = function(domID,response){
        require(["ko","dom"],function(ko,dom){            
            var deployments = model.deployments().concat(response.getDeployments);
            var id = domID;
            var model = ko.dataFor(dom.byId(id));
            model.deployments(deployments.rows);    
        });
      };

    o.getVM = function () {      
      return o._vm;
    };

    o.initialize = function (domID,response) {
      if (null == o._instance){
        o._instance = new o(domID,response);
      }  else {
        return o._instance;
      }       
    };

    
    return o;
});