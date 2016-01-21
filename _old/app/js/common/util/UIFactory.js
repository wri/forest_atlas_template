define(
  ["declare",
  "construct",
  "attr",
  "dom",
  "array",
  "on",
  "aspect",
  "connect",
  "topic",
  "checkbox",
  "button",
  "textbox",
  "numbertextbox",
  "datetextbox",
  "combobox",
  "hslider",
  "togglebutton",
  "radio",
  "filteringselect",
  "memory",
  "tabcontainer",
  "contentpane",
  "dialog",
  "registry",
  "accordionContainer"], function(declare,domConstruct,domAttr,dom,arrayUtil,on,aspect,connect,topic,
    CheckBoxWidget,
    ButtonWidget,
    TextBoxWidget,NumberTextBoxWidget,DateTextBoxWidget,ComboBoxWidget,HSliderWidget,ToggleButtonWidget,RadioButtonWidget,FilteringSelectWidget,
    Memory,TabContainerLayout,ContentPane,Dialog,registry, AccordionContainer){

     var o =  declare(null, {

      create: function(obj,response){

      //  require(["checkbox"],function(CheckBox){
            var obj = obj;
            var type = obj.type;
            var place = obj.place;
            var props = obj.props;
            var attrs = obj.attrs;
            // var id =props.id;
            var nodeId = obj.nodeId;
            var containerNode = obj.containerNode;
            var widgetid = obj.widgetid;
            var containerProps = obj.containerProps || {};

            // var noChild = ["radio"];

            // if (arrayUtil.indexOf(noChild,type)<0){
              
            // }
             var targetDiv = domConstruct.create("div",containerProps,nodeId || containerNode);  
            // var targetDiv = domConstruct.create("div",containerProps);
            // if (place){
            //   domConstruct.place(targetDiv,nodeId,place);
            // } else {
            //   domConstruct.place(targetDiv,nodeId,"first");
            // }
          


            var label = obj.label;
            var store = obj.store;
            var events = obj.events;            
            var aspects = obj.aspects;            
            var containerId = obj.containerId;

            var newUI;

            switch(type) {

              case "button":
                //require("button",function(ButtonWidget){
                  newUI = new ButtonWidget(props, targetDiv);                
                //})                
              break;

              case "checkbox":              
                //require("checkbox",function(CheckBoxWidget){   

                  newUI = new CheckBoxWidget(props, targetDiv);                
                //})   
                //newUI = new CheckBoxWidget(props, targetDiv);                
              break;

              case "textbox":
               // require("textbox",function(ButtonWidget){
                  newUI = new TextBoxWidget(props, targetDiv);                
               // })   
                //newUI = new TextBoxWidget(props, targetDiv);
              break;  

              case "numbertextbox":
               // require("textbox",function(ButtonWidget){                  
                  newUI = new NumberTextBoxWidget(props, targetDiv);
                // })   
                //newUI = new TextBoxWidget(props, targetDiv);
              break; 


              case "datetextbox":
               // require("textbox",function(ButtonWidget){                  
                  newUI = new DateTextBoxWidget(props, targetDiv);
                // })   
                //newUI = new TextBoxWidget(props, targetDiv);
              break; 

              case "link":                           
                newUI = domConstruct.create("a", props, targetDiv);
              break;

              case "combobox":              
                newUI = new ComboBoxWidget(props, targetDiv);
              break;

              case "filteringselect":               
                newUI = new FilteringSelectWidget(props, targetDiv);
              break;

              case "togglebutton":
                newUI = new ToggleButtonWidget(props, targetDiv);
              break;

              case "tabcontainer":
                newUI = new TabContainerLayout(props, targetDiv);
                newUI.startup();
              break;

              case "accordion":
                newUI = new AccordionContainer(props, targetDiv);
                newUI.startup();
              break;

              case "contentpane":
                newUI = new ContentPane(props, targetDiv);
                registry.byId(widgetid).addChild(newUI);
                //newUI.startup();
                registry.byId(widgetid).resize();
              break;

              case "dialog":
                newUI = new Dialog(props);                
              break;


              case "radio":
                //var targetInput = domConstruct.create("input",props,nodeId);
                newUI = new RadioButtonWidget(props, targetDiv);
                
              break;

              case "hslider":
                newUI = new HSliderWidget(props, targetDiv);                
              break;

              case "div":
                newUI = domConstruct.create("div",props,nodeId);                
              break;

              case "span":
                newUI = domConstruct.create("span",props,nodeId);                
              break;

              case "img":
                newUI = domConstruct.create("img",props,targetDiv);               
              break;


            }

            // if (store) {
            //   //console.log(response[store]);
            //   var memory = new Memory({ data: response[store] });
            //   newUI.store = memory;
            //    //var data = domConstruct.create("label",label,containerId,label.place);
            //      }//end if store
           
            if (label) {

               var label = domConstruct.create("label",label,nodeId || containerNode);               
              // domConstruct.create("div",label,targetDiv);
              //domConstruct.create("label",{for:"languageEnglishRadio",innerHTML:"fdsfds"},"languageEnglish");
                 }//end if label

           if (events) {              
              arrayUtil.forEach(events,function(item){                
              var data = item.data;
              // if (data){
              //   alert(data.layerId);
              // }
              switch (item.type) {
                case "on":
                  var thisEvent = on(newUI,item.name,function(){                
                  topic.publish(item.topic,arguments,obj,data);
                    if (item.runonce) {
                      thisEvent.remove();
                    }
                  })
                break;

                case "connect":
                console.log(item.type);
                  var thisEvent = connect.connect(newUI,item.name,function(){                    
                  topic.publish(item.topic,arguments,obj,data);
                    if (item.runonce) {
                      thisEvent.remove();
                    }
                  })
                break;
              }//end switch
             })//end arrayUtil
           }//end if events

           if (aspects) {              
              arrayUtil.forEach(aspects,function(item){ 
                aspect.after(registry.byId(props.id),item.type,function(){
                     topic.publish(item.topic,arguments,obj);
                })                                         
             })//end arrayUtil
           }//end if aspects


           if (attrs) {
            arrayUtil.forEach(attrs,function(attrItem){
               domAttr.set(attrItem.id,attrItem.attr,attrItem.value);
            })
              // for (var attrName in attr) {
              //   domAttr.set(newUI,attrName,attr[attrName]);
              // }
              //domConstruct.create("label",{for:"languageEnglishRadio",innerHTML:"fdsfds"},"languageEnglish");
                 }//end if label

       // })



      }

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