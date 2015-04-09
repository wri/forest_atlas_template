define([
	"mainmodel",
	"toolsconfig",
	"root/languages",
	"dojo/_base/array",
	"common/lib/highcharts"
], function (MainModel, ToolsConfig, languages, arrayUtils) {

	// Just in case the config is not initialized for some reason
	ToolsConfig.initialize();
	var toolsConfig = ToolsConfig.getConfig();
	var csvExportAdded = false;

	// Set Highcharts Defaults
	Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: 'Arial'
      }
    }
  });

	// Require exporting module
	require(["common/lib/exporting"]);

	return {

		/**
		* Takes raw data and formats it, then passes off to renderChart
		* In the event of no data being returned, that should be handled here
		* @param {array} histograms
		* @param {integer} pixelSize - pixel size used in the request, may have to adjust results based no this value
		* @param {object} config - config used in request
		* @param {object} encoder - used in request to encode values, will need it to parse response
		* @param {boolean} useSimpleRule - Tells me which rendering rule was used in the request 
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		formatTreeCoverData: function (histograms, pixelSize, config, encoder, useSimpleRule, printOptions) {
			
			var mapFunction = function (item) { return (item * pixelSize * pixelSize) / 10000; },
					lossConfig = toolsConfig.analysisConfig.totalLoss,
					xAxisLabels = lossConfig.labels, // Tree Cover Loss Labels
					yAxisLabels = config.labels, // Land Cover Labels
					xMapValues = this.fromBounds(lossConfig.bounds),
					yMapValues = this.fromBounds(config.bounds),
					series = [],
					colors = [],
					location,
					data,
					i, j;

			if (useSimpleRule) {
				series.push({
					'name': yAxisLabels[0],
					'data': histograms.slice(1).map(mapFunction)
				});
				colors.push(config.colors[0]);
			} else {

				for (i = 0; i < yMapValues.length; i++) {
					data = [];
					for (j = 0; j < xMapValues.length; j++) {
						location = encoder.encode(xMapValues[j], yMapValues[i]);
						data.push(histograms[location] || 0);
					}
					series.push({
						'name': yAxisLabels[i],
						'data': data.map(mapFunction)
					});
					colors.push(config.colors[i]);
				}

			}

			this.renderTreeCoverChart(config.titleKey, series, colors, xAxisLabels, yAxisLabels, printOptions);

		},

		/**
		* Takes data and labels and makes charts out of them
		* @param {string} titleKey - key to use in lookup of chart title
		* @param {object} data - series data for the chart consisting of name(label) and data(chart value)
		* @param {array} colors - array of colors for each entry in the chart
		* @param {array} xAxisLabels - array of labels for xAxis
		* @param {array} yAxisLabels - array of labels for yAxis
		* @param {object} printOptions - additional options needed to use this from the print report 
		*/
		renderTreeCoverChart: function (titleKey, data, colors, xAxisLabels, yAxisLabels, printOptions) {

			var activeFeatureTitle,
					currentLang,
					titleNode,
					chartId,
					model,
					title;

			model = MainModel.getVM();
			currentLang = model ? model.currentLanguage() : (printOptions ? printOptions.lang : 'en');
			title = languages[currentLang][titleKey];
			titleNode = document.querySelector('#results-header .title');
			activeFeatureTitle = this.cleanTitle(titleNode ? titleNode.innerHTML : '');



			chartId = "#" + (printOptions ? printOptions.container : "analysis-chart");

			// Charts will live in analysis-chart
			$(chartId).highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: null,
					type: 'bar'
				},
				exporting: {
					chartOptions: {
						title: {
							text: activeFeatureTitle + ' - ' + title
						}
					}
				},
				title: {
					text: title
				},
				xAxis: {
					categories: xAxisLabels,
					maxPadding: 0.5,
					title: {
						text: null
					}
				},
				yAxis: {
					stackLabels: {
						enabled: true
					},
					title: {
						text: null
					}
				},
				legend: {
					enabled: true,
					verticalAlign: 'bottom'
				},
				plotOptions: {
					series: {
						stacking: 'normal'
					}
				},
				series: data,
				colors: colors,
				credits: {
					enabled: false
				}
			});

			if (!csvExportAdded) {
				this.addCSVExportOption();
			}

		},

		/**
		*	@param {array} histograms - histogram data
		* @param {integer} pixelSize - pixelSize used in requests
		* @param {object} printOptions - additional options needed to use this from the print report 
		*/
		renderTotalLossData: function (histograms, pixelSize, printOptions) {

			var mapFunction = function (item) { return (item * pixelSize * pixelSize) / 10000; },
					lossConfig = toolsConfig.analysisConfig.totalLoss,
					labels = lossConfig.labels,
					series = [],
					activeFeatureTitle,
					currentLang,
					titleNode,
					chartId,
					model,
					title;

			if (pixelSize !== 100) {
				histograms = histograms.map(mapFunction);
			}

			model = MainModel.getVM();
			currentLang = model ? model.currentLanguage() : (printOptions ? printOptions.lang : 'en');
			title = languages[currentLang].analysisLossChartTitle;
			titleNode = document.querySelector('#results-header .title');
			activeFeatureTitle = this.cleanTitle(titleNode ? titleNode.innerHTML : '');

			chartId = "#" + (printOptions ? printOptions.container : "analysis-chart");

			series.push({
				name: title,
				data: histograms.slice(1)
			});

			$(chartId).highcharts({
				chart: {
          type: 'bar'
        },
        exporting: {
					chartOptions: {
						title: {
							text: activeFeatureTitle + ' - ' + title
						}
					}
				},
        title: {
        	useHTML: true,
          text: title
        },
				xAxis: {
					categories: labels,
					maxPadding: 0.5,
					title: {
						text: null
					}
				},
				yAxis: {
					title: {
						text: null
					}
				},
				series: series,
				colors: ["#cf5188"],
				credits: {
					enabled: false
				}
			});

			if (!csvExportAdded) {
				this.addCSVExportOption();
			}

		},

		/**
		*	@param {array} histograms - histogram data
		* @param {integer} pixelSize - pixelSize used in requests
		* @param {object} printOptions - additional options needed to use this from the print report 
		*/
		renderLandCoverComposition: function (histograms, pixelSize, printOptions) {
			var mapFunction = function (item) { return (item * pixelSize * pixelSize) / 10000; },
					landCoverConfig = toolsConfig.analysisConfig.landCover,
					labels = landCoverConfig.labels,
					colors = landCoverConfig.colors,
					series = [],
					data = [],
					activeFeatureTitle,
					currentLang,
					chartId,
					model,
					title;

			if (pixelSize !== 100) {
				histograms = histograms.map(mapFunction);
			}

			histograms = histograms.slice(1);

			for (var i = 0, length = histograms.length; i < length; i++) {
				data.push([
					labels[i],
					histograms[i]
				]);
			}

			model = MainModel.getVM();
			currentLang = model ? model.currentLanguage() : (printOptions ? printOptions.lang : 'en');
			title = languages[currentLang].analysisLCComposition;
			titleNode = document.querySelector('#results-header .title');
			activeFeatureTitle = titleNode ? titleNode.innerHTML : '';

			chartId = "#" + (printOptions ? printOptions.container : "analysis-chart");

			series.push({
				type: 'pie',
				name: title,
				data: data
			});

			$(chartId).highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				exporting: {
					chartOptions: {
						title: {
							text: title
						}
					}
				},
				title: {
					text: (!activeFeatureTitle ? title: null)
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						showInLegend: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						}
					}
				},
				colors: colors,
				series: series,
				credits: {
					enabled: false
				}
			});

			if (!csvExportAdded) {
				this.addCSVExportOption();
			}

		},

		/**
		* Render fire data as a badge
		* @param {array} queryResults - array of results that should contain features representing fires
		* @param {object} printOptions - additional options needed to use this from the print report
		*/
		renderFireData: function (results, printOptions) {
			// var totalFires = results[0].features.concat(results[1].features),
			var	totalFires = results[0].features,
					content = "",
					chartId;			

			content += "<div id='analysis-chart'><section class='fire-badge'><div>There are</div>";
			content += "<div class='fire-count'>" + (totalFires.length || 0) + "</div>";
			content += "<div class='fire-count'>active fires</div>";
			content += "<div>in the last 7 days.</div></section></div>";

			// This content must be replaced completely which is why the content contains a div with 
			// the same id, highcharts redraws charts on window resize even if I replace innerHTML
			chartId = "#" + (printOptions ? printOptions.container : "analysis-chart");

			$(chartId).replaceWith(content);
		},

		/**
		* Resulting histograms do not contain any data, show badge marking this data as not available
		* @param {object} printOptions (optional) - additional options needed to use this from the print report
		*/
		renderUnavailable: function (printOptions) {
			var content = "<div id='analysis-chart'><section class='unavailable-badge'>",
					chartId;

			content += "<div>There is no data for this category in this area.</div>";
			content += "</section></div>";

			chartId = "#" + (printOptions ? printOptions.container : "analysis-chart");
			$("#analysis-chart").replaceWith(content);
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
    * Add Option to Export CSV's to Highcharts
    * I need to add a callback to the function and need to not mess with the context
    * otherwise prepareCSV will not receive the correct context, callback is defined below
    * and after formatting data, passes it on to be downloaded

		* prepareCSV function
		* this represents individual chart object
		* function then formats the chart information into a csv file and passes it on
    */
    addCSVExportOption: function () {

    	if (csvExportAdded) {
    		return;
    	}

    	var self = this;
    	csvExportAdded = true;

    	function prepareCSV () {
    		// This is the context of the specific chart the user is on
    		var featureName = document.querySelector('#results-header .title').innerHTML,
						type = this.options.chart.type,
						title = self.cleanTitle(featureName) + ' - ',
    				series = this.series,
    				csvStrings = [],
    				headers = [],
    				values = [],
    				finalOutput;

    		// 1) Push in title
    		// 2) Add the headers and then add them to the CSV Strings array
				// 3) Start formatting the values

    		if (type === "pie") {

    			title += series[0].name;
    			csvStrings.push(title + '\r\n');

    			headers = ['category', 'value'];
    			csvStrings.push(headers.join(','));

    			arrayUtils.forEach(series[0].data, function (item) {
    				csvStrings.push(item.name + ',' + item.y);
    			});

    			finalOutput = csvStrings.join('\r\n');

    		} else {

    			title += this.title.textStr;
    			csvStrings.push(title);

    			headers = arrayUtils.map(series, function (serie) { return serie.name; });
    			headers.unshift('year');
    			csvStrings.push(headers.join(','));

    			arrayUtils.forEach(this.xAxis[0].categories, function (xAxisLabel, index) {
    				values.push(xAxisLabel);
    				arrayUtils.forEach(series, function (serie) {
    					values.push(serie.yData[index]);
    				});
    				csvStrings.push(values.join(','));
    				values = [];
    			});

    			finalOutput = csvStrings.join('\r\n');

    		}

    		if (finalOutput) {
    			self.downloadCSV(finalOutput);
    		}

    	}

    	Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
			    text: 'Download CSV file',
			    onclick: prepareCSV
			});

    },

    /**
    * @param {string} csvStringData - Properly formatted string to export csv content
    * string should have comma separated rows and each row separated with \r\n
    */
    downloadCSV: function (csvStringData) {
    	// Generate the desired output
			// Try the provided methods first as they will allow the file to be named
			// worst case, use the final option
			var hrefValue = 'data:application/csv;charset=utf-8,',
					blobType = 'text/csv;charset=latin;',
					link = document.createElement('a'),
					data = encodeURI(csvStringData),
					filename = 'data.csv',
					blob;


			// If the FileSaver is loaded from cdn correctly and is supported in this browser, use it
			if (saveAs && !!new Blob) {

				blob = new Blob(["\uFEFF" + csvStringData], {
					type: blobType
				});
				saveAs(blob, filename);

			// These options should not be needed as they are probably part of the FileSaver code itself
			// } else if (link.download !== "") {

			// 	link.href = hrefValue + encodeURIComponent(csvStringData);
			// 	link.target = '_blank';
			// 	link.download = filename;
			// 	link.click();

			// } else if (window.navigator.msSaveOrOpenBlob) {

			// 	blob = new Blob([decodeURIComponent(data)], {
			// 		type: blobType
			// 	});
			// 	navigator.msSaveBlob(blob, filename);

			} else {

				window.open(hrefValue + data);

			}
    },

    /**
    * Takes a title like "MyFeature (1 of 3)" and returns "MyFeature"
    * Also handles titles like "My (cool) feature (1 of 3)" 
    *				and turns them into "My (cool) feature"
    * @param {string} title - title to manipulate
    * @return {string} returns newly formatted title or original title if it does not need formatting
    */
    cleanTitle: function (title) {
    	var regex = /\(([^()]+)\)/g,
    			match;

      while ((match = regex.exec(title)) !== null) {
          if (match[0].indexOf('1 of') > -1) {
              title = title.slice(0, match.index);
          }
      }

      return title;
    }

	};

});