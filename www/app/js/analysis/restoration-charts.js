define(["root/analysis/constants"],function(t){var e=function(t){return'<section class="restoration-nodata"><div>There is no '+t+" data for this restoration option in this area.</div></section>"},a=function(t){return'<section class="restoration-error"><div>We are unable to complete your request at this time for '+t+" data. Please try again later.</div></section>"};return{prepareContainer:function(e,a){var i=a?a.container:"analysis-chart",r='<div class="restoration-chart-title">'+e+"</div>";r+='<div id="'+t.SLOPE_CHART_ID+'" class="restoration-chart"></div>',r+='<div id="'+t.LAND_COVER_CHART_ID+'" class="restoration-chart"></div>',r+='<div id="'+t.POPULATION_CHART_ID+'" class="restoration-chart"></div>',r+='<div id="'+t.TREE_COVER_CHART_ID+'" class="restoration-chart"></div>',$("#"+i).replaceWith('<div id="'+i+'"></div>'),$("#"+i).append(r)},showError:function(t,e){$("#"+t).addClass("error"),$("#"+t).append(a(e))},makeStackedBarChart:function(t,a,i){i.length>0?$("#"+t).highcharts({chart:{type:"bar"},title:{text:null},credits:{enabled:!1},exporting:{enabled:!1},xAxis:{categories:[a]},yAxis:{title:{enabled:!1}},plotOptions:{series:{stacking:"normal"}},tooltip:{valueSuffix:" (HA)"},series:i}):$("#"+t).append(e(a))},makeBarChart:function(t,a,i){a.length>0?$("#"+t).highcharts({chart:{type:"bar"},title:{text:null},credits:{enabled:!1},exporting:{enabled:!1},tooltip:{valueSuffix:" (HA)"},xAxis:{categories:i,maxPadding:.5,useHTML:!0},yAxis:{title:{text:"Hectares"}},series:a}):$("#"+t).append(e(name))}}});