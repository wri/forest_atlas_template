define([
	"topic",
	"toolsmodel"
], function (topic, ToolsModel) {
	"use strict";

	var _slider;

	var Controller = {

		show: function () {
			var self = this;
			// If slider has not been initialized, do so now
			if (_slider === undefined) {
				_slider = $("#tree-cover-slider").ionRangeSlider({
					values: [0, 10, 15, 20, 25, 30, 50, 75, 100],
					from_min: 1,
					from_max: 7,
					grid: true,
					from: 5,
					onFinish: self.updateTCDValue
				});
			}

			$(".tree-cover-dialog").addClass("active");
		},

		hide: function () {
			$(".tree-cover-dialog").removeClass("active");
		},

		/**
		* Update a value in the model
		* @param {object} data - Data object from the sliders onFinish method
		*/
		updateTCDValue: function (data) {
			var model = ToolsModel.getVM();
			var value = data.from_value;
			if (value !== undefined) {
				model.tcdSelectorValue(value);
				topic.publish("updateTCDRenderingRule");
			}
		}

	};

	return Controller;

});
