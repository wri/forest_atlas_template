define([
	"toolsmodel",
	"toolsconfig",
	"esri/request",
	"dojo/Deferred",
	"dojo/promise/all",
	"esri/tasks/query",
  "esri/tasks/QueryTask",
  "atlas/tools/Renderer"
], function (ToolsModel, ToolsConfig, esriRequest, Deferred, all, Query, QueryTask, Renderer) {
	'use strict';

	// Just in case the config is not initialized for some reason
	ToolsConfig.initialize();

	var performLossAnalysis = true;
	var performClearanceAnalysis = false;	
	var toolsConfig = ToolsConfig.getConfig();
	var analysisConfig = toolsConfig.analysisConfig;
	var Model = ToolsModel.getVM();

	var Fetcher = {

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report 
		*/
		getIntactForestLandscapes: function (graphic, printOptions) {
			this.debug('Fetcher >>> getIntactForestLandscapes');
			var deferred = new Deferred(),
					config = analysisConfig.ifl,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, true, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, true, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function (results) {
					deferred.resolve(results);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getCarbon: function (graphic, printOptions) {
			this.debug('Fetcher >>> getCarbon');
			var deferred = new Deferred(),
					config = analysisConfig.carbon,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, false, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, false, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function (results) {
					deferred.resolve(results);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getLandCover: function (graphic, printOptions) {
			this.debug('Fetcher >>> getLandCover');
			var deferred = new Deferred(),
					config = analysisConfig.landCover,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, false, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, false, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function (results) {
					deferred.resolve(results);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getTreeCoverDensity: function (graphic, printOptions) {
			this.debug('Fetcher >>> getTreeCoverDensity');
			var deferred = new Deferred(),
					config = analysisConfig.treeDensity,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, false, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, false, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function (results) {
					deferred.resolve(results);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getProtectedAreas: function (graphic, printOptions) {
			this.debug('Fetcher >>> getProtectedAreas');
			var deferred = new Deferred(),
					config = analysisConfig.protectedArea,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, true, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, true, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function () {
					deferred.resolve(true);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getPrimaryForests: function (graphic, printOptions) {
			this.debug('Fetcher >>> getPrimaryForests');
			var deferred = new Deferred(),
					config = analysisConfig.primForest,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, false, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, false, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function () {
					deferred.resolve(true);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getLegal: function (graphic, printOptions) {
			this.debug('Fetcher >>> getLegal');
			var deferred = new Deferred(),
					config = analysisConfig.legal,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, false, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, false, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function () {
					deferred.resolve(true);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getPeat: function (graphic, printOptions) {
			this.debug('Fetcher >>> getPeat');
			var deferred = new Deferred(),
					config = analysisConfig.peat,
					requests = [];

			if (performLossAnalysis) {
				requests.push(this.totalLossAnalysis(config, graphic, true, printOptions));
			}

			if (performClearanceAnalysis) {
				requests.push(this.clearanceAlertAnalysis(config, graphic, true, printOptions));
			}

			if (requests.length > 0) {
				all(requests).then(function () {
					deferred.resolve(true);
				});
			} else {
				deferred.resolve();
			}			

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getRSPO: function (graphic, printOptions) {
			this.debug('Fetcher >>> getRSPO');
			var deferred = new Deferred(),
					config = analysisConfig.rspo;

			deferred.resolve(true);
			return deferred.promise;
		},

		/**
		* Get number of fires in last seven days
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getFires: function (graphic, printOptions) {
			this.debug('Fetcher >>> getFires');
			var deferred = new Deferred(),
					firesConfig = analysisConfig.fires,
					// highConfidenceQuery,
					activeFireQuery,
					queryParams;

			// highConfidenceQuery = new QueryTask(firesConfig.url + '/0');
			activeFireQuery = new QueryTask(firesConfig.url + '/4');
			queryParams = new Query();

			queryParams.geometry = graphic.geometry;
			queryParams.returnGeometry = false;
			queryParams.outFields = [''];
			queryParams.where = '1 = 1';

			all([
				activeFireQuery.execute(queryParams)
				// highConfidenceQuery.execute(queryParams)
			]).then(function (results) {
				deferred.resolve(true);
				Renderer.renderFireData(results, printOptions);
			});

			return deferred.promise;
		},

		/**
		* Get land cover composition
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getLandCoverComposition: function (graphic, printOptions) {
			this.debug('Fetcher >>> getLandCoverComposition');
			var deferred = new Deferred(),
					config = analysisConfig.landCover,
					url = analysisConfig.totalLossAnalysisUrl,
					pixelSize = 100,
					self = this,
					content;

			content = {
				geometryType: 'esriGeometryPolygon',
				geometry: JSON.stringify(graphic.geometry),
				pixelSize: pixelSize,
				mosaicRule: JSON.stringify(config.mosaicRule),
				f: 'json'
			};

			function success (results) {
				deferred.resolve(true);
				if (results.histograms.length > 0) {
					Renderer.renderLandCoverComposition(results.histograms[0].counts, content.pixelSize, printOptions);
				} else {
					Renderer.renderUnavailable(printOptions);
				}
			}

			function failure (error) {
				if (error.details) {
        	if (error.details[0] === 'The requested image exceeds the size limit.' && content.pixelSize !== 500) {
          	content.pixelSize = 500;
            self.computeHistogram(url, content, success, failure);
          } else {
          	deferred.resolve(false);
          }
        } else {
        	deferred.resolve(false);
        }
			}

			this.computeHistogram(url, content, success, failure);

			return deferred.promise;
		},

		/**
		* Start Performing the Analysis for this particular dataset
		* This is different from below becuase it does not cross the layer
		* with other layers, its just loss in the provided geometry
		* @param {object} graphic - Esri Graphic Object
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		getTotalLoss: function (graphic, printOptions) {
			this.debug('Fetcher >>> getTotalLoss');
			var deferred = new Deferred(),
					url = analysisConfig.totalLossAnalysisUrl,
					pixelSize = 100,
					self = this,
					content;

			content = {
				geometryType: 'esriGeometryPolygon',
				geometry: JSON.stringify(graphic.geometry),
				pixelSize: pixelSize,
				mosaicRule: JSON.stringify(analysisConfig.totalLoss.mosaicRule),
				f: 'json'
			};

			function success(results) {
				deferred.resolve(true);
				if (results.histograms.length > 0) {
					Renderer.renderTotalLossData(results.histograms[0].counts, content.pixelSize, printOptions);
				} else {
					Renderer.renderUnavailable(printOptions);
				}
				//Renderer.formatTreeCoverData(results.histograms[0].counts, content.pixelSize, config, encoder, useSimpleRule);
			}

			function failure(error) {
				if (error.details) {
        	if (error.details[0] === 'The requested image exceeds the size limit.' && content.pixelSize !== 500) {
          	content.pixelSize = 500;
            self.computeHistogram(url, content, success, failure);
          } else {
          	deferred.resolve(false);
          }
        } else {
        	deferred.resolve(false);
        }
			}

			this.computeHistogram(url, content, success, failure);

			return deferred.promise;
		},

		/**
		* Main analysis function to cross layers and geometry with total tree cover loss
		* @param {object} config - basic settings and info necessary to perform analysis
		* @param {object} graphic - Esri Graphic Object
		* @param {boolean} useSimpleRule - whether or not to use the simple version of the rendering rule 
		* @param {object} printOptions - additional options needed to use this from the print report 
		* @return {object} returns a promise
		*/
		totalLossAnalysis: function (config, graphic, useSimpleRule, printOptions) {
			var deferred = new Deferred(),
					lossConfig = analysisConfig.totalLoss,
					url = analysisConfig.totalLossAnalysisUrl,
					encoder = this.getEncoder(lossConfig.bounds, config.bounds),
					rasterId = config.rasterRemap ? config.rasterRemap : config.rasterId,
					renderingRule = useSimpleRule ? 
							encoder.getSimpleRule(lossConfig.rasterId, rasterId) :
							encoder.render(lossConfig.rasterId, rasterId),
					self = this,
					content;

			content = {
				geometryType: 'esriGeometryPolygon',
				geometry: JSON.stringify(graphic.geometry),
				renderingRule: renderingRule,
				pixelSize: (graphic.geometry.rings.length > 45 ? 500 : 100),
				f: 'json'
			};

			function success(results) {
				deferred.resolve(true);
				if (results.histograms.length > 0) {
					Renderer.formatTreeCoverData(results.histograms[0].counts, content.pixelSize, config, encoder, useSimpleRule, printOptions);
				} else {
					Renderer.renderUnavailable(printOptions);
				}
			}

			function failure(error) {
				if (error.details) {
        	if (error.details[0] === 'The requested image exceeds the size limit.' && content.pixelSize !== 500) {
          	content.pixelSize = 500;
            self.computeHistogram(url, content, success, failure);
          } else {
          	deferred.resolve(false);
          }
        } else {
        	deferred.resolve(false);
         }
			}

			this.computeHistogram(url, content, success, failure);
			return deferred.promise;
		},

		/**
		* Main analysis function to cross layers and geometry with total tree cover loss
		* @param {object} config - basic settings and info necessary to perform analysis
		* @param {object} graphic - Esri Graphic Object
		* @param {boolean} useSimpleRule - whether or not to use the simple version of the rendering rule 
		* @param {object} printOptions - additional options needed to use this from the print report
		* @return {object} returns a promise
		*/
		clearanceAlertAnalysis: function (config, graphic, useSimpleRule, printOptions) {
			var deferred = new Deferred(),
					clearanceConfig = analysisConfig.clearanceAlerts,
					url = analysisConfig.clearanceAlertAnalysisUrl,
          self = this,
          renderingRule,
          rasterId,
          content,
          encoder;
			

			function success() {
				console.log('Success');
				deferred.resolve(true);
			}

			function failure() {
				console.log('Failure');
				deferred.resolve(true);
			}

			/**
      * Some layers have special ids that need to be overwritten from the config becuase
      * the config powers multiple charts and the clearance alerts analysis is the only one that
      * uses a different value, if more layers need this, give them a 'formaId' in tools/ToolsConfig
      */
      if (config.formaId) {
          config.rasterId = config.formaId;
          if (config.includeFormaIdInRemap) {
              config.rasterRemap.rasterFunctionArguments.Raster = config.formaId;
          }
      }

      encoder = this.getEncoder(Model.clearanceAlertBounds(), config.bounds);
      rasterId = config.rasterRemap ? config.rasterRemap : config.rasterId;
      renderingRule = useSimpleRule ? 
      		encoder.getSimpleRule(clearanceConfig.rasterId, rasterId) :
      		encoder.render(clearanceConfig.rasterId, rasterId);
      content = {
      	geometryType: 'esriGeometryPolygon',
        geometry: JSON.stringify(graphic.geometry),
        renderingRule: renderingRule,
        pixelSize: 500, // FORMA data has a pixel size of 500 so this must be 500 otherwise results will be off
        f: 'json'
      };

			this.computeHistogram(url, content, success, failure);
			return deferred.promise;
		},

		/**
		* Simple Wrapper function for compute histogram
		* @param {string} url
		* @param {object} content - content to use with the request
		* @param {function} callback - success callback
		* @param {function} errback
		*/
		computeHistogram: function (url, content, callback, errback) {
			var req = esriRequest({
				url: url + '/computeHistograms',
				content: content,
				handleAs: 'json',
				callbackParamName: 'callback',
				timeout: 60000
			}, {usePost: true});
			req.then(callback, errback);
		},

		/**
		* Helper function to generate a encoding function that generates a rendering rule, and can 
		* encode and decode input and output values in the histograms array to help pull the correct values
		* out when the histograms array is received based on the bounds provided
		* @param {array} arrayA - a layers bounds for it's raster ids in array format
		* @param {array} arrayB - a layers bounds for it's raster ids in array format
		* @param {object} options - Any additional options, here from previous version but not currently used 
		* @return {object} Object containing several helper functions
		*/
		getEncoder: function(arrayA, arrayB, options) {
      var self = this;
      return {
        A: self.fromBounds(arrayA),
        B: self.fromBounds(arrayB),
        getSimpleRule: function(id1, id2) {
          return JSON.stringify({
            'rasterFunction': 'Arithmetic',
            'rasterFunctionArguments': {
              'Raster': id1,
              'Raster2': id2,
              'Operation': 3
            }
          });
        },
        renderRule: function(id1, id2) {
          return {
            'rasterFunction': 'Arithmetic',
            'rasterFunctionArguments': {
              'Raster': {
                'rasterFunction': 'Arithmetic',
                'rasterFunctionArguments': {
                  'Raster': {
                    'rasterFunction': 'Remap',
                    'rasterFunctionArguments': {
                      'InputRanges': [this.A[0], (this.A[this.A.length - 1]) + 1],
                      'OutputValues': [this.B.length],
                      'Raster': id1,
                      'AllowUnmatched': false
                    }
                  },
                  'Raster2': id1,
                  'Operation': 3
                }
              },
              'Raster2': id2,
              'Operation': 1
            }
          };
        },
        render: function(id1, id2) {
          return JSON.stringify(this.renderRule(id1, id2));
        },
        encode: function(a, b) {
          // Get Unique Value for Two Input Values
          return this.B.length * a + b;
        },
        decode: function(value) {
          // Ge the input values back from a known output value
          var b = value % this.B.length;
          var a = (value - b) / this.B.length;
          return [a, b];
        }
      };
    },

    /**
    * Helper function to calculate bounds from an array with two values, inclusive
    * Example: fromBounds([1,5]) -> [1,2,3,4,5]
    * @param {array} arr - Array with two values from which we want a full bounds array
    * @return {array} - Array representing the bounds
    */
    fromBounds: function (arr) {
    	if (arr.length !== 2) { 
    		return arr; 
    	}
    	var result = [], index = arr[0], length = arr[1];
    	for (index; index <= length; index++) {
    		result.push(index);
    	}
    	return result;
    },

    /**
    * @param {string} message
    */
    debug: function (message) {
    	console.log(message);
    }

	};

	return Fetcher;

});