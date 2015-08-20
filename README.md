# WRI Forest Atlas ArcGIS Online Template
> Template for the WRI Forest Atlas that will be available through ArcGIS Online.


## User Guide
<p>Add explanation of how to use when completed and in AGOL.</p>

## Requirements
<p>Add Requirements to run the app, including which ones in the configuration panel will be necessary to make the app work correctly.</p>

### Future Updates
<ul>
	<li>Add documentation.</li>
</ul>

### Configuration Parameters

```
{
    "configurationSettings": [{
        "category": "General Settings",
        "fields": [{
            "type": "webmap"
        }, {
            "type": "string",
            "fieldName": "country",
            "label": "3-Digit Country ISO Code:",
            "tooltip": "Enter the 3-digit ISO code representing your country of interest."
        }, {
            "type": "string",
            "fieldName": "layersToShow",
            "label": "Default visible layers:",
            "tooltip": "Enter the layers you want visible by default as a comma separated string of layer numbers.",
            "placeholder": "Ex.  0,1,2,3,6,9,12,13,14"
        }, {
            "type": "number",
            "fieldName": "countryFlagRight",
            "label": "Distance between flag and right side of the screen(in pixels):",
            "tooltip": "Enter the approximate location of the flag in pixels",
            "value": "280"
        }, {
            "type": "string",
            "fieldName": "flagPath",
            "label": "URL to the flag image:",
            "tooltip": "Enter the url of the flag you want to show in the application"
        }, {
            "type": "string",
            "fieldName": "maskMapUrl",
            "label": "URL to the Mask Layer:",
            "tooltip": "This is a url for a mask layer to hide the other countries but show the country of interest.",
            "placeholder": "Ex. http://gis-forest-atlas.wri.org/arcgis/rest/services/GAB/GAB_00_africa/MapServer"
        }, {
            "type": "string",
            "fieldName": "printURL",
            "label": "URL to a print service:",
            "tooltip": "URL for a valid print service this application will need to connect to"
        }, {
            "type": "string",
            "fieldName": "downloadDataUrl",
            "label": "URL to Open Data Portal:",
            "tooltip": "Ex. http://data.globalforestwatch.org"
        }, {
            "type": "string",
            "fieldName": "documentMapserver",
            "label": "URL to Map Service containing documents:",
            "tooltip": "Map Service that contains filenames of documents(pdfs) relative to the document directory.  It should have a url field that contains the name of the PDF."
        }, {
            "type": "string",
            "fieldName": "documentDirectory",
            "label": "URL to the Documents directory:",
            "tooltip": "This is the root directory where all the documents available from the map service below are hosted."
        }, {
            "type": "string",
            "fieldName": "flagLinkPath",
            "label": "Flag link:",
            "tooltip": "URL to redirect to when the flag is clicked."
        }, {
            "type": "string",
            "fieldName": "aboutLinkUrl",
            "label": "About link:",
            "tooltip": "URL for the about link."
        }]
    }, {
        "category": "Language Settings",
        "fields": [{
            "type": "options",
            "fieldName": "defaultLanguage",
            "tooltip": "Choose a default language for the application.",
            "label": "Choose the default language:",
            "value": "en",
            "options": [{
                "label": "English",
                "value": "en"
            }, {
                "label": "French",
                "value": "fr"
            }, {
                "label": "Spanish",
                "value": "es"
            }]
        }, {
            "type": "string",
            "fieldName": "defaultTitle",
            "label": "Application title:",
            "tooltip": "Enter the title of the application in your default language."
        }, {
            "type": "string",
            "fieldName": "flagTitle",
            "label": "Text next ot the flag:",
            "tooltip": "Enter the text that should appear to the right of the flag."
        }, {
            "type": "boolean",
            "fieldName": "useAdditionalLanguage",
            "label": "Add an additional language",
            "tooltip": "Check this if you would like the application to have the ability to toggle between two languages",
            "value": true
        }, {
            "type": "options",
            "fieldName": "secondLanguage",
            "tooltip": "Choose a second language for the application.",
            "label": "Choose your second language:",
            "value": "fr",
            "options": [{
                "label": "English",
                "value": "en"
            }, {
                "label": "French",
                "value": "fr"
            }, {
                "label": "Spanish",
                "value": "es"
            }]
        }, {
            "type": "string",
            "fieldName": "secondLanguageTitle",
            "label": "Application title in the second language:",
            "tooltip": "Enter the title of the application in your second language."
        }, {
            "type": "string",
            "fieldName": "secondLanguageFlagTitle",
            "label": "Text next ot the flag in the second language:",
            "tooltip": "Enter the text in your second language that should appear to the right of the flag."
        }]
    }, {
        "category": "Map Themes",
        "fields": [{
            "type": "string",
            "fieldName": "mapThemeIds",
            "label": "Application ID's for other Forest Atlas Applications:",
            "tooltip": "Comma spearated list of Application ID's for the other Forest Atlas Maps."
        }, {
            "type": "string",
            "fieldName": "mapThemes",
            "label": "Names for your Map Theme(s):",
            "tooltip": "Comma spearated list of names of the various Map Theme(s) you want to link to in your application."
        }, {
            "type": "string",
            "fieldName": "mapThemesOtherLanguage",
            "label": "If your using a second language, Names for that language for your Map Theme(s):",
            "tooltip": "Comma spearated list of names, same as above but use the second language you have chosen."
        }]
    }, {
        "category": "Layer Settings",
        "fields": [{
            "type": "paragraph",
            "value": "Choose the following layers/analysis you would like to be included in your application:"
        }, {
            "type": "boolean",
            "fieldName": "activeFiresIncluded",
            "label": "Active Fires",
            "tooltip": "Show Active Fires layer/analysis"
        }, {
            "type": "boolean",
            "fieldName": "landCoverIncluded",
            "label": "Land Cover",
            "tooltip": "Show Land Cover layer/analysis"
        }, {
            "type": "boolean",
            "fieldName": "iflIncluded",
            "label": "Intact Forest Landscapes",
            "tooltip": "Show Intact Forest Landscapes layer/analysis"
        }, {
            "type": "boolean",
            "fieldName": "biomassIncluded",
            "label": "Above Ground Biomass",
            "tooltip": "Show Above Ground Biomass layer/analysis"
        }, {
            "type": "boolean",
            "fieldName": "formaIncluded",
            "label": "FORMA",
            "tooltip": "Show FORMA layer/analysis",
            "disabled": true
        }, {
            "type": "boolean",
            "fieldName": "terraIncluded",
            "label": "Terra-i",
            "tooltip": "Show Terra-i layer/analysis",
            "disabled": true
        }, {
            "type": "boolean",
            "fieldName": "imazonIncluded",
            "label": "SAD-Imazon",
            "tooltip": "Show SAD-Imazon layer/analysis",
            "disabled": true
        }, {
            "type": "boolean",
            "fieldName": "globcoverIncluded",
            "label": "Global Land Cover",
            "tooltip": "Show Global Land Cover layer/analysis",
            "disabled": true
        }, {
            "type": "boolean",
            "fieldName": "mangroveIncluded",
            "label": "Mangroves",
            "tooltip": "Show Mangroves layer/analysis",
            "disabled": true
        }]
    }],
    "values": {
        "defaultLanguage": "en",
        "countryFlagRight": "280",
        "useAdditionalLanguage": true,
        "formaIncluded": false,
        "terraIncluded": false,
        "imazonIncluded": false,
        "globcoverIncluded": false,
        "mangroveIncluded": false
    }
}
```
