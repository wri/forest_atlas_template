/**

	NOT BEING USED AT ALL, WAS BUILT FOR REQUESTING ALL RESULTS AT ONCE AND RENDERING TO MULTIPLE CONTAINERS
	THIS APP IS INSTEAD USING THE APPROACH OF REQUESTING ONLY ONE AT A TIME AND SHOWING ONE AT A TIME, ALSO, 
	THERE IS NO CONFIGURATION COMING FROM RESOURCES ANYMORE, ALL CONFIG IS IN Fetcher.js.  Results.js NOW 
	KICKS OFF ALL OF THE REQUESTS

**/
define([
	"toolsmodel",
	"toolsconfig",
	"res/Resources",
	"esri/request",
	"dojo/Deferred",
	"dojo/promise/all",
	"dojo/_base/array",
	"atlas/tools/Fetcher",
	"esri/tasks/GeometryService",
  "esri/tasks/AreasAndLengthsParameters"
], function (ToolsModel, ToolsConfig, Resources, esriRequest, Deferred, all, arrayUtils, Fetcher, GeometryService, AreasAndLengthsParameters) {
	'use strict';

	var categories = Resources.analysisCategories,
			datasets = Resources.analysisSets,
			config = ToolsConfig.getConfig(),
			Model = ToolsModel.getVM();

	var Analyzer = {

		/**
		* Kickoff your analysis here
		* @param {object} esriGraphic - Esri graphic object
		*/
		beginAnalysis: function (esriGraphic) {	
			// May be able to get the area from feature.attributes in some cases
			this.getAreaForGeometry(esriGraphic);
			// Configure which analysis is performed here based on Resources.analysisCategories
			var requests = this.getArrayOfRequests(),
					self = this;
			// If categories.forma is true, get clearance bounds and then start processing
			if (categories.forma) {
				this.getClearanceBounds().then(function (success, err) {
					if (success) {						
						startRequests();
					} else {
						// Unable to retrieve bounds and will not be able to perform analysis
						// on clearance alerts without it, handle that here
					}
				});
			} else {
				startRequests();
			}

			function startRequests() {
				if (requests.length < 4) {
					all(self.getDeferredsForKeys(requests, esriGraphic)).then(histogramRequestsComplete);
				} else {
					requests = self.chunkArray(requests, 3);
					processRequests();
				}
			}

			function processRequests() {
				if (requests.length > 0) {
					var keys = requests.shift();
					all(self.getDeferredsForKeys(keys, esriGraphic)).then(processRequests);
				} else {
					histogramRequestsComplete();
				}
			}

			function histogramRequestsComplete() {
				// All the histograms are complete
				// Start Fires Requests now
				console.log('Histogram Requests Complete');
			}

		},

		/**
		* Get the area for the provided graphic
		* @param {object} esriGraphic - Esri graphic object
		*/
		getAreaForGeometry: function (esriGraphic) {

			var geometryService = new GeometryService(Resources.geometryServiceURL),
					parameters = new AreasAndLengthsParameters(),	
					geometry = esriGraphic.geometry;

			parameters.areaUnit = GeometryService.UNIT_HECTARES;

			// These values seem to be consistnely off by a few 1000, may need to be reprojected
			// or investigate why these values are different from the popup values

			geometryService.simplify([geometry], function (simplifiedPolygons) {
				parameters.polygons = simplifiedPolygons;
				geometryService.areasAndLengths(parameters, success, failure);
			}, failure);

			function success(res) {
				console.log(res);
			}

			function failure(err) {
				console.error(err);
			}

		},

		/**
		* Get the bounds for clearance alerts dynamically since new data is added frequently
		* This ensures our analysis always has the latest data
		*/
		getClearanceBounds: function () {
			var clearanceConfig = config.analysisConfig.clearanceBounds,
					baseYear = clearanceConfig.baseYearLabel,
          deferred = new Deferred(),
          yearIncrementer = 0,
          clearanceAlertBounds,
          clearanceAlertLabels,
          month,
          req;

      req = esriRequest({
      	url: clearanceConfig.url,
      	content: {
      		f: 'pjson'
      	},
      	handleAs: 'json',
      	callbackParamName: 'callback'
      });

      req.then(function (res) {
      	var index = res.minValues[0],
      			length = res.maxValues[0];

      	clearanceAlertBounds = [res.minValues[0], res.maxValues[0]];
      	clearanceAlertLabels = [];
      	for (index; index <= length; index++) {
      		month = index % 12 === 0 ? 12 : index % 12; // get numeric representation of the month
      		clearanceAlertLabels.push(month + '-' + (baseYear + yearIncrementer));
      		if (index % 12 === 0) {
      			++yearIncrementer;
      		}
      	}
      	Model.clearanceAlertBounds(clearanceAlertBounds);
      	Model.clearanceAlertLabels(clearanceAlertLabels);
      	deferred.resolve(true);
      }, function (err) {
      	deferred.resolve(false, err);
      });

      return deferred.promise;

		},

		/**
		* Get array of strings to represent requests, this is so we can chunk the requests and
		* only perform 3 - 4 at a time and not overload the server with requests
		* @return {array} array of keys from Resources.analysisSets that are set to true
		*/
		getArrayOfRequests: function () {
			var requestKeys = [],
					key;

			for (key in datasets) {				
				if (datasets.hasOwnProperty(key) && datasets[key]) {
					requestKeys.push(key);
				}
			} 

			return requestKeys;
		},

		/**
		* Initiate the request and return an array of promises for the supplied keys
		* @param {array} keys - array of keys provided by the Resources.analysisSets
		* @param {object} graphicObject - Esri Graphic Object
		* @return {array} An array of promises
		*/ 
		getDeferredsForKeys: function (keys, graphicObject) {
			var promises = [];

			arrayUtils.forEach(keys, function (key) {

				switch (key) {
					case "ifl":
						promises.push(Fetcher.getIntactForestLandscapes(graphicObject));
					break;
					case "carbon":
						promises.push(Fetcher.getCarbon(graphicObject));
					break;
					case "landCover":
						promises.push(Fetcher.getLandCover(graphicObject));
					break;
					case "treeDensity":
						promises.push(Fetcher.getTreeCoverDensity(graphicObject));
					break;
					case "protectedArea":
						promises.push(Fetcher.getProtectedAreas(graphicObject));
					break;
					case "primForest":
						promises.push(Fetcher.getPrimaryForests(graphicObject));
					break;
					case "legal":
						promises.push(Fetcher.getLegal(graphicObject));
					break;
					case "peat":
						promises.push(Fetcher.getPeat(graphicObject));
					break;
					case "rspo":
						promises.push(Fetcher.getRSPO(graphicObject));
					break;
				}

			});

			return promises;
		},

    /**
    *	Helper function to take an array and break it into chunks
    * Example: chunkArray([1,2,3,4,5,6], 2) -> [ [1,2], [3,4], [5,6] ]
    *	@param {array} arr - original array to split into chunks
    * @param {number} chunkSize - size of the chunks that you like 
    * @return {array(s)} returns an array or an array of arrays of the specified chunk size
    */
    chunkArray: function (arr, chunkSize) {
    	var resultingArrays= [], index = 0;
    	for (index; index < arr.length; index += chunkSize) {
    		resultingArrays.push(arr.slice(index, index + chunkSize));
    	}
    	return resultingArrays;
    }

	};

	return Analyzer;

});