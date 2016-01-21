define([
	"esri/Color",
	"dojo/_base/array",
	"esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol"
], function (Color, arrayUtils, SimpleFillSymbol, SimpleLineSymbol) {
	'use strict';

	var Assets = {

		/**
		* Returns a symbol to be used for drawn or uploaded features
		* @return {object} returns a esri symbol for graphic objects
		*/
		getDrawUploadSymbol: function () {
			return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
             new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 2),
             new Color([255, 255, 255, 0.5]));
		},

		/**
		* Helper method to iterate over the graphics in a layer and return the nest available id
		* @param {array} graphics - Array of graphics to iterate over
		* @param {array} fieldName - Field name that contains the unique numerical id 
		* @return {integer} next id
		*/
		getNextAvailableId: function (graphics, fieldName) {
			var nextId = 0,
					temp;

			arrayUtils.forEach(graphics, function (graphic) {
				temp = graphic.attributes ? parseInt(graphic.attributes[fieldName]) : undefined;
				if (!isNaN(temp)) {
					nextId = Math.max(nextId, temp);
				}
			});
			return nextId + 1;
		}

	};

	return Assets;

});