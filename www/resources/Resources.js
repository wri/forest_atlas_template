define([],function(){"use strict";var a={aboutLinkUrl:"http://gab.forest-atlas.org/",country:"GAB",countryFlagRight:280,countryTextWidth:260,defaultLanguage:"en",defaultTitle:"Forest Atlas of Gabon",defaultLayerTransparency:100,excludeDocumentsTab:!1,documentDirectory:"http://gab.forest-atlas.org/resources/docs/",documentMapserver:"http://gis.forest-atlas.org/arcgis/rest/services/GAB/documents_administratifs/MapServer",downloadDataUrl:"http://gab-data.forest-atlas.org/",flagLinkPath:"http://www.eaux-forets.gouv.ga/",flagPath:"app/images/GAB_flag_new.png",flagTitle:"Ministry of Forest and Wildlife",layersToHide:[5,6,7,8,12,13],mapThemes:[{label:"Forest Atlas of Democratic Republic of Congo",value:"http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687"},{label:"Forest Atlas of Equatorial Guinea",value:"http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19"}],mapThemesAlternate:[{label:"Testing Congo",value:"http://wri.github.io/forest_atlas_template/?appid=edfa3967f09f4236ae9249dd82265687"},{label:"Testing Guinea",value:"http://wri.github.io/forest_atlas_template/?appid=c76d788b7487476bae4d09a4e933be19"}],maskMapUrl:"http://gis-stage.wri.org/arcgis/rest/services/Ethiopia/Africa_mask/MapServer",printURL:"http://gis.forest-atlas.org/arcgis/rest/services/GAB/GABExportWebMap/GPServer/Export%20Web%20Map",secondLanguage:"fr",secondLanguageTitle:"Atlas Forestier du Gabon",secondLanguageFlagTitle:"Ministère des Forêts et de la Faune",useAdditionalLanguage:!0,webMapID:"fa499ab4cc9e4a308411b64c9ab2b749",activeFiresIncluded:!0,landCoverIncluded:!0,iflIncluded:!0,biomassIncluded:!0,formaIncluded:!1,terraIncluded:!1,imazonIncluded:!1,globcoverIncluded:!1,mangroveIncluded:!1,restorationModule:!0,restorationModuleOptions:[{id:"$9",label:"establishing natural forest outside of cropland"},{id:"$10",label:"restocking of degraded natural forest"},{id:"$6",label:"agri-silviculture and agro-silvo-pastoralism"},{id:"$11",label:"silvo-pastoralism"},{id:"$13",label:"woodlot"},{id:"$8",label:"commercial plantation on bare soil and shrubland"},{id:"$7",label:"commercial plantation as buffer zone to national forest priority areas and protected areas"},{id:"$12",label:"tree-based buffer zone along rivers, lakes and reservoirs"},{id:"$3",label:"slope analysis"}],slopeAnalysisRestorationOptionsId:"$5",slopeAnalysisRestorationOptions:["Potential for commercial plantation on bare soil and shrubland only","Potential for agri-silviculture and agro-silvo-pastoralism, and woodlot","Potential for establishing natural forest only","Potential for restocking degraded natural forest only","Potential for woodlot only","Potential for silvo-pastoralism only","Potential for tree-buffer zone along rivers, lakes and reservoirs only","Potential for commercial plantation as buffer zone around (NF)PAs","Two restoration options identified as having potential","Three or more restoration options identified as having potential"]};return a.appLanguages={},a.appLanguages[a.defaultLanguage]={title:a.defaultTitle,flagTitle:a.flagTitle},a.useAdditionalLanguage&&(a.appLanguages[a.secondLanguage]={title:a.secondLanguageTitle,flagTitle:a.secondLanguageFlagTitle}),a});