define(["esri/Color","dojo/_base/array","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol"],function(e,r,t,i){"use strict";var n={getDrawUploadSymbol:function(){return new t(t.STYLE_SOLID,new i(i.STYLE_SOLID,new e([0,0,0]),2),new e([255,255,255,.5]))},getNextAvailableId:function(e,t){var i,n=0;return r.forEach(e,function(e){i=e.attributes?parseInt(e.attributes[t]):void 0,isNaN(i)||(n=Math.max(n,i))}),n+1}};return n});