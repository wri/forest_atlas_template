define([
	"esri/urlUtils",
	"dojo/Deferred",
	"dojo/promise/all",
	"esri/arcgis/utils",
	"dojo/_base/array",
	"res/Resources"
], function (urlUtils, Deferred, all, arcgisUtils, arrayUtils, Resources) {
	"use strict";

	/**
	* Check is the restoration options are valid
	*/
	var checkRestorationOptions = function checkRestorationOptions (option) {
		return option !== '' && option !== undefined && option.split(',').length === 2;
	};

	var mapRestorationOptionsToConfig = function mapRestorationOptionsToConfig (option) {
		var data = options.split(',');
		return {
			label: data[0],
			id: data[1].replace(/ /g, '')
		};
	};

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
					additionalLanguageConfig,
					defaultLanguageConfig,
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

					// export the default language
					commonConfig.defaultLanguage = values.defaultLanguage;

					// Possible Defaults in case none are provided
					defaultLanguageConfig = Resources.appLanguages && Resources.appLanguages[values.defaultLanguage];

					commonConfig.appLanguages[values.defaultLanguage] = {
						"title": values.defaultTitle || (defaultLanguageConfig && defaultLanguageConfig.title) || "",
						"flagTitle": values.flagTitle || (defaultLanguageConfig && defaultLanguageConfig.flagTitle) || "",
						"default": true
					};
					// Add Additional Languages if configured to
					// The default is french, or fr, so test for a valid value first and then use fr if necessary
					commonConfig.useAdditionalLanguage = values.useAdditionalLanguage;

					if (commonConfig.useAdditionalLanguage) {
						language = values.secondLanguage || "fr";
						additionalLanguageConfig = Resources.appLanguages && Resources.appLanguages[language];
						commonConfig.appLanguages[language] = {
							"title": values.secondLanguageTitle || (additionalLanguageConfig && additionalLanguageConfig.title) || "",
							"flagTitle": values.secondLanguageFlagTitle || (additionalLanguageConfig && additionalLanguageConfig.flagTitle) || ""
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
					commonConfig.excludeDocumentsTab = values.excludeDocumentsTab;
					commonConfig.documentDirectory = values.documentDirectory;
					commonConfig.documentMapserver = values.documentMapserver;

					// Restoration Module Options
					commonConfig.restorationModule = values.restorationModule || false;
					commonConfig.restorationImageServer = values.restorationImageServer;

					// Create an easy to read array for the app from the configured values
					commonConfig.restorationModuleOptions = [];

					if (checkRestorationOptions(values.restorationModuleOption1)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption1));
					}

					if (checkRestorationOptions(values.restorationModuleOption2)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption2));
					}

					if (checkRestorationOptions(values.restorationModuleOption3)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption3));
					}

					if (checkRestorationOptions(values.restorationModuleOption4)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption4));
					}

					if (checkRestorationOptions(values.restorationModuleOption5)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption5));
					}

					if (checkRestorationOptions(values.restorationModuleOption6)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption6));
					}

					if (checkRestorationOptions(values.restorationModuleOption7)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption7));
					}

					if (checkRestorationOptions(values.restorationModuleOption8)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption8));
					}

					if (checkRestorationOptions(values.restorationModuleOption9)) {
						commonConfig.restorationModuleOptions.push(mapRestorationOptionsToConfig(values.restorationModuleOption9));
					}

					if (values.slopeAnalysisRestorationOptions) {
						commonConfig.slopeAnalysisRestorationOptions = values.slopeAnalysisRestorationOptions.split(',');
					} else {
						commonConfig.slopeAnalysisRestorationOptions = [];
					}

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
					commonConfig.basemap = undefined;
					commonConfig.geometryServiceURL = undefined;
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
