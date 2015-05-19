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
					values = res.itemData && res.itemData.values,
					language;

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
					// The default is french, or fr, so test for a valid value first and then use fr if necessary
					language = ((values.appLanguages !== undefined && values.appLanguages !== '') ? values.appLanguages : 'fr');
					commonConfig.appLanguages[language] = {
						"title": values.languageTitle,
						"flagTitle": values.languageFlagTitle
					};

					commonConfig.layersToShow = values.layersToShow && values.layersToShow.split(",").map(function(layer) { return parseInt(layer); });
					commonConfig.downloadAll = values.downloadAll;
					commonConfig.maskMapUrl = values.maskMapUrl;
					commonConfig.webMapID = values.webmap;

					// If these values are not present, then set them to undefined so they can be overwritten by the defaults in index.htm
					commonConfig.countryFlagRight = (values.countryFlagRight !== undefined ? values.countryFlagRight + "px" : undefined);
					commonConfig.countryTextWidth = (values.countryTextWidth !== undefined ? values.countryTextWidth + "px" : undefined);
					commonConfig.flagPath = values.flagPath;
					commonConfig.flagLinkPath = values.flagLinkPath;

					commonConfig.pdfURL = values.pdfURL;
					commonConfig.aboutLinkUrl = values.aboutLinkUrl;
					commonConfig.downloadDataUrl = values.downloadDataUrl;
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