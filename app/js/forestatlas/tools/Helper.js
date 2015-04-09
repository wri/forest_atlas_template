define([
	'dojo/dom-geometry',
	'dojo/_base/window'
], function (domGeom, win) {

	// Threshold is same value media queries start applying mobile styling
	var threshold = 767;
	var body = win.body();

	return {

		isMobile: function () {
			return domGeom.position(body).w < threshold;
		}

	};

});