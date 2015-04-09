{
  "configurationSettings": [
    {
      "category": "General Settings",
      "fields": [

      	{
      		"type": "string",
      		"fieldName": "country",
      		"label": "Three Digit Country ISO Code:",
      		"tooltip": "Enter a three digit ISO code representing the country you will be focusing on."
      	},
      	{
      		"type": "string",
      		"fieldName": "englishTitle",
      		"label": "English Title:",
      		"tooltip": "Choose a title for your app in english."
      	},
      	{
      		"type": "string",
      		"fieldName": "flagTitle",
      		"label": "Choose text to go near the flag:",
      		"tooltip": "Choose the text content you want to go to the right of the flag."
      	},

      	{
      		"type": "options",
      		"fieldName": "appLanguages",
      		"tooltip": "Choose an alternate language to have available in the application.",
      		"label": "Additional Language:",
      		"value": "fr",
      		"options": [
      			{ "label": "French", "value": "fr" },
      			{ "label": "Spanish", "value": "es" }
      		]
      	},

      	{
      		"type": "string",
      		"fieldName": "languageTitle",
      		"label": "Alternate language title:",
      		"tooltip": "Choose the title for the application in the alternate language"
      	},
      	{
      		"type": "string",
      		"fieldName": "languageFlagTitle",
      		"label": "Choose text in the alternate language to go near the flag:",
      		"tooltip": "Choose the text content in the alternate language you want to go to the right of the flag."
      	},
      	{
      		"type": "string",
      		"fieldName": "layersToShow",
      		"label": "Choose the default layers to show:",
      		"tooltip": "Should be a comma separated string of layer numbers you want visible by default.",
      		"placeholder": "Ex.  0,1,2,3,6,9,12,13,14"
      	},
      	{
      		"type": "string",
      		"fieldName": "downloadAll",
      		"label": "Download Data URL:",
      		"tooltip": "URL that links a zip file so the user can download data."
      	},

      	{
      		"type": "string",
      		"fieldName": "maskMapUrl",
      		"label": "URL for Mask Layer",
      		"tooltip": "This is a url for a mask layer to hide the other countries but show the country of focus.",
      		"placeholder": "Ex. http://gis-forest-atlas.wri.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer"
      	},

      	{
      		"type": "number",
      		"fieldName": "countryFlagRight",
      		"label": "Flag position from right in (pixels)",
      		"tooltip": "Enter the approximate location of the flag in pixels",
      		"value": "280"
      	},
      	{
      		"type": "number",
      		"fieldName": "countryTextWidth",
      		"label": "Choose width of text to the right of the flag(pixels), should be 20 less then above.",
      		"tooltip": "Enter the approximate width of the text in pixels",
      		"value": "260"
      	},
      	{
      		"type": "string",
      		"fieldName": "flagPath",
      		"label": "URL to flag:",
      		"tooltip": "Enter the url of the flag you want to show in the application"
      	},
      	{
      		"type": "string",
      		"fieldName": "flagLinkPath",
      		"label": "URL to redirect to when the flag is clicked:",
      		"tooltip": "URL to take the user to when they click the flag"
      	},
      	{
      		"type": "string",
      		"fieldName": "pdfURL",
      		"label": "Legislative Text:",
      		"tooltip": "PDF to be downloaded when user clicks on Legislative Text"
      	},
      	{
      		"type": "string",
      		"fieldName": "aboutLinkUrl",
      		"label": "About Link:",
      		"tooltip": "URL for the about link."
      	},
      	{
      		"type": "string",
      		"fieldName": "printURL",
      		"label": "Print Service Url:",
      		"tooltip": "URL for a valid print service this application will need to connect to"
      	},
      	{
      		"type": "string",
      		"fieldName": "dataDownloadURL",
      		"label": "Download Data Url:",
      		"tooltip": "Shapefile URL "
      	}

      ]
    }
  ]
}