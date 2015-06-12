define([
	"mapui",
	"mapconfig",
	"toolsmodel",
	"dojo/sniff",
	"esri/request",
	"esri/graphic",
	"dijit/registry",
	"dojo/_base/array",
	"dojo/store/Memory",
  "dojo/dom-construct",
  "dijit/form/ComboBox",
	"esri/geometry/Polygon",
	"atlas/tools/MapAssets",
	"esri/geometry/scaleUtils",
	"common/lib/terraformer.min"
], function (MapUI, MapConfig, Model, sniff, esriRequest, Graphic, registry, arrayUtils, Memory, domConstruct, ComboBox, Polygon, MapAssets, scaleUtils) {
	'use strict';

	var errors = {
		badType: 'We currently do not support the file type you provided, file type must be .zip, .geojson, or .json.',
		failedRequest: 'We are unable to process your shapefile or geojson file at this time.  Please try again later.',
		browserCompatability: 'Your browser may not support this feature, try again on the latest version of Firefox, Chrome, IE, or Safari.',
		invalidJson: 'Please make sure your geojson is valid, you can validate it here: http://geojsonlint.com',
		convert: 'We are unable to convert your geojson file, please make sure it is valid geojson(http://geojsonlint.com).'
	};

	var Uploader = {
		/**
		* Request a feature set from ArcGIS Portal API and pass the features on
		* @param {object} evt - Event from form input of type file
		*/
		beginUpload: function (evt) {
			var target = evt.target ? evt.target : evt.srcElement;
			// If form is reset or has no value, exit
			if (target.value === "") {
				return;
			}

			var filename = target.value.toLowerCase(),
					mapConfig = MapConfig.getConfig(),
					length = filename.length,
					map = MapUI.getMap(),
					self = this,
					content,
					params,
					extent;

			// Filename is fullpath in IE, extract tha actual filename
			if (sniff("ie")) {
				var temp = filename.split('\\');
				filename = temp[temp.length - 1];
			}

			// If the file is of type .json, pass off to another function and exit here
			if (filename.slice(length - 5, length) === '.json' || filename.slice(length - 8, length) === '.geojson') {
				this.uploadGeoJson(target);
				return;
			}

			// Check if the filetype is a supported extension
			if (filename.slice(length - 4, length) !== '.zip') {
				alert(errors.badType);
				return;
			}

			// Split the file based on .
			filename = filename.split('.');

			// Chrome and IE add c:\fakepath to the value - we need to remove it
      // See this link for more info: http://davidwalsh.name/fakepath
      filename = filename[0].replace("c:\\fakepath\\", "");

      params = {
      	'name': filename,
				'generalize': true,
				'targetSR': map.spatialReference,
				'maxRecordCount': 1000,
				'reducePrecision': true,
				'numberOfDigitsAfterDecimal': 0,
				'enforceInputFileSizeLimit': true,
				'enforceOutputJsonSizeLimit': true
      };

      // Generalize Features 
      // based on https://developers.arcgis.com/javascript/jssamples/portal_addshapefile.html
      extent = scaleUtils.getExtentForScale(map, 40000);
      params.maxAllowableOffset = extent.getWidth() / map.width; 

      content = {
    		'publishParameters': JSON.stringify(params),
    		'callback.html': 'textarea',
    		'filetype': 'shapefile',
    		'f': 'json'
    	};

      esriRequest({
      	url: mapConfig.portalGenerateFeaturesURL,
      	content: content,
      	form: document.getElementById('uploadForm'),
      	handleAs: 'json',
      	load: this.uploadSuccess.bind(this),
      	error: this.uploadError
      });
		},

		/**
		* Error Handler for generate features request
		*/
		uploadError: function () {
			alert(errors.failedRequest);
		},

		/**
		* Success Handler for generate features request
		* @param {object} res - respnose from request that contains a feature collection
		*/
		uploadSuccess: function (res) {
			var container = document.getElementById('uploadNameSelectContainer'),
					featureCollection = res.featureCollection,
					vm = Model.getVM(),
					featureStore = [],
					self = this,
					dataStore;

			arrayUtils.forEach(featureCollection.layers[0].layerDefinition.fields, function (field) {
				featureStore.push({
					name: field.name,
					id: field.alias
				});
			});

			domConstruct.create("div", {
				'id': "dropdownContainerName",
				'innerHTML': "<div id='uploadComboNameWidget'></div>"
			}, container, "first");

			dataStore = new Memory({
				data: featureStore
			});

			new ComboBox({
				id: "uploadComboNameWidget",
				value: "-- Choose name field --",
				store: dataStore,
				searchAttr: "name",
				onChange: function (name) {
					if (name) {
						self.addToMap(name, featureCollection.layers[0].featureSet);
						self.resetForm();
					}	
				}
			}, "uploadComboNameWidget");

		},

		/**
		* Upload GeoJSON Files
		* @param {object} target - input with the file attached to it
		*/
		uploadGeoJson: function (target) {
			var extractJson,
					geojson,
					reader,
					file;

			extractJson = function () {
				try {
					geojson = JSON.parse(reader.result);
				} catch (e) {
					alert(errors.invalidJson);
				}

				if (geojson) {
					this.convertGeoJsonToEsriGeo(geojson);
				}

			};

			try {
				file = target.files[0];
				reader = new FileReader();
				reader.onload = extractJson.bind(this);
				reader.readAsText(file);
			} catch (e) {
				alert(errors.browserCompatability);
			}

		},

		/**
		* Convert geojson to Esri Geometry so I can add it to the map
		* @param {object} geojson - A geoJson Object representing a feature collection
		*/
		convertGeoJsonToEsriGeo: function (geojson) {
			var polygons = [],
					self = this,
					esriGeo,
					poly;

			// Require the terraformer helper to convert geojson to Esri Geo
			require(["common/lib/terraformer-arcgis-parser-1.0.4.min"], function () {

				try {
					esriGeo = Terraformer.ArcGIS.convert(geojson);
				} catch (e) {
					alert(errors.convert);
				}

				if (esriGeo) {
					arrayUtils.forEach(esriGeo, function (item, index) {
						poly = new Polygon();
						if (Object.prototype.toString.call(item.geometry) === "[object Array]") {							
							arrayUtils.forEach(item.geometry, function (geom) {
								// For some strange reason, terraformer sometimes returns rings as paths
								// cover both versions here
								if (geom.rings) {
									arrayUtils.forEach(geom.rings, function (ring) {
										poly.addRing(ring);
									});
								} else {
									arrayUtils.forEach(geom.paths, function (ring) {
										poly.addRing(ring);
									});
								}

							});
						} else {
							// For some strange reason, terraformer sometimes returns rings as paths
							// cover both versions here
							if (item.geometry.rings) {
								arrayUtils.forEach(item.geometry.rings, function (ring) {
									poly.addRing(ring);
								});
							} else {
								arrayUtils.forEach(item.geometry.paths, function (ring) {
									poly.addRing(ring);
								});
							}
						}
						if (poly.rings.length > 0) {
							polygons.push({
								polygon: poly,
								attributes: item.attributes,
								id: index
							});
						}
					});

					if (polygons.length > 0) {

						var container = document.getElementById('uploadNameSelectContainer'),
								attributeStore = [],
								dataStore;

						domConstruct.create("div", {
							'id': "dropdownContainerName",
							'innerHTML': "<div id='uploadComboNameWidget'></div>"
						}, container, "first");

						for (var key in polygons[0].attributes) {
							attributeStore.push({
								name: key,
								id: key
							});
						}

						dataStore = new Memory({
							data: attributeStore
						});

						new ComboBox({
							id: "uploadComboNameWidget",
							value: "-- Choose name field --",
							store: dataStore,
							searchAttr: "name",
							onChange: function (name) {
								if (name) {
									self.addGeoJsonToMap(name, polygons);
									self.resetForm();
								}	
							}
						}, "uploadComboNameWidget");

					}

				}

			});

		},

		/**
		* Takes an array of polygons and generates features from those and adds them to the map
		* @param {string} titleFieldName - field name chosen from dropdown as the field to be used for labeling
		* @param {array} polygonsArray - An Array of objects containing polygons converted from geojson and attributes
		*/
		addGeoJsonToMap: function (titleFieldName, polygonsArray) {
			var symbol = MapAssets.getDrawUploadSymbol(),
					map = MapUI.getMap(),
					graphicsLayer = map.getLayer('customGraphicsLayer'),
					vm = Model.getVM(),
					attributes,
					polygon,
					graphic,
					extent,
					nextId;

			nextId = MapAssets.getNextAvailableId(graphicsLayer.graphics, 'CustomFeatureId');
			arrayUtils.forEach(polygonsArray, function (item) {
			 	attributes = item.attributes;
			 	attributes.Custom_Title = item.attributes[titleFieldName];
			 	// Incrememnt Next Id after assignment, not before
			 	attributes.CustomFeatureId = nextId++;
			 	graphic = new Graphic(item.polygon, symbol, attributes);
			 	extent = extent ? extent.union(item.polygon.getExtent()) : item.polygon.getExtent();
				graphicsLayer.add(graphic);
			});

			map.setExtent(extent, true);

			// Reset the form
			document.uploadForm.reset();
			vm.analyzeToolsVisible(false);
			vm.showUploadTools(false);

			// Send Event to Google Analytics
			ga('A.send', 'event', 'Event', 'Upload', 'User successfully uploaded a GeoJSON file.');

		},

		/**
		* Add the Results to the Map, this is for shapefiles
		* @param {string} titleFieldName - The name the user chose from the dropdown, will be used for popups
		* @param {object} featureSet - esri feature set that contains an array of features
		*/
		addToMap: function (titleFieldName, featureSet) {
			var symbol = MapAssets.getDrawUploadSymbol(),
					map = MapUI.getMap(),
					graphicsLayer = map.getLayer('customGraphicsLayer'),
					polygon,
					graphic,
					extent,
					nextId;

			nextId = MapAssets.getNextAvailableId(graphicsLayer.graphics, 'CustomFeatureId');

			arrayUtils.forEach(featureSet.features, function (feature) {
				// Incrememnt Next Id after assignment, not before
				feature.attributes.CustomFeatureId = nextId++;
				feature.attributes.Custom_Title = feature.attributes[titleFieldName];
				polygon = new Polygon(feature.geometry);
				graphic = new Graphic(polygon, symbol, feature.attributes);
				extent = extent ? extent.union(polygon.getExtent()) : polygon.getExtent();
				graphicsLayer.add(graphic);
			});

			map.setExtent(extent, true);

			// Send Event to Google Analytics
			ga('A.send', 'event', 'Event', 'Upload', 'User successfully uploaded a shapefile.');

		},

		resetForm: function () {
			var vm = Model.getVM();

			if (registry.byId('uploadComboNameWidget')) {
				registry.byId('uploadComboNameWidget').destroy();
			}
			if (document.getElementById('dropdownContainerName')) {
				domConstruct.destroy('dropdownContainerName');
			}
			document.uploadForm.reset();
			vm.analyzeToolsVisible(false);
			vm.showUploadTools(false);
		}

	};

	return Uploader;

});