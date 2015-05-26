define([
	'dojo/on',
	'dojo/topic',
	'dojo/dom-geometry',
	'dojo/_base/window'
], function (on, topic, domGeom, win) {

	// Threshold is same value media queries start applying mobile styling
	var threshold = 767;
	var body = win.body();
	var prevWidth;

	var checkLayout = function () {
		width = domGeom.position(body).w;

		// Dont broadcast every time the window changes size, 
    // only when switching to phone or desktop
    if (prevWidth < threshold && width > threshold) {
        topic.publish("changeLayout", false);
    }
    if (prevWidth > threshold && width < threshold) {
        topic.publish("changeLayout", true); // True for changing to mobile
    }
    prevWidth = width;
	};

	return {

		isMobile: function () {
			return domGeom.position(body).w < threshold;
		},

		enableLayout: function() {
      on(win.global, 'resize', checkLayout);
    }

	};

});