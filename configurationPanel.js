{
    "configurationSettings": [
        {
            "category": "General Settings",
            "fields": [
                {
                    "type": "webmap"
                },
                {
                    "type": "string",
                    "fieldName": "country",
                    "label": "Three Digit Country ISO Code:",
                    "tooltip": "Enter the three digit ISO code representing your country of interest."
                },
                {
                    "type": "options",
                    "fieldName": "appLanguages",
                    "tooltip": "Choose an alternative language other than English for the application.",
                    "label": "Alternative language:",
                    "value": "fr",
                    "options": [
                        {
                            "label": "French",
                            "value": "fr"
                        },
                        {
                            "label": "Spanish",
                            "value": "es"
                        }
                    ]
                },
                {
                    "type": "boolean",
                    "fieldName": "englishIsDefault",
                    "label": "Set English as the default language",
                    "tooltip": "Check this if you want english as the default language, if not uncheck this"
                },
                {
                    "type": "string",
                    "fieldName": "englishTitle",
                    "label": "English title:",
                    "tooltip": "Enter the title of the application in English."
                },
                {
                    "type": "string",
                    "fieldName": "languageTitle",
                    "label": "Alternate language title:",
                    "tooltip": "Choose the title for the application in the alternate language."
                },
                {
                    "type": "string",
                    "fieldName": "layersToShow",
                    "label": "Layers that should appear by default:",
                    "tooltip": "Enter the layers you want visible by default as a comma separated string of layer numbers. ",
                    "placeholder": "Ex.  0,1,2,3,6,9,12,13,14"
                },
                {
                    "type": "string",
                    "fieldName": "maskMapUrl",
                    "label": "URL for Mask Layer",
                    "tooltip": "This is a url for a mask layer to hide the other countries but show the country of focus.",
                    "placeholder": "Ex. http://gis-forest-atlas.wri.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer"
                },
                {
                    "type": "string",
                    "fieldName": "flagTitle",
                    "label": "Flag text - English:",
                    "tooltip": "Enter the text that should appear to the right of the flag."
                },
                {
                    "type": "string",
                    "fieldName": "languageFlagTitle",
                    "label": "Flag text - Alternate:",
                    "tooltip": "Enter the text that should appear to the right of the flag in the alternate language."
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
                    "fieldName": "documentDirectory",
                    "label": "Document directory:",
                    "tooltip": "This is the root directory where all the documents available from the map service below are hosted."
                },
                {
                    "type": "string",
                    "fieldName": "documentMapserver",
                    "label": "Document MapService:",
                    "tooltip": "Map Service that contains filenames of documents(pdfs) relative to the document directory.  It should have a url field that contains the name of the PDF."
                },
                {
                    "type": "string",
                    "fieldName": "pdfURL",
                    "label": "Legislative Text:",
                    "tooltip": "Link to directory of pdfs for download when user clicks on Legislative Text"
                },
                {
                    "type": "string",
                    "fieldName": "aboutLinkUrl",
                    "label": "About Link:",
                    "tooltip": "URL for the about link."
                },
                {
                    "type": "string",
                    "fieldName": "downloadDataUrl",
                    "label": "Open Data portal URL:",
                    "tooltip": "URL to your Open Data Portal."
                },
                {
                    "type": "string",
                    "fieldName": "printURL",
                    "label": "Print Service Url:",
                    "tooltip": "URL for a valid print service this application will need to connect to"
                },
                {
                    "type": "paragraph",
                    "value": "The following map themes are a way we can link this Forest Atlas to other Forest Atlases.  The two fields need to be in sync with each other.  The first input is a comma separated list of names of the Atlases and the second input is a comma separated list of Application ID's.  For example, if the names are listed like so: Forest Atlas of Cameroon, Forest Atlas of Gabon.  Then the ID's should be listed in the same order.  So: {appid for Cameroon}, {appid for Gabon}."
                },
                {
                    "type": "string",
                    "fieldName": "mapThemes",
                    "label": "Names of Map Themes:",
                    "tooltip": "Comma spearated list of names of the various Map Themes you want to link to in your application."
                },
                {
                    "type": "string",
                    "fieldName": "mapThemesAlternate",
                    "label": "Names of Map Themes in your alternate language:",
                    "tooltip": "Same names as above but in the alternate language you have chosen."
                },
                {
                    "type": "string",
                    "fieldName": "mapThemeIds",
                    "label": "Application ID's for Map Themes:",
                    "tooltip": "Comma spearated list of Application ID's for the above Map Themes."
                }
            ]
        }
    ],
    "values": {
        "appLanguages": "fr",
        "countryFlagRight": "280",
        "countryTextWidth": "260"
    }
}

/* New Configuration Panel Settings *
{
  "configurationSettings": [
    {
      "category": "General Settings",
      "fields": [
        {"type": "webmap"},
        {
            "type": "string",
            "fieldName": "country",
            "label": "3-Digit Country ISO Code:",
            "tooltip": "Enter the 3-digit ISO code representing your country of interest."
        },
        {
            "type": "string",
            "fieldName": "layersToShow",
            "label": "Default visible layers:",
            "tooltip": "Enter the layers you want visible by default as a comma separated string of layer numbers.",
            "placeholder": "Ex.  0,1,2,3,6,9,12,13,14"
        },
        {
            "type": "number",
            "fieldName": "countryFlagRight",
            "label": "Distance between flag and right side of the screen(in pixels):",
            "tooltip": "Enter the approximate location of the flag in pixels",
            "value": "280"
        },
        {
            "type": "string",
            "fieldName": "flagPath",
            "label": "URL to the flag image:",
            "tooltip": "Enter the url of the flag you want to show in the application"
        },
        {
            "type": "string",
            "fieldName": "maskMapUrl",
            "label": "URL to the Mask Layer:",
            "tooltip": "This is a url for a mask layer to hide the other countries but show the country of interest.",
            "placeholder": "Ex. http://gis-forest-atlas.wri.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer"
        },
        {
            "type": "string",
            "fieldName": "printURL",
            "label": "URL to a print service:",
            "tooltip": "URL for a valid print service this application will need to connect to"
        },
        {
            "type": "string",
            "fieldName": "downloadDataUrl",
            "label": "URL to Open Data Portal:",
            "tooltip": "Ex. http://data.globalforestwatch.org"
        },
        {
            "type": "string",
            "fieldName": "documentMapserver",
            "label": "URL to Map Service containing documents:",
            "tooltip": "Map Service that contains filenames of documents(pdfs) relative to the document directory.  It should have a url field that contains the name of the PDF."
        },
        {
            "type": "string",
            "fieldName": "documentDirectory",
            "label": "URL to the Documents directory:",
            "tooltip": "This is the root directory where all the documents available from the map service below are hosted."
        },
        {
            "type": "string",
            "fieldName": "flagLinkPath",
            "label": "Flag link:",
            "tooltip": "URL to redirect to when the flag is clicked."
        },
        {
            "type": "string",
            "fieldName": "aboutLinkUrl",
            "label": "About link:",
            "tooltip": "URL for the about link."
        }
      ]
    },
    {
      "category": "Language Settings",
      "fields": [
        {
            "type": "options",
            "fieldName": "defaultLanguage",
            "tooltip": "Choose a default language for the application.",
            "label": "Choose the default language:",
            "value": "en",
            "options": [
              {"label": "English", "value": "en" },
              {"label": "French", "value": "fr" },
              {"label": "Spanish", "value": "es"}
            ]
        },
        {
            "type": "string",
            "fieldName": "defaultTitle",
            "label": "Application title:",
            "tooltip": "Enter the title of the application in your default language."
        },
        {
            "type": "string",
            "fieldName": "flagTitle",
            "label": "Text next ot the flag:",
            "tooltip": "Enter the text that should appear to the right of the flag."
        },
        {
            "type": "boolean",
            "fieldName": "useAdditionalLanguage",
            "label": "Add an additional language",
            "tooltip": "Check this if you would like the application to have the ability to toggle between two languages"
        },
        {
            "type": "options",
            "fieldName": "secondLanguage",
            "tooltip": "Choose a second language for the application.",
            "label": "Choose your second language:",
            "value": "fr",
            "options": [
              {"label": "English", "value": "en" },
              {"label": "French", "value": "fr" },
              {"label": "Spanish", "value": "es"}
            ]
        },
        {
            "type": "string",
            "fieldName": "secondLanguageTitle",
            "label": "Application title in the second language:",
            "tooltip": "Enter the title of the application in your second language."
        },
        {
            "type": "string",
            "fieldName": "secondLanguageFlagTitle",
            "label": "Text next ot the flag in the second language:",
            "tooltip": "Enter the text in your second language that should appear to the right of the flag."
        }
      ]
    },
    {
      "category": "Map Themes",
      "fields": [
        {
          "type": "string",
          "fieldName": "mapThemeIds",
          "label": "Application ID's for other Forest Atlas Applications:",
          "tooltip": "Comma spearated list of Application ID's for the other Forest Atlas Maps."
        },
        {
          "type": "string",
          "fieldName": "mapThemes",
          "label": "Names for your Map Theme(s):",
          "tooltip": "Comma spearated list of names of the various Map Theme(s) you want to link to in your application."
        },
        {
          "type": "string",
          "fieldName": "mapThemesOtherLanguage",
          "label": "If your using a second language, Names for that language for your Map Theme(s):",
          "tooltip": "Comma spearated list of names, same as above but use the second language you have chosen."
        }
      ]
    },
    {
      "category": "Layer Settings",
      "fields": [
        {
          "type": "paragraph",
          "value": "Choose the following layers/analysis you would like to be included in your application:"
        },
        {
            "type": "boolean",
            "fieldName": "activeFiresIncluded",
            "label": "Active Fires",
            "tooltip": "Show Active Fires layer/analysis"
        },
        {
            "type": "boolean",
            "fieldName": "landCoverIncluded",
            "label": "Land Cover",
            "tooltip": "Show Land Cover layer/analysis"
        },
        {
            "type": "boolean",
            "fieldName": "iflIncluded",
            "label": "Intact Forest Landscapes",
            "tooltip": "Show Intact Forest Landscapes layer/analysis"
        },
        {
            "type": "boolean",
            "fieldName": "biomassIncluded",
            "label": "Above Ground Biomass",
            "tooltip": "Show Above Ground Biomass layer/analysis"
        },
        {
            "type": "boolean",
            "fieldName": "formaIncluded",
            "label": "FORMA",
            "tooltip": "Show FORMA layer/analysis",
            "disabled": true
        },
        {
            "type": "boolean",
            "fieldName": "terraIncluded",
            "label": "Terra-i",
            "tooltip": "Show Terra-i layer/analysis",
            "disabled": true
        },
        {
            "type": "boolean",
            "fieldName": "imazonIncluded",
            "label": "SAD-Imazon",
            "tooltip": "Show SAD-Imazon layer/analysis",
            "disabled": true
        },
        {
            "type": "boolean",
            "fieldName": "globcoverIncluded",
            "label": "Global Land Cover",
            "tooltip": "Show Global Land Cover layer/analysis",
            "disabled": true
        },
        {
            "type": "boolean",
            "fieldName": "mangroveIncluded",
            "label": "Mangroves",
            "tooltip": "Show Mangroves layer/analysis",
            "disabled": true
        }
      ]
    }
  ]
}
/* New Configuration Panel Settings */
