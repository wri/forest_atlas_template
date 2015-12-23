define(["declare","mainmodel","ko","dom","topic","toolsconfig","memory","number","array","root/languages","query","attr","toolsevents"],function(e,a,o,s,r,t,l,b,n,v,i,m,u){var p=e(null,{constructor:function(e,s){t.getConfig();p._vm={},p._dataModel={},require(["toolsevents"],function(e){var s=a.getVM(),t=s.currentLanguage(),l=app.config.appLanguages[t].title,b=app.config.appLanguages[t].flagTitle,n=v[t],i=e.getEvents();p._vm.tabBasemapTitle=o.observable(n.tabBasemapTitle),p._vm.tabLegendTitle=o.observable(n.tabLegendTitle),p._vm.tabLayersTitle=o.observable(n.tabLayersTitle),p._vm.buttonLayersText=o.observable(n.buttonLayersText),p._vm.closeButtonText=o.observable(n.closeButtonText),p._vm.title=o.observable(l),p._vm.flagTitle=o.observable(b),p._vm.printDialog=o.observable(n.printDialog),p._vm.layersDrawingOption=o.observable([]),p._vm.about=o.observable(n.about),p._vm.downloadData=o.observable(n.downloadData),p._vm.sources=o.observable(n.sources),p._vm.print=o.observable(n.print),p._vm.legislativeText=o.observable(n.legislativeText),p._vm.printReport=o.observable(n.printReport),p._vm.clickPrintReport=function(e,a){r.publish(i.printReport,e,a)},p._vm.zoom=o.observable(n.zoom),p._vm.selectAll=o.observable(n.selectAll),p._vm.clearAll=o.observable(n.clearAll),p._vm.transparency=o.observable(n.transparency),p._vm.basemapTitles=o.observable(n.basemapTitles),p._vm.editingEnabled=o.observable(!1),p._vm.editingFeatureEnabled=o.observable(!1),p._vm.addFeatureEnabled=o.observable(!1),p._vm.currentLayerId=o.observable(""),p._vm.currentEditableGraphic=o.observable({}),p._vm.originalEditableGraphic=o.observable({}),p._vm.aboutLink=o.observable(app.config.aboutLinkUrl),p._vm.downloadLink=o.observable(app.config.downloadDataUrl),p._vm.mapThemes=o.observableArray("en"===t?app.config.mapThemes:app.config.mapThemesAlternate),p._vm.showMapThemes=o.observable(!1),p._vm.mapThemesLabel=o.observable(n.mapThemesLabel),p._vm.basemapGalleryVisible=o.observable(!1),p._vm.analyzeToolsVisible=o.observable(!1),p._vm.shareToolsVisible=o.observable(!1),p._vm.showUploadTools=o.observable(!1),p._vm.forestLossYears=o.observableArray(["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"]),p._vm.clearanceAlertBounds=o.observable(),p._vm.clearanceAlertLabels=o.observable(),p._vm.popupDataTab=o.observable(n.popupDataTab),p._vm.popupAnalysisTab=o.observable(n.popupAnalysisTab),p._vm.popupDocumentTab=o.observable(n.popupDocumentTab),p._vm.popupActiveTab=o.observable("popupDataTab"),p._vm.popupIndex=o.observable(0),p._vm.popupCount=o.observable(0),p._vm.analysisLoss=o.observable(n.analysisLoss),p._vm.analysisLC=o.observable(n.analysisLC),p._vm.analysisGain=o.observable(n.analysisGain),p._vm.analysisIFL=o.observable(n.analysisIFL),p._vm.analysisCS=o.observable(n.analysisCS),p._vm.analysisFire=o.observable(n.analysisFire),p._vm.analysisLCComposition=o.observable(n.analysisLCComposition),p._vm.analysisOptions=o.observableArray(n.analysisOptions),p._vm.firesOneWeek=o.observable(n.firesOneWeek),p._vm.fires72Hours=o.observable(n.fires72Hours),p._vm.fires48Hours=o.observable(n.fires48Hours),p._vm.fires24Hours=o.observable(n.fires24Hours),p._vm.lossStartingYear=o.observable(n.lossStartingYear),p._vm.lossEndingYear=o.observable(n.lossEndingYear),p._vm.accordionForestCoverTitle=o.observable(n.accordionForestCoverTitle),p._vm.accordionForestLossTitle=o.observable(n.accordionForestLossTitle),p._vm.accordionLandUseTitle=o.observable(n.accordionLandUseTitle),p._vm.treeCoverAnalysis=o.observable(n.treeCoverAnalysis),p._vm.otherAnalysisTypes=o.observable(n.otherAnalysisTypes),p._vm.forestCoverLossLabel=o.observable(n.forestCoverLossLabel),p._vm.activeFiresLabel=o.observable(n.activeFiresLabel),p._vm.treeCoverDensityLabel=o.observable(n.treeCoverDensityLabel),p._vm.landCoverLabel=o.observable(n.landCoverLabel),p._vm.treeCoverGainLabel=o.observable(n.treeCoverGainLabel),p._vm.carbonLayerLabel=o.observable(n.carbonLayerLabel),p._vm.intactForestLayerLabel=o.observable(n.intactForestLayerLabel),p._vm.uploadInstructions=o.observableArray(n.uploadInstructions),p._vm.drawButtonText=o.observable(n.drawButtonText),p._vm.uploadButtonText=o.observable(n.uploadButtonText),p._vm.currentAnalysisType=o.observable(n.analysisLoss),p._vm.clearAllFeatures=o.observable(n.clearAllFeatures),p._vm.deleteCustomFeature=o.observable(n.deleteCustomFeature),p._vm.landsatTextLabel=o.observable(n.landsatTextLabel),p._vm.tcdSelectorBegin=o.observable(n.tcdSelectorBegin),p._vm.tcdSelectorEnd=o.observable(n.tcdSelectorEnd),p._vm.treeCoverSliderLabel=o.observable(n.treeCoverSliderLabel),p._vm.tcdSelectorValue=o.observable(30),p._vm.landsatOptions=o.observableArray([2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2e3]),p._vm.selectedLandsatYear=o.observable(2013),p._vm.customFeatureShowing=o.observable(!1),p._vm.featureDocuments=o.observableArray([]),p._vm.documentsUnavailable=o.observable(n.documentsUnavailable),p._vm.documentType=o.observable(n.documentType),p._vm.documentAuthor=o.observable(n.documentAuthor),p._vm.documentDate=o.observable(n.documentDate),p._vm.documentLink=o.observable(n.documentLink),p._vm.changePopupTabs=function(e,a){var o=a.target?a.target:a.srcElement;e.popupActiveTab(o.id),"popupAnalysisTab"===o.id?r.publish("updateAnalysisTab"):"popupDocumentTab"===o.id&&r.publish("updateDocumentsTab"),r.publish("popupTabChanged")},p._vm.prevFeature=function(e,a){require(["mapui"],function(e){var a=e.getMap();a.infoWindow.selectPrevious(),r.publish("updateCustomInfoWindow")})},p._vm.nextFeature=function(e,a){require(["mapui"],function(e){var a=e.getMap();a.infoWindow.selectNext(),r.publish("updateCustomInfoWindow")})},p._vm.selectAnalysisType=function(e,a){require(["mapui","atlas/tools/Results","esri/tasks/query","esri/tasks/QueryTask"],function(o,s,r,t){var l=a.target?a.target:a.srcElement,b=l.value;e.currentAnalysisType(b);var n=o.getMap().infoWindow,v=n.getSelectedFeature();if(v.attributes.OBJECTID){var i=v.attributes.OBJECTID,m=v._layer,u=m._url.path,p=new t(u),c=new r;c.objectIds=[i],c.outFields=["*"],c.returnGeometry=!0,c.maxAllowableOffset=0,p.execute(c,function(e){e.features.length>0?s.getResultsForType(b,e.features[0]):s.getResultsForType(b,v)})}else s.getResultsForType(b,v)})},p._vm.landsatYearChanged=function(e,a){var o=document.getElementById("landsat-checkbox");o.checked&&r.publish("updateLandsatLayer")},p._vm.canopyDensityClicked=function(){require(["atlas/tools/TreeCoverDensityDialog"],function(e){e.show()})},p._vm.treeCoverDialogClose=function(){require(["atlas/tools/TreeCoverDensityDialog"],function(e){e.hide()})},o.applyBindings(p._vm,document.body)})}});return p.getDataModel=function(){return p._dataModel},p.getVM=function(){return p._vm},p.initialize=function(e,a){return p._created?p._update(e,a):p._instance=new p(e,a),p._instance},p.destroy=function(){delete p._instance},p});