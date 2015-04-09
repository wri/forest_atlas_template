define([
	"mapui",
	"mainmodel",
	"root/languages",
	"dojo/on",
	"dojo/dom",
	"dijit/Dialog",
	"dojo/Deferred",
	"dijit/registry",
	"esri/graphic",
	"esri/toolbars/draw",
	"esri/geometry/Polygon",
	"atlas/tools/MapAssets"
], function (MapUI, Model, languages, on, dom, Dialog, Deferred, registry, Graphic, Draw, Polygon, MapAssets) {
	'use strict';

	var isActive = false,
			toolbar,
			map;

	var DrawTools = {

		init: function () {
			map = MapUI.getMap();
			toolbar = new Draw(map);
			toolbar.on('draw-end', this.drawComplete.bind(this));
		},

		drawComplete: function (evt) {
			this.deactivate();
			// Make sure we have geometry
			if (!evt.geometry) {
				return;
			}

			var symbol = MapAssets.getDrawUploadSymbol(),
					graphicsLayer = map.getLayer('customGraphicsLayer'),
					attributes = {},
					graphic,
					polygon;


			this.promptUserForName().then(function (name) {

				attributes.CustomFeatureId = MapAssets.getNextAvailableId(graphicsLayer.graphics, 'CustomFeatureId');
				attributes.Custom_Title = name;
				polygon = new Polygon(evt.geometry);
				graphic = new Graphic(polygon, symbol, attributes);
				graphicsLayer.add(graphic);
			
			}, function () {
				// Do nothing if they cancel the dialog
			});

		},

		promptUserForName: function () {
			var deferred = new Deferred(),
					viewModel = Model.getVM(),
					strings = languages[viewModel.currentLanguage()],
					listener,
					dialog,
					name;

			if (registry.byId('customNamingDialog')) {
				registry.byId('customNamingDialog').destroy();
			}

			dialog = new Dialog({
				id: 'customNamingDialog',
				title: strings.drawNamingDialogTitle,
				content: '<div class="customFeatureNamingDialog"><input class="customNameForFeature" id="customNameForFeature" type="text" />' + 
								 '<button class="customNameDialogSubmit" id="customNameDialogSubmit">' + strings.drawNamingDialogSubmit + '</button></div>',
				style: 'width: 300px;'
			});

			dialog.show();

			listener = on(dom.byId('customNameDialogSubmit'), 'click', function () {
				name = dom.byId('customNameForFeature').value;
				if (name === "") {
					alert(strings.drawNamingDialogNoNameError);
				} else {
					deferred.resolve(name);
					cleanup();
				}
			});

			dialog.on('cancel', function () {
				deferred.reject();
				listener.remove();
			});

			function cleanup() {
				listener.remove();
				dialog.destroy();
			}


			return deferred.promise;
		},

		activate: function () {
			toolbar.activate(Draw.FREEHAND_POLYGON);
			isActive = true;
		},

		deactivate: function () {
			toolbar.deactivate();
			isActive = false;
		},

		toggle: function () {
			if (isActive) {
				this.deactivate();
			} else {
				this.activate();
			}
		},

		isActive: function () {
			return isActive;
		}

	};

	return DrawTools;

});