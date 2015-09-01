define([
	"esri/urlUtils",
	"dojo/Deferred",
	"dojo/promise/all",
	"esri/arcgis/utils",
	"dojo/_base/array",
	"res/Resources"
], function (urlUtils, Deferred, all, arcgisUtils, arrayUtils, Resources) {
	"use strict";
	return {

		getApplicationInformation: function () {

			var deferred = new Deferred();
			var urlParams = urlUtils.urlToObject(location.href);
			var appid = urlParams && urlParams.query && urlParams.query.appid;

			if (!appid) {
				// If there is no app id, just show the application defaults and don"t query agol for information
				deferred.reject(new Error("There is no application configuration imformation."));
				return deferred;
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
					commonConfig.appLanguages = {};

					// Make sure we have a default language set up, should be in Resources.js but just in case, use en as backup
					if (!values.defaultLanguage) {
						values.defaultLanguage = Resources.defaultLanguage || "en";
					}

					commonConfig.appLanguages[values.defaultLanguage] = {
						"title": values.defaultTitle,
						"flagTitle": values.flagTitle,
						"default": true
					};
					// Add Additional Languages if configured to
					// The default is french, or fr, so test for a valid value first and then use fr if necessary
					commonConfig.useAdditionalLanguage = values.useAdditionalLanguage;

					if (commonConfig.useAdditionalLanguage) {
						language = values.secondLanguage || "fr";
						commonConfig.appLanguages[language] = {
							"title": values.secondLanguageTitle,
							"flagTitle": values.secondLanguageFlagTitle
						};
					}

					commonConfig.layersToHide = values.layersToHide ? values.layersToHide.split(",").map(function(layer) { return parseInt(layer); }) : [];
					commonConfig.maskMapUrl = values.maskMapUrl;
					commonConfig.webMapID = values.webmap;

					// If these values are not present, then set them to undefined so they can be overwritten by the defaults in index.htm
					commonConfig.countryFlagRight = (values.countryFlagRight !== undefined ? values.countryFlagRight + "px" : undefined);
					// Should be countryFlagRight - 20
					commonConfig.countryTextWidth = (values.countryTextWidth !== undefined ? values.countryTextWidth + "px" : (values.countryFlagRight ? (values.countryFlagRight - 20) + "px" : undefined));
					commonConfig.flagPath = values.flagPath;
					commonConfig.flagLinkPath = values.flagLinkPath;

					commonConfig.pdfURL = values.pdfURL;
					commonConfig.aboutLinkUrl = values.aboutLinkUrl;
					commonConfig.downloadDataUrl = values.downloadDataUrl;
					commonConfig.printURL = values.printURL;

					// Layers to Turn On/Off
					commonConfig.activeFiresIncluded = values.activeFiresIncluded === undefined ? true : values.activeFiresIncluded;
					commonConfig.landCoverIncluded = values.landCoverIncluded === undefined ? true : values.landCoverIncluded;
					commonConfig.biomassIncluded = values.biomassIncluded === undefined ? true : values.biomassIncluded;
					commonConfig.iflIncluded = values.iflIncluded === undefined ? true : values.iflIncluded;

					// Document Related Urls
					commonConfig.documentDirectory = values.documentDirectory;
					commonConfig.documentMapserver = values.documentMapserver;

					// Map Theme Options
					// Only set this value if the configuration options are matching and correct, else set it to an empty array
					var themeNames = values.mapThemes && values.mapThemes.split(",") || [];
					var themeNamesAlternates = values.mapThemesAlternate && values.mapThemesAlternate.split(",") || [];
					var themeIds = values.mapThemeIds && values.mapThemeIds.split(",") || [];
					var themes = [];
					var alternateThemes = [];

					if (themeNames.length === themeIds.length && themeNames.length > 0) {
						arrayUtils.forEach(themeNames, function (theme, index) {
							themes.push({
								label: theme,
								value: "http://wri.github.io/forest_atlas_template/?appid=" + themeIds[index].replace(" ", "")
							});
						});
					}

					if (themeNamesAlternates.length === themeIds.length && themeNamesAlternates.length > 0) {
						arrayUtils.forEach(themeNamesAlternates, function (theme, index) {
							alternateThemes.push({
								label: theme,
								value: "http://wri.github.io/forest_atlas_template/?appid=" + themeIds[index].replace(" ", "")
							});
						});
					}

					commonConfig.mapThemes = themes;
					commonConfig.mapThemesAlternate = alternateThemes;

					// Other Values not configurable, set them to undefined as they will get pulled from resources later
					commonConfig.geometryServiceURL = undefined;
					commonConfig.basemap = undefined;
					commonConfig.defaultLayerTransparency = undefined;

				}

				deferred.resolve(commonConfig);
			}, function () {
				deferred.reject(new Error("Unable to retrieve application configuration imformation."));
			});

			return deferred;

		}

	};

});
