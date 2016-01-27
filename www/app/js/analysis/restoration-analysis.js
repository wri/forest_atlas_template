define(["root/analysis/restoration-charts","root/analysis/compute-histogram","esri/geometry/geometryEngine","root/analysis/analysisConfig","root/analysis/ethiopiaConfig","root/analysis/constants","dojo/promise/all","dojo/dom-class"],function(s,o,a,r,e,n,t,i){var l=function(s){return 0===s.length?s:s[0].counts},E=function(s,o){if(s.length===o)return s;for(var a=[],r=0;o>r;r++)a[r]=s[r]||0;return a},m=function(s,o,a){return s.map(function(s,r){return{name:o[r],data:[s],color:a[r]}}).filter(function(s){return 0!==s.data[0]&&"No Data"!==s.name})};return{performRestorationAnalysis:function(O,R){var c,_,C,g,h=e.options[R],A=O.geometry,u=h.id,T={},L=r[n.SLOPE],P=r[n.LAND_COVER],d=r[n.POPULATION],y=r[n.TREE_COVER],f=a.simplify(A);T[n.SLOPE]=o.multiplyRasters(L.id,u,f),T[n.LAND_COVER]=o.multiplyRasters(P.id,u,f),T[n.POPULATION]=o.multiplyRasters(d,u,f),T[n.TREE_COVER]=o.multiplyRasters(y.id,u,f),t(T).always(function(o){return i.add("analysis-loader","hidden"),s.prepareContainer(h.name),o.code&&o.message?(s.showError(n.SLOPE_CHART_ID,L.name),s.showError(n.LAND_COVER_CHART_ID,P.name),s.showError(n.POPULATION_CHART_ID,d.name),void s.showError(n.TREE_COVER_CHART_ID,y.name)):(console.log(o),c=E(l(o[n.SLOPE].histograms),L.classes.length),_=E(l(o[n.LAND_COVER].histograms),P.classes.length),C=E(l(o[n.POPULATION].histograms),d.classes.length),g=E(l(o[n.TREE_COVER].histograms),y.classes.length),c=m(c,L.classes,L.colors),_=m(_,P.classes,P.colors),C=m(C,d.classes,d.colors),g=m(g,y.classes,y.colors),s.makeChart(n.SLOPE_CHART_ID,L.name,c),s.makeChart(n.LAND_COVER_CHART_ID,P.name,_),s.makeChart(n.POPULATION_CHART_ID,d.name,C),s.makeChart(n.TREE_COVER_CHART_ID,y.name,g),console.log(n.SLOPE,o[n.SLOPE].histograms),console.log(n.LAND_COVER,o[n.LAND_COVER].histograms),console.log(n.POPULATION,o[n.POPULATION].histograms),void console.log(n.TREE_COVER,o[n.TREE_COVER].histograms))})}}});