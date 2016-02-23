define([
	'toolsmodel',
	'dojo/dom-class',
	'dojo/promise/all',
	'atlas/tools/Fetcher',
	'root/analysis/restoration-analysis'
], function ( Model, domClass, all, Fetcher, Restoration) {
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
		* @param {object} options - additional options for the analysis
		*/
		getResultsForType: function (type, graphic, options) {
			this.debug('Results >>> getResultsForType');

			var viewModel = Model.getVM();

			// Show the loader by removing the class hiding it
			domClass.remove('analysis-loader', 'hidden');

			if (viewModel.restorationModule()) {
				// Hide the tree cover density tool if were in Resotration Analysis, otherwise make sure its visible
				// Also hide the Slope options select, it will reshow itself in Restoration.performRestorationAnalysis();
				var tcdToolNode = document.querySelector('.analysis-selection-types .tcd-selector-wrapper');
				var slopeSelectNode = document.querySelector('.analysis-selection-types .slope-select');
				domClass.add(slopeSelectNode, 'hidden');
				if (type === viewModel.restorationModuleType()) {
					domClass.add(tcdToolNode, 'hidden');
				} else {
					domClass.remove(tcdToolNode, 'hidden');
				}
			}

			switch (type) {
				case viewModel.analysisLoss():
					this.getTotalLoss(graphic);
          ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Tree cover loss in hectares.');
				break;
				case viewModel.analysisGain():
					this.getTotalGainAndLoss(graphic);
          ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Tree cover gain in hectares.');
				break;
				case viewModel.analysisLC():
					this.getLandCover(graphic);
          ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Tree cover loss(in hectares) on Land Cover.');
				break;
				// case viewModel.analysisTCD():
				// 	this.getTreeCoverDensity(graphic);
        //   ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Tree cover loss(in hectares) on Above Ground Biomass.');
				// break;
				case viewModel.analysisIFL():
					this.getIntactForest(graphic);
          ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Tree cover loss(in hectares) on Tree Cover Density.');
				break;
				case viewModel.analysisCS():
					this.getCarbonStock(graphic);
          ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Tree cover loss(in hectares) on Intact Forest.');
				break;
				case viewModel.analysisFire():
					this.getFires(graphic);
          ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Active fires in the last 7 days.');
				break;
				case viewModel.analysisLCComposition():
					this.getLandCoverComposition(graphic);
          ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed Land Cover Composition.');
				break;
				case viewModel.restorationModuleType():
					Restoration.performRestorationAnalysis(graphic, options.rasterId);
					ga('A.send', 'event', 'Event', 'Analysis', 'User analyzed with the restoration module.');
				break
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
		getTotalGainAndLoss: function (graphic) {
			this.debug('Results >>> getTotalGain');
			Fetcher.getTotalGainAndLoss(graphic).then(function (res) {
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
