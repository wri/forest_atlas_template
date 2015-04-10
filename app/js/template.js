define([
	'esri/urlUtils',
	'dojo/Deferred', 
	'dojo/promise/all', 
	'esri/arcgis/utils'
], function (urlUtils, Deferred, all, arcgisUtils) {

	return {

		getApplicationInformation: function () {

			var deferred = new Deferred();
			var urlParams = urlUtils.urlToObject(location.href);
			var appid = urlParams && urlParams.query && urlParams.query.appid;

			if (!appid) {
				// If there is no app id, just show the application defaults and don't query agol for information
				deferred.reject(new Error("There is no application configuration imformation."));
				return deferred.promise;
			}

			arcgisUtils.getItem(appid).then(function (res) {
				// Pull All Relevant Config Values Here
				var commonConfig = {},
					values = res.itemData && res.itemData.values;

				if (values) {
					// Country Code
					commonConfig.country = values.country;
					// appLanguages
					// Add Default language with some default values
					commonConfig.appLanguages = {
						"en": {
							"title": values.englishTitle,
							"flagTitle": values.flagTitle
						}
					};
					// Add Additional Languages
					commonConfig.appLanguages[values.appLanguages] = {
						"title": values.languageTitle,
						"flagTitle": values.languageFlagTitle
					};

					commonConfig.layersToShow = values.layersToShow && values.layersToShow.split(",").map(function(layer) { return parseInt(layer); });
					commonConfig.downloadAll = values.downloadAll;
					commonConfig.maskMapUrl = values.maskMapUrl;
					commonConfig.webMapID = values.webmap;

					commonConfig.countryFlagRight = values.countryFlagRight + "px";
					commonConfig.countryTextWidth = values.countryTextWidth + "px";
					commonConfig.flagPath = values.flagPath;
					commonConfig.flagLinkPath = values.flagLinkPath;

					commonConfig.pdfURL = values.pdfURL;
					commonConfig.aboutLinkUrl = values.aboutLinkUrl;
					commonConfig.printURL = values.printURL;
					commonConfig.dataDownloadURL = values.dataDownloadURL;

					// Other Values not configurable, set them to undefined as they will get pulled from resources later
					commonConfig.geometryServiceURL = undefined;
					commonConfig.basemap = undefined;
					commonConfig.defaultLayerTransparency = undefined;

				}

				deferred.resolve(commonConfig);
			}, function (error) {
				deferred.reject(new Error("Unable to retrieve application configuration imformation."));
			});

			return deferred.promise;

		}

	};

});