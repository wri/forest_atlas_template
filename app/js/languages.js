define([], function() {

    var o = {
        //ENGLISH
        en: {

            printDialog: "Choose a print output",
            //flagTitle:"Ministère de l’Environnement, Conservation de la Nature et Tourisme", //DRC
            tabBasemapTitle: "Basemap",
            tabLayersTitle: "Layers",
            buttonLayersText: "+ Layers",
            tabLegendTitle: "Legend",
            basemapImageTitle: "Image",
            closeButtonText: "Close",
            popupDataTab: 'Data',
            popupAnalysisTab: 'Analysis',

            analysisOptions: [
                "Tree Cover Loss",
                "Land Cover",
                "Tree Cover Density",
                "Intact Forest Landscape",
                "Above Ground Biomass",
                "Land Cover Composition",
                "Active Fires"
            ],

            analysisLoss: "Tree Cover Loss",
            analysisLC: "Land Cover",
            analysisTCD: "Tree Cover Density",
            analysisIFL: "Intact Forest",
            analysisCS: "Biomass",
            analysisFire: "Active Fires",
            analysisLCComposition: "Land Cover Composition",

            analysisLossChartTitle: 'Tree Cover Loss in hectares',
            analysisLCChartTitle: 'Annual Tree Cover Loss (in hectares) on Land Cover',
            analysisTCDChartTitle: 'Annual Tree Cover Loss (in hectares) on Tree Cover Density',
            analysisIFLChartTitle: 'Annual Tree Cover Loss (in hectares) on Intact Forest Landscapes',
            analysisCSChartTitle: 'Annual Tree Cover Loss on Above Ground Biomass (MgC/ha)',

            firesOneWeek: 'Past Week',
            fires72Hours: 'Past 72 hours',
            fires48Hours: 'Past 48 hours',
            fires24Hours: 'Past 24 hours',

            drawButtonText: 'Draw',
            uploadButtonText: 'Upload',

            uploadInstructions: [
                "Select a zip file(.zip) containing a shapefile(.shp,.dbf,.prj) or a valid geojson file (.geojson or .json) from your local file system.",
                "The shapefile must be in Geographic Coordinate System (WGS84).",
                "Both the zipped shapefile and geojson file must contain polygon geometry.",
                "The zipped shapefile should not exceed 1 Megabyte, files larger then 1 Megabyte may not upload."
            ],

            lossStartingYear: 'Start of year:',
            lossEndingYear: 'End of year:',

            accordionForestLossTitle: "Land Cover Dynamics",
            accordionLandUseTitle: "Land Use",
            accordionForestCoverTitle: "Land Cover",

            forestCoverLossLabel: 'Tree Cover Loss',
            activeFiresLabel: 'Active Fires (last 7 days)',
            treeCoverDensityLabel: 'Tree Cover Density',
            landCoverLabel: 'Land Cover',
            treeCoverGainLabel: 'Tree Cover Gain',
            carbonLayerLabel: 'Above Ground Biomass',
            intactForestLayerLabel: 'Intact Forest Landscape',
            
            treeCoverAnalysis: "Select a tree cover loss analysis below:",
            otherAnalysisTypes: "Or, select analysis based on land cover composition or active fires:",

            about: "About",
            downloadData: "Download Data",
            sources: "Sources",
            print: "Print",

            legislativeText: "Legislative Text",
            printReport: "Print Report",
            zoom: "Zoom to",

            singleShapeDownload: "Download shapefile/raster for:",
            allShapeDownload: "Download shapefiles/rasters for all layers:",
            kmlDownload: "Download KML for all layers:",

            selectAll: "Select All",
            clearAll: "Clear All",
            transparency: "transparency",

            basemapTitles: {
                "imagery": "Imagery",
                "imagery_with_labels": "Imagery with Labels",
                "streets": "Streets",
                "topographic": "Topographic",
                "dark_gray_canvas": "Dark Gray Canvas",
                "light_gray_canvas": "Light Gray Canvas",
                "national_geographic": "National Geographic",
                "oceans": "Oceans",
                "terrain_with_labels": "Terrain with Labels",
                "openstreetmap": "Open Street Map",
                "usa_topo_maps": "USA Topo Maps",
                "usgs_national_map": "USGS National Map"
            },

            languageButtonProps: {
                id: "english",// NON CONFIGURABLE - DO NOT CHANGE
                "class": "language",// NON CONFIGURABLE - DO NOT CHANGE
                value: "en",// NON CONFIGURABLE - DO NOT CHANGE
                innerHTML: "English"// THIS IS WHAT SHOWS IN THE APP AND CAN CHANGE
            },

            drawNamingDialogTitle: 'Enter a name:',
            drawNamingDialogSubmit: 'Submit',
            drawNamingDialogNoNameError: 'Please enter a name to continue.',

            clearAllFeatures: 'Clear all',
            deleteCustomFeature: 'delete feature'

        },
        //SPANISH
        es: {

            printDialog: "Elegir diseño de página",
            tabBasemapTitle: "Mapas basicos",
            tabLayersTitle: "Capas",
            buttonLayersText: "+ Capas",
            tabLegendTitle: "Leyenda",
            basemapImageTitle: "Im‡genes",
            closeButtonText: "Close",
            popupDataTab: 'Data',
            popupAnalysisTab: 'Analysis',

            analysisOptions: [
                "Tree Cover Loss",
                "Land Cover",
                "Tree Cover Density",
                "Intact Forest Landscape",
                "Above Ground Biomass",
                "Land Cover Composition",
                "Active Fires"
            ],

            analysisLoss: "Tree Cover Loss",
            analysisLC: "Land Cover",
            analysisTCD: "Tree Cover Density",
            analysisIFL: "Intact Forest",
            analysisCS: "Biomass",
            analysisFire: "Active Fires",
            analysisLCComposition: "Land Cover Composition",

            analysisLossChartTitle: 'Tree Cover Loss in square hectares',
            analysisLCChartTitle: 'Annual Tree Cover Loss (in hectares) on Land Cover',
            analysisTCDChartTitle: 'Annual Tree Cover Loss (in hectares) on Tree Cover Density',
            analysisIFLChartTitle: 'Annual Tree Cover Loss (in hectares) on Intact Forest Landscapes',
            analysisCSChartTitle: 'Annual Tree Cover Loss on Above Ground Biomass (MgC/ha)',

            firesOneWeek: 'Past Week',
            fires72Hours: 'Past 72 hours',
            fires48Hours: 'Past 48 hours',
            fires24Hours: 'Past 24 hours',

            drawButtonText: 'Draw',
            uploadButtonText: 'Upload',

            uploadInstructions: [
                "Select a zip file(.zip) containing a shapefile(.shp,.dbf,.prj) or a valid geojson file (.geojson or .json) from your local file system.",
                "The shapefile must be in Geographic Coordinate System (WGS84).",
                "Both the zipped shapefile and geojson file must contain polygon geometry.",
                "The zipped shapefile should not exceed 1 Megabyte, files larger then 1 Megabyte may not upload."
            ],

            lossStartingYear: 'Start of year:',
            lossEndingYear: 'End of year:',

            accordionForestLossTitle: "Land Cover Dynamics",
            accordionLandUseTitle: "Land Use",
            accordionForestCoverTitle: "Land Cover",

            forestCoverLossLabel: 'Tree Cover Loss',
            activeFiresLabel: 'Active Fires (last 7 days)',
            treeCoverDensityLabel: 'Tree Cover Density',
            landCoverLabel: 'Land Cover',
            treeCoverGainLabel: 'Tree Cover Gain',
            carbonLayerLabel: 'Above Ground Biomass',
            intactForestLayerLabel: 'Intact Forest Landscape',

            treeCoverAnalysis: "Select a tree cover loss analysis below:",
            otherAnalysisTypes: "Or, select analysis based on land cover composition or active fires:",

            about: "Acrerca de",
            downloadData: "Descargar de Datos",
            sources: "Fuentes",
            print: "Imprimir",

            //map popup
            legislativeText: "Texto Legislativo",
            printReport: "Imprimir Informe",
            zoom: "Acercar a",

            //data download
            singleShapeDownload: "Descargar el Archivo en forma:",
            allShapeDownload: "Descargar Archivos de forma para todas las capas:",
            kmlDownload: "Descarga KML para todas las capas:",

            selectAll: "Seleccionar Todo",
            clearAll: "Borrar Todo",
            transparency: "transparencia",

            basemapTitles: {
                "imagery": "Imágenes",
                "imagery_with_labels": "Imágenes con etiquetas",
                "streets": "Calles",
                "topographic": "Topográfico",
                "dark_gray_canvas": "Dark Gray Canvas",
                "light_gray_canvas": "Lona gris claro",
                "national_geographic": "National Geographic",
                "oceans": "Océanos",
                "terrain_with_labels": "Terreno con etiquetas",
                "openstreetmap": "Open Street Map",
                "usa_topo_maps": "USA Topo Maps",
                "usgs_national_map": "USGS National Map"
            },

            languageButtonProps: {
                id: "spanish",// NON CONFIGURABLE - DO NOT CHANGE
                "class": "language",// NON CONFIGURABLE - DO NOT CHANGE
                value: "es",// NON CONFIGURABLE - DO NOT CHANGE
                innerHTML: "Español"// THIS IS WHAT SHOWS IN THE APP AND CAN CHANGE
            },

            drawNamingDialogTitle: 'Enter a name:',
            drawNamingDialogSubmit: 'Submit',
            drawNamingDialogNoNameError: 'Please enter a name to continue.',

            clearAllFeatures: 'Clear all',
            deleteCustomFeature: 'delete feature'


        },
        //FRENCH
        fr: {

            printDialog: "Choisir un format d'impression",
            tabBasemapTitle: "Fond de carte",
            tabLayersTitle: "Couches",
            buttonLayersText: "+ Couches",
            tabLegendTitle: "Légende",
            basemapImageTitle: "Image",
            closeButtonText: "Close",

            popupDataTab: 'Données',
            popupAnalysisTab: 'Analyses',

            analysisOptions: [
                "Perde totale",
                "Occupation du Sol",
                "Densité de la Couverture Arborée",
                "Intact Forest Landscape",
                "Above Ground Biomass",
                "Composition d'Occupation du Sol",
                "Feux Actifs"
            ],

            analysisLoss: "Perde totale",
            analysisLC: "Occupation du Sol",
            analysisTCD: "Densité de la Couverture Arborée",
            analysisIFL: "Forêt Intacte",
            analysisCS: "Biomasse",
            analysisFire: "Feux Actifs",
            analysisLCComposition: "Composition d'Occupation du Sol",

            analysisLossChartTitle: 'Perde de la Couverture Arborée en Hectare',
            analysisLCChartTitle: 'Perde de la Couverture Arborée annuelle (en Hectare) par Type d\'Occupation du Sol',
            analysisTCDChartTitle: 'Perde de la Couverture Arborée annuelle (en Hectare) par Densité de la Couverture Arborée',
            analysisIFLChartTitle: 'Perde de la Couverture Arborée annuelle (en Hectare) par Paysage Forestier Intact',
            analysisCSChartTitle: 'Perde de la Couverture Arborée annuelle (en Hectare) par Biomasse Aérienne (MgC/ha)',

            firesOneWeek: 'Past Week',
            fires72Hours: 'Past 72 hours',
            fires48Hours: 'Past 48 hours',
            fires24Hours: 'Past 24 hours',

            drawButtonText: 'Draw',
            uploadButtonText: 'Upload',

            uploadInstructions: [
                "Select a zip file(.zip) containing a shapefile(.shp,.dbf,.prj) or a valid geojson file (.geojson or .json) from your local file system.",
                "The shapefile must be in Geographic Coordinate System (WGS84).",
                "Both the zipped shapefile and geojson file must contain polygon geometry.",
                "The zipped shapefile should not exceed 1 Megabyte, files larger then 1 Megabyte may not upload."
            ],

            lossStartingYear: 'Start of year:',
            lossEndingYear: 'End of year:',

            accordionForestLossTitle: "Dynamique d'Occupation du Sol",
            accordionLandUseTitle: "Affectation des Terres",
            accordionForestCoverTitle: "Occupation du Sol",

            forestCoverLossLabel: 'Perde de la Couverture Arborée',
            activeFiresLabel: 'Feux Actifs (les 7 derniers jours)',
            treeCoverDensityLabel: 'Densité de la Couverture Arborée',
            landCoverLabel: 'Occupation du Sol',
            treeCoverGainLabel: 'Gain de la Couverture Arborée',
            carbonLayerLabel: 'Above Ground Biomass',
            intactForestLayerLabel: 'Intact Forest Landscape',
            
            treeCoverAnalysis: "Sélectionnez une analyse sur la perde de la couverture arborée ci-dessous:",
            otherAnalysisTypes: "Ou sélectionnez des analyses basées sur l'occupation du sol ou des feux actives:",

            about: "Au sujet de",
            downloadData: "Télécharger de données",
            sources: "Sources",
            print: "Imprimer",

            legislativeText: "Texte Législatif",
            printReport: "Imprimer rapport",
            zoom: "Zoomer",

            singleShapeDownload: "Télécharger le fichier Shape pour :",
            allShapeDownload: "Télécharger les fichiers Shape pour toutes les couches :",
            kmlDownload: "Télécharger les KML pour toutes les couches :",


            selectAll: "Tout sélectionner",
            clearAll: "Tout effacer",
            transparency: "Transparence",

            basemapTitles: {
                "imagery": "Imagerie",
                "imagery_with_labels": "Imagerie et étiquettes",
                "streets": "Rues",
                "topographic": "Topographie",
                "dark_gray_canvas": "Dark Gray Canvas",
                "light_gray_canvas": "Nuances de gris",
                "national_geographic": "National Geographic",
                "oceans": "Océans et bathymétrie",
                "terrain_with_labels": "Terrain avec étiquettes",
                "openstreetmap": "Open Street Map",
                "usa_topo_maps": "USA Topo Maps",
                "usgs_national_map": "USGS National Map"
            },

            languageButtonProps: {
                id: "french",// NON CONFIGURABLE - DO NOT CHANGE
                "class": "language",// NON CONFIGURABLE - DO NOT CHANGE
                value: "fr",// NON CONFIGURABLE - DO NOT CHANGE
                innerHTML: "Français"// THIS IS WHAT SHOWS IN THE APP AND CAN CHANGE
            },

            drawNamingDialogTitle: 'Enter a name:',
            drawNamingDialogSubmit: 'Submit',
            drawNamingDialogNoNameError: 'Please enter a name to continue.',

            clearAllFeatures: 'Clear all',
            deleteCustomFeature: 'delete feature'


        },
        //PORTUGESE
        pt: {

            printDialog: "Choose a print output (pt)",
            tabBasemapTitle: "Basemap",
            tabLayersTitle: "Layers",
            buttonLayersText: "+ Layers",
            tabLegendTitle: "Legend",
            basemapImageTitle: "Image",
            closeButtonText: "Close",
            popupDataTab: 'Data',
            popupAnalysisTab: 'Analysis',

            analysisOptions: [
                "Tree Cover Loss",
                "Land Cover",
                "Tree Cover Density",
                "Intact Forest Landscape",
                "Above Ground Biomass",
                "Land Cover Composition",
                "Active Fires"
            ],

            analysisLoss: "Tree Cover Loss",
            analysisLC: "Land Cover",
            analysisTCD: "Tree Cover Density",
            analysisIFL: "Intact Forest",
            analysisCS: "Biomass",
            analysisFire: "Active Fires",
            analysisLCComposition: "Land Cover Composition",

            analysisLossChartTitle: 'Tree Cover Loss in square hectares',
            analysisLCChartTitle: 'Annual Tree Cover Loss (in hectares) on Land Cover',
            analysisTCDChartTitle: 'Annual Tree Cover Loss (in hectares) on Tree Cover Density',
            analysisIFLChartTitle: 'Annual Tree Cover Loss (in hectares) on Intact Forest Landscapes',
            analysisCSChartTitle: 'Annual Tree Cover Loss on Above Ground Biomass (MgC/ha)',

            firesOneWeek: 'Past Week',
            fires72Hours: 'Past 72 hours',
            fires48Hours: 'Past 48 hours',
            fires24Hours: 'Past 24 hours',

            drawButtonText: 'Draw',
            uploadButtonText: 'Upload',

            uploadInstructions: [
                "Select a zip file(.zip) containing a shapefile(.shp,.dbf,.prj) or a valid geojson file (.geojson or .json) from your local file system.",
                "The shapefile must be in Geographic Coordinate System (WGS84).",
                "Both the zipped shapefile and geojson file must contain polygon geometry.",
                "The zipped shapefile should not exceed 1 Megabyte, files larger then 1 Megabyte may not upload."
            ],

            lossStartingYear: 'Start of year:',
            lossEndingYear: 'End of year:',

            accordionForestCoverTitle: "Land Cover",
            accordionForestLossTitle: "Land Cover Dynamics",
            accordionLandUseTitle: "Land Use",

            forestCoverLossLabel: 'Tree Cover Loss',
            activeFiresLabel: 'Active Fires (last 7 days)',
            treeCoverDensityLabel: 'Tree Cover Density',
            landCoverLabel: 'Land Cover',
            treeCoverGainLabel: 'Tree Cover Gain',
            carbonLayerLabel: 'Above Ground Biomass',
            intactForestLayerLabel: 'Intact Forest Landscape',

            treeCoverAnalysis: "Select a tree cover loss analysis below:",
            otherAnalysisTypes: "Or, select analysis based on land cover composition or active fires:",

            about: "About",
            downloadData: "Download Data",
            sources: "Sources",
            print: "Print",

            legislativeText: "Texto Legislativo",
            printReport: "Imprimir Informe",
            zoom: "Acercar a",

            singleShapeDownload: "",
            allShapeDownload: "",
            kmlDownload: "",

            selectAll: "",
            clearAll: "",
            transparency: "",

            basemapTitles: {
                "imagery": "Imagem",
                "imagery_with_labels": "Imagem com Rótulos",
                "streets": "Ruas",
                "topographic": "Topográfico",
                "dark_gray_canvas": "Dark Gray Canvas",
                "light_gray_canvas": "Fundo Cinza Claro",
                "national_geographic": "National Geographic",
                "oceans": "Oceanos",
                "terrain_with_labels": "Terreno com Rótulos",
                "openstreetmap": "Open Street Map",
                "usa_topo_maps": "USA Topo Maps",
                "usgs_national_map": "USGS National Map"
            },

            languageButtonProps: {
                id: "portugege",// NON CONFIGURABLE - DO NOT CHANGE
                "class": "language",// NON CONFIGURABLE - DO NOT CHANGE
                value: "pt",// NON CONFIGURABLE - DO NOT CHANGE
                innerHTML: "Portugese"// THIS IS WHAT SHOWS IN THE APP AND CAN CHANGE
            },

            drawNamingDialogTitle: 'Enter a name:',
            drawNamingDialogSubmit: 'Submit',
            drawNamingDialogNoNameError: 'Please enter a name to continue.',

            clearAllFeatures: 'Clear all',
            deleteCustomFeature: 'delete feature'


        }

    };

    return o;
});