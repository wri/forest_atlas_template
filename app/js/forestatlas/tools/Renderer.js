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
					xMapValues = this.fromBounds(lossConfig.bounds),
					yMapValues = this.fromBounds(config.bounds),
					model = MainModel.getVM(),
					currentLang = model ? model.currentLanguage() : (printOptions ? printOptions.lang : 'en'),
					yAxisLabels = languages[currentLang].analysisChartLabels[config.labelKey],
					series = [],
					colors = [],
					location,
					data,
					i, j;

			function hasValidValues (value) {
				return value !== 0;
			}

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

					if (data.some(hasValidValues)) {
						series.push({
							'name': yAxisLabels[i],
							'data': data.map(mapFunction)
						});
						colors.push(config.colors[i]);
					}
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
					useHTML: true,
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
		* Specific Chart to show total Tree Cover loss by itself, not crossed with anything
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
					colors = landCoverConfig.colors,
					series = [],
					data = [],
					activeFeatureTitle,
					currentLang,
					chartId,
					labels,
					model,
					title;

			model = MainModel.getVM();
			currentLang = model ? model.currentLanguage() : (printOptions ? printOptions.lang : 'en');
			title = languages[currentLang].analysisLCComposition;
			titleNode = document.querySelector('#results-header .title');
			activeFeatureTitle = titleNode ? titleNode.innerHTML : '';
			labels = languages[currentLang].analysisChartLabels.landCover;

			if (pixelSize !== 100) {
				histograms = histograms.map(mapFunction);
			}

			histograms = histograms.slice(1);

			for (var i = 0, length = histograms.length; i < length; i++) {
				if (histograms[i] !== 0) {
					data.push([
						labels[i],
						histograms[i]
					]);
				}
			}

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
					useHTML: true,
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
					model = MainModel.getVM(),
					content = "",
					currentLang,
					chartId;

			currentLang = model ? model.currentLanguage() : (printOptions ? printOptions.lang : 'en');

			content += "<div id='analysis-chart'><section class='fire-badge'><div>" + languages[currentLang].analysisChartLabels.activeFires.start + "</div>";
			content += "<div class='fire-count'>" + (totalFires.length || 0) + "</div>";
			content += "<div class='fire-count'>" + languages[currentLang].analysisChartLabels.activeFires.active + "</div>";
			content += "<div>" + languages[currentLang].analysisChartLabels.activeFires.end + "</div></section></div>";

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
			var hrefValue = 'data:application/vnd.ms-excel;base64,',
					blobType = 'text/csv;charset=utf-8;',
					link = document.createElement('a'),
					filename = document.querySelector('.analysis-options-select').value + '.csv',
					blob;

			if (window.navigator.msSaveOrOpenBlob) {

				blob = this.base64toBlob(this.base64_encode(csvStringData), blobType);
				navigator.msSaveBlob(blob, filename);
				
			} else if (saveAs && !!new Blob) {
				// If the FileSaver is loaded from cdn correctly and is supported in this browser, use it
				blob = this.base64toBlob(this.base64_encode(csvStringData), blobType);
				saveAs(blob, filename);

			} else if (link.download === "") {

				link.href = hrefValue + this.base64_encode(csvStringData);
				link.target = '_blank';
				link.download = filename;
				link.click();

			} else {
				window.open(hrefValue + this.base64_encode(data));
			}
    },

    base64toBlob: function (base64Data, contentType) {
    	// Taken From: http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    	// Only works in 
		    contentType = contentType || '';
		    var sliceSize = 1024;
		    var byteCharacters = atob(base64Data);
		    var bytesLength = byteCharacters.length;
		    var slicesCount = Math.ceil(bytesLength / sliceSize);
		    var byteArrays = new Array(slicesCount);

		    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		        var begin = sliceIndex * sliceSize;
		        var end = Math.min(begin + sliceSize, bytesLength);

		        var bytes = new Array(end - begin);
		        var i = 0;
		        for (var offset = begin; offset < end; ++i, ++offset) {
		            bytes[i] = byteCharacters[offset].charCodeAt(0);
		        }
		        byteArrays[sliceIndex] = new Uint8Array(bytes);
		    }
		    return new Blob(byteArrays, { type: contentType });
		},

    base64_encode: function  (data) {
		  //  discuss at: http://phpjs.org/functions/base64_encode/
		  // original by: Tyler Akins (http://rumkin.com)
		  // improved by: Bayron Guevara
		  // improved by: Thunder.m
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		  // improved by: Rafał Kukawski (http://kukawski.pl)
		  // bugfixed by: Pellentesque Malesuada
		  //   example 1: base64_encode('Kevin van Zonneveld');
		  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
		  //   example 2: base64_encode('a');
		  //   returns 2: 'YQ=='

		  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		    ac = 0,
		    enc = '',
		    tmp_arr = [];

		  if (!data) {
		    return data;
		  }

		  do { // pack three octets into four hexets
		    o1 = data.charCodeAt(i++);
		    o2 = data.charCodeAt(i++);
		    o3 = data.charCodeAt(i++);

		    bits = o1 << 16 | o2 << 8 | o3;

		    h1 = bits >> 18 & 0x3f;
		    h2 = bits >> 12 & 0x3f;
		    h3 = bits >> 6 & 0x3f;
		    h4 = bits & 0x3f;

		    // use hexets to index into b64, and append result to encoded string
		    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		  } while (i < data.length);

		  enc = tmp_arr.join('');

		  var r = data.length % 3;

		  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
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