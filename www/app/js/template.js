define(["esri/urlUtils","dojo/Deferred","dojo/promise/all","esri/arcgis/utils","dojo/_base/array","res/Resources"],function(e,t,o,a,n,i){"use strict";var r=function(e){return""!==e&&void 0!==e&&2===e.split(",").length},l=function(e){var t=options.split(",");return{label:t[0],id:t[1].replace(/ /g,"")}};return{getApplicationInformation:function(){var o=new t,s=e.urlToObject(location.href),u=s&&s.query&&s.query.appid;return u?(a.getItem(u).then(function(e){var t,a,s,u={},d=e.itemData&&e.itemData.values;if(d){u.country=d.country,u.appLanguages={},d.defaultLanguage||(d.defaultLanguage=i.defaultLanguage||"en"),u.defaultLanguage=d.defaultLanguage,a=i.appLanguages&&i.appLanguages[d.defaultLanguage],u.appLanguages[d.defaultLanguage]={title:d.defaultTitle||a&&a.title||"",flagTitle:d.flagTitle||a&&a.flagTitle||"","default":!0},u.useAdditionalLanguage=d.useAdditionalLanguage,u.useAdditionalLanguage&&(s=d.secondLanguage||"fr",t=i.appLanguages&&i.appLanguages[s],u.appLanguages[s]={title:d.secondLanguageTitle||t&&t.title||"",flagTitle:d.secondLanguageFlagTitle||t&&t.flagTitle||""}),u.layersToHide=d.layersToHide?d.layersToHide.split(",").map(function(e){return parseInt(e)}):[],u.maskMapUrl=d.maskMapUrl,u.webMapID=d.webmap,u.countryFlagRight=void 0!==d.countryFlagRight?d.countryFlagRight+"px":void 0,u.countryTextWidth=void 0!==d.countryTextWidth?d.countryTextWidth+"px":d.countryFlagRight?d.countryFlagRight-20+"px":void 0,u.flagPath=d.flagPath,u.flagLinkPath=d.flagLinkPath,u.pdfURL=d.pdfURL,u.aboutLinkUrl=d.aboutLinkUrl,u.downloadDataUrl=d.downloadDataUrl,u.printURL=d.printURL,u.activeFiresIncluded=void 0===d.activeFiresIncluded?!0:d.activeFiresIncluded,u.landCoverIncluded=void 0===d.landCoverIncluded?!0:d.landCoverIncluded,u.biomassIncluded=void 0===d.biomassIncluded?!0:d.biomassIncluded,u.iflIncluded=void 0===d.iflIncluded?!0:d.iflIncluded,u.excludeDocumentsTab=d.excludeDocumentsTab,u.documentDirectory=d.documentDirectory,u.documentMapserver=d.documentMapserver,u.restorationModule=d.restorationModule||!1,u.restorationImageServer=d.restorationImageServer,u.restorationModuleOptions=[],r(d.restorationModuleOption1)&&u.restorationModuleOptions.push(l(d.restorationModuleOption1)),r(d.restorationModuleOption2)&&u.restorationModuleOptions.push(l(d.restorationModuleOption2)),r(d.restorationModuleOption3)&&u.restorationModuleOptions.push(l(d.restorationModuleOption3)),r(d.restorationModuleOption4)&&u.restorationModuleOptions.push(l(d.restorationModuleOption4)),r(d.restorationModuleOption5)&&u.restorationModuleOptions.push(l(d.restorationModuleOption5)),r(d.restorationModuleOption6)&&u.restorationModuleOptions.push(l(d.restorationModuleOption6)),r(d.restorationModuleOption7)&&u.restorationModuleOptions.push(l(d.restorationModuleOption7)),r(d.restorationModuleOption8)&&u.restorationModuleOptions.push(l(d.restorationModuleOption8)),r(d.restorationModuleOption9)&&u.restorationModuleOptions.push(l(d.restorationModuleOption9)),d.slopeAnalysisRestorationOptions?u.slopeAnalysisRestorationOptions=d.slopeAnalysisRestorationOptions.split(","):u.slopeAnalysisRestorationOptions=[];var p=d.mapThemes&&d.mapThemes.split(",")||[],g=d.mapThemesAlternate&&d.mapThemesAlternate.split(",")||[],c=d.mapThemeIds&&d.mapThemeIds.split(",")||[],f=[],h=[];p.length===c.length&&p.length>0&&n.forEach(p,function(e,t){f.push({label:e,value:"http://wri.github.io/forest_atlas_template/?appid="+c[t].replace(" ","")})}),g.length===c.length&&g.length>0&&n.forEach(g,function(e,t){h.push({label:e,value:"http://wri.github.io/forest_atlas_template/?appid="+c[t].replace(" ","")})}),u.mapThemes=f,u.mapThemesAlternate=h,u.basemap=void 0,u.geometryServiceURL=void 0,u.defaultLayerTransparency=void 0}o.resolve(u)},function(){o.reject(new Error("Unable to retrieve application configuration imformation."))}),o):(o.reject(new Error("There is no application configuration imformation.")),o)}}});