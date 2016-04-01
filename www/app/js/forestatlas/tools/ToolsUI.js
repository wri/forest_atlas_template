define(["declare","topic","on","all","construct","query","esriquery","featureLayer","deferred","aspect","array","registry","uifactory","toolsconfig","toolsevents","toolsmodel","mapconfig","infotemplate","dom","ready","attr","class","string","mapui","mainmodel","basemap","graphic","arcgisutil","legend","dialog","tooltipdialog","popup","printtemplate","hslider","scalebar","style","contentpane","checkbox","memory","combobox","print","legendlayer","esrirequest","tiledmap","ko","connect"],function(e,a,t,i,n,r,l,s,o,c,d,p,y,u,f,g,v,m,h,b,L,C,x,I,T,w,D,P,k,_,E,A,B,M,G,O,F,U,j,z,V,H,q,N,W,K){var R=e(null,{constructor:function(){function e(e){e.layers=d.filter(e.layers,function(e,a){if("activeFires"===e.id&&!app.config.activeFiresIncluded||"landCover"===e.id&&!app.config.landCoverIncluded||"carbonLayer"===e.id&&!app.config.biomassIncluded||"intactForestLayer"===e.id&&!app.config.iflIncluded){switch(e.id){case"activeFires":r(".fireAnalysis").forEach(function(e){n.destroy(e)});break;case"landCover":r(".landCoverAnalysis").forEach(function(e){n.destroy(e)}),r(".landCoverCompAnalysis").forEach(function(e){n.destroy(e)});break;case"carbonLayer":r(".biomassAnalysis").forEach(function(e){n.destroy(e)});break;case"intactForestLayer":r(".iflAnalysis").forEach(function(e){n.destroy(e)})}return!1}return!0}),d.forEach(e.layers,function(t,l){var s=n.create("div",{id:e.idPrefix+"container"+l,"class":"toggleContainer"},e.container),o=(n.create("div",{id:e.idPrefix+"checkBoxDiv"+l},s),n.create("div",{id:e.idPrefix+"sliderTitleDiv"+l,"class":"sliderTitleDiv"},s),n.create("div",{id:e.idPrefix+"sliderContainerDiv"+l,"class":"sliderContainer"},s)),c=(n.create("div",{id:e.idPrefix+"sliderDiv"+l},o),n.create("div",{id:e.idPrefix+"sliderText"+l,"class":"sliderText"},s));t.toolsContainerId&&n.create("div",{id:t.toolsContainerId,"class":"tools-container",innerHTML:t.toolContent,style:"display: none;"},s);n.create("div",{id:e.idPrefix+"hzline"+l,"class":"hzline"},s),new U({container:e.idPrefix+"container"+l,"class":"list_item",checked:!1,layerId:t.id,onClick:function(e){a.publish(i.toggleExtraLayers,this.checked,this.layerId,this.container)}},e.idPrefix+"checkBoxDiv"+l),new F({content:"<div data-bind='text:"+t.textBinding+" '></div>","class":"title"},e.idPrefix+"sliderTitleDiv"+l),new M({name:e.idPrefix+"slider"+l,value:app.config.defaultLayerTransparency,layerId:t.id,minimum:0,maximum:100,intermediateChanges:!1,onChange:function(e){a.publish(i.adjustLayerOpacity,this.layerId,e)}},e.idPrefix+"sliderDiv"+l);c.innerHTML="<div class='left'>+</div><span class='middle' data-bind='{text:transparency}'></span><div class='right'>-</div>";var d=r("#"+e.container+" .dijitCheckBox");d[l].style.backgroundImage="none",h.byId(e.idPrefix+"sliderContainerDiv"+l).style.display="none",h.byId(e.idPrefix+"sliderText"+l).style.display="none",h.byId(e.idPrefix+"sliderTitleDiv"+l).style.color="#cfcfcf"})}var i=f.getEvents(),l=u.getConfig(),s=T.getVM(),o=(v.getConfig(),"en"),c=I.getMap(),g=I.getWebMapResponse(),m=y.initialize();d.forEach(l.ui,function(e){m.create(e)}),c.on("click",function(e){h.byId("legislative")&&(h.byId("legislative").style.display="none")}),p.byId("accordionContainer").selectChild(p.byId("layersCP")),t(c.infoWindow,"selection-change",function(){a.publish(i.popupToggle,c.infoWindow.getSelectedFeature())});var b,x=P.getLegendLayers(g),o=(new G({scalebarUnit:"metric",attachTo:"bottom-left",map:c}),s.langType().toLowerCase()),D="",E=[],A=app.config.layersToHide;d.forEach(c.layerIds,function(e){if("landCover"!==e&&"activeFires"!==e&&"legendLayer"!==e&&"carbonLayer"!==e&&"intactForestLayer"!==e&&c.getLayer(e).supportsDynamicLayers===!0){E.push(e),layerIdlower=e.toLowerCase(),D=e;var a=[],t=c.getLayer(e).visibleLayers,i=c.getLayer(e);return d.forEach(t,function(e){var t=i.id+"_"+e;c.getLayer(t);-1===A.indexOf(e)&&a.push(e)}),c.getLayer(e).setVisibleLayers(a),layerIdlower.indexOf("_"+o)>-1}}),b=E;var O=[];O=c.getLayer(D).layerInfos;var H=c.getLayer(D).layerInfos.length,q=[],N=(n.create("div",{id:"allContainer","class":"allContainer"},"closeLayersButton","after"),n.create("a",{id:"selectAll","data-bind":"{text:selectAll}"},"allContainer")),W=n.create("a",{id:"clearAll","data-bind":"{text:clearAll}"},"allContainer");t(N,"click",function(){a.publish(i.selectAll)}),t(W,"click",function(){a.publish(i.clearAll)});for(var K=0;H>K;K++){q[K]=K;var S=c.getLayer(D).visibleLayers,J=!1;d.some(S,function(e){return K===e?J=!0:void 0});var Q=n.create("div",{id:"container"+K,"class":"toggleContainer"},"layersCP"),Y=(n.create("div",{id:"checkBoxDiv"+K},Q),n.create("div",{id:"sliderTitleDiv"+K},Q),n.create("div",{id:"sliderContainerDiv"+K,"class":"sliderContainer"},Q));n.create("div",{id:"sliderDiv"+K},Y),O[K].name,new U({name:"checkBox","class":"list_item",arrayLayerValue:K,value:"agreed",checked:J,onClick:function(e){var t=e.target.checked;a.publish(i.toggleMapLayer,E,t,this.arrayLayerValue)}},"checkBoxDiv"+K);d.some(c.layerIds,function(e){return layerIdlower=e.toLowerCase(),current=e,layerIdlower.indexOf("_"+s.currentLanguage())>-1});var X=c.getLayer(current).layerInfos[K].name,Z=(new F({content:X,"class":"title"},"sliderTitleDiv"+K),new M({name:"slider"+K,arrayLayerValue:K,value:app.config.defaultLayerTransparency,minimum:0,maximum:100,intermediateChanges:!1,onChange:function(e){a.publish(i.transparencyChange,b,e,this.arrayLayerValue)}},"sliderDiv"+K),n.create("div",{id:"sliderText"+K,"class":"sliderText"},Q));n.create("div",{id:"hzline"+K,"class":"hzline"},Q);if(Z.innerHTML="<div class='left'>+</div><span class='middle' data-bind='{text:transparency}'></span><div class='right'>-</div>",0==J){var $=r(".dijitCheckBox");$[K].style.backgroundImage="none",h.byId("sliderContainerDiv"+K).style.display="none",h.byId("sliderText"+K).style.display="none",h.byId("sliderTitleDiv"+K).style.color="#cfcfcf"}}if(e(l.forestLossLayers),e(l.forestCoverLayers),a.publish(i.transparencyChange,b,app.config.defaultLayerTransparency,q),app.config.excludeDocumentsTab){var ee=document.getElementById("popupDocumentTab"),ae=document.getElementById("popupDocument");ee&&ee.remove(),ae&&ae.remove()}print=new _({title:"Print",id:"print",content:"<div data-bind='html:printDialog' style='width:100%'></div>",style:"width: 300px"}),L.set(h.byId("print_title"),"data-bind","{text:print}");var te=r("#print .dijitDialogPaneContent");te[0].id="printContent";var ie={scalebarUnit:"Kilometers",titleText:"",customTextElements:[{subtitle:""}]},ne=[{name:"GNQ_Landscape",label:"Landscape (PDF)",format:"pdf",options:ie},{name:"MAP_ONLY",label:"Map Image (JPG)",format:"jpg",options:ie}];s.printLayouts(ne);var re=d.map(ne,function(e){var a=new B;return a.layout=e.name,a.label=e.label,a.format=e.format,a.layoutOptions=e.options,a}),le=new V({map:c,templates:re,url:app.config.printURL},h.byId("printContent"));le.startup(),le.on("print-start",function(){ga("A.send","event","Event","Print Map","User clicked the Print Map button on the map.")});n.create("div",{id:"laodingGif","class":"header"},"printContent");t(h.byId("print-button"),"click",function(){var e=app.config.country,a=app.config.appLanguages[s.currentLanguage()].title,t=app.config.appLanguages[s.currentLanguage()].flagTitle;d.forEach(le.templates,function(i){"pdf"==i.format&&(i.layout=e+"_"+i.layout.split("_")[1]),i.layoutOptions.titleText=a,i.layoutOptions.customTextElements[0].subtitle=t}),print.show()});var se=new j({data:[]});new z({id:"search",name:"state",store:se,searchAttr:"name",placeholder:" search...",onKeyUp:function(e){var t=e.target.value,n=e.keyCode;0!=t.length&&a.publish(i.search,t,D),"13"==n&&a.publish(i.searchPopup)},onChange:function(e){a.publish(i.searchPopup)}},"search").startup();t(h.byId("searchButton"),"click",function(){p.byId("search").get("value").length>0&&a.publish(i.searchPopup)});var oe;d.some(x,function(e){var a=e.title.toLowerCase();return oe=e,D.indexOf(a)>-1});var ce=n.create("div",{id:"legendDiv"},"legendCP");R._legend=new k({map:c,layerInfos:[{layer:oe.layer,title:""}],autoUpdate:!0},"legendDiv"),R._legend.startup();var de=r(".dijitTitlePaneTextNode");L.set(de[0],"data-bind","text:tabLegendTitle");l.defaultLayerOpacity;d.forEach(x,function(e){var a=e.layer.id;c.getLayer(a);C.add(ce,"legendDivItem")}),R._basemapGallery=new w({id:"basemapGallery",showArcGISBasemaps:!0,map:c},"basemap-gallery"),R._basemapGallery.startup(),t(R._basemapGallery,"error",function(e){console.log(e)}),t(R._basemapGallery,"load",function(){r(".esriBasemapGalleryLabelContainer span").forEach(function(e,a,t){var i=e.title.toLowerCase();i=i.replace(/ +/g,"_"),e.setAttribute("data-bind","{html:basemapTitles()."+i+"}"),e.innerHTML=""})}),a.publish(i.UIcreationComplete)}});return R.initialize=function(){return null==R._instance&&(R._instance=new R),R._instance},R.getBasemap=function(){return R._basemapGallery},R});