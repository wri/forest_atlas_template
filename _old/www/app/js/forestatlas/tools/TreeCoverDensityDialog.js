define(["topic","toolsmodel"],function(e,i){"use strict";var o,r={show:function(){var e=this;void 0===o&&(o=$("#tree-cover-slider").ionRangeSlider({values:[0,10,15,20,25,30,50,75,100],from_min:1,from_max:7,grid:!0,from:5,onFinish:e.updateTCDValue})),$(".tree-cover-dialog").addClass("active")},hide:function(){$(".tree-cover-dialog").removeClass("active")},updateTCDValue:function(o){var r=i.getVM(),t=o.from_value;void 0!==t&&(r.tcdSelectorValue(t),e.publish("updateTCDRenderingRule"))}};return r});