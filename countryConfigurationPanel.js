{
  "configurationSettings": [
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
            "type": "boolean",
            "fieldName": "useAdditionalLanguage",
            "label": "Add an additional language",
            "tooltip": "Check this if you would like the application to have the ability to toggle between two languages",
            "value": true
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
        }
      ]
    },
    {
      "category": "Title",
      "fields": [
        {
            "type": "string",
            "fieldName": "defaultTitle",
            "label": "Application title:",
            "tooltip": "Enter the title of the application in your default language."
        },
        {
            "type": "string",
            "fieldName": "secondLanguageTitle",
            "label": "Application title in the second language:",
            "tooltip": "Enter the title of the application in your second language."
        }
      ]
    },
    {
      "category": "Layer Settings",
      "fields": [
        {
            "type": "string",
            "fieldName": "layersToHide",
            "label": "Default hidden layers:",
            "tooltip": "Enter the layers you want hidden by default as a comma separated string of layer numbers.",
            "placeholder": "Ex.  0,1,2,3,6,9,12,13,14"
        },
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
        }
      ]
    }
  ],
  "values": {
    "activeFiresIncluded": true,
    "landCoverIncluded": true,
    "biomassIncluded": true,
    "iflIncluded": true
  }
}
