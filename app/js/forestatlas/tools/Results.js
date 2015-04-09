define([
	'toolsmodel',
	'dojo/dom-class',
	'atlas/tools/Fetcher'
], function ( Model, domClass, Fetcher) {
	'use strict';

	var Results = {

		/**
		* Simple logging function
		*/
		debug: function (msg) {
			console.log(msg);
		},	

		/**
		* Get Results for the provided type of analysis and graphic and render that into the Analysis Tab
		* @param {string} type - Type of analysis to be performed
		* @param {object} graphic - esri graphic, should be of type polygon
		*/
		getResultsForType: function (type, graphic) {
			this.debug('Results >>> getResultsForType');

			var viewModel = Model.getVM();

			// Show the loader by removing the class hiding it
			domClass.remove('analysis-loader', 'hidden');

			switch (type) {
				case viewModel.analysisLoss():
					this.getTotalLoss(graphic);
				break;
				case viewModel.analysisLC():
					this.getLandCover(graphic);
				break;
				case viewModel.analysisTCD():
					this.getTreeCoverDensity(graphic);
				break;
				case viewModel.analysisIFL():
					this.getIntactForest(graphic);
				break;
				case viewModel.analysisCS():
					this.getCarbonStock(graphic);
				break;
				case viewModel.analysisFire():
					this.getFires(graphic);
				break;
				case viewModel.analysisLCComposition():
					this.getLandCoverComposition(graphic);
				break;
			}

		},

		/**
		* Get Results for this data type
		* @param {object} graphic
		*/
		getTotalLoss: function (graphic) {
			this.debug('Results >>> getTotalLoss');
			Fetcher.getTotalLoss(graphic).then(function (res) {
				// Remove the loader by adding the class hiding it
				domClass.add('analysis-loader', 'hidden');
			});
		},

		/**
		* Get Results for this data type
		* @param {object} graphic
		*/
		getLandCover: function (graphic) {
			this.debug('Results >>> getLandCover');
			Fetcher.getLandCover(graphic).then(function (res) {
				// Remove the loader by adding the class hiding it
				domClass.add('analysis-loader', 'hidden');
			});
		},

		/**
		* Get Results for this data type
		* @param {object} graphic
		*/
		getTreeCoverDensity: function (graphic) {
			this.debug('Results >>> getTreeCoverDensity');
			Fetcher.getTreeCoverDensity(graphic).then(function (res) {
				// Remove the loader by adding the class hiding it
				domClass.add('analysis-loader', 'hidden');
			});
		},

		/**
		* Get Results for this data type
		* @param {object} graphic
		*/
		getIntactForest: function (graphic) {
			this.debug('Results >>> getIntactForest');
			Fetcher.getIntactForestLandscapes(graphic).then(function (res) {
				// Remove the loader by adding the class hiding it
				domClass.add('analysis-loader', 'hidden');
			});
		},

		/**
		* Get Results for this data type
		* @param {object} graphic
		*/
		getCarbonStock: function (graphic) {
			this.debug('Results >>> getCarbonStock');
			Fetcher.getCarbon(graphic).then(function (res) {
				// Remove the loader by adding the class hiding it
				domClass.add('analysis-loader', 'hidden');
			});
		},

		/**
		* Get Results for this data type
		* @param {object} graphic
		*/
		getFires: function (graphic) {
			this.debug('Results >>> getFires');
			Fetcher.getFires(graphic).then(function (res) {
				// Remove the loader by adding the class hiding it
				domClass.add('analysis-loader', 'hidden');
			});	
		},

		/**
		* Get Results for this data type
		* @param {object} graphic
		*/
		getLandCoverComposition: function (graphic) {
			this.debug('Results >>> getLandCoverComposition');
			Fetcher.getLandCoverComposition(graphic).then(function (res) {
				// Remove the loader by adding the class hiding it
				domClass.add('analysis-loader', 'hidden');
			});	
		}

	};

	return Results;

});