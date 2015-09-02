define([], function() {

    var o = {
        //ENGLISH
        en: {

            printDialog: "Choose a print output",
            //flagTitle:"Ministère de l’Environnement et du Développement Durable", //DRC
            tabBasemapTitle: "Basemap",
            tabLayersTitle: "Layers",
            buttonLayersText: "+ Layers",
            tabLegendTitle: "Legend",
            basemapImageTitle: "Image",
            closeButtonText: "Close",
            popupDataTab: "Data",
            popupAnalysisTab: "Analysis",
            popupDocumentTab: "Docs",
            documentsUnavailable: "There are no documents available for this area.",

            documentType: "Type",
            documentAuthor: "Author",
            documentDate: "Year",
            documentLink: "PDF",

            analysisOptions: [
                "Tree Cover Loss",
                "Land Cover Loss",
                "Tree Cover Density Loss",
                "Intact Forest Landscape Loss",
                "Above Ground Biomass Loss",
                "Land Cover Composition",
                "Active Fires"
            ],

            analysisLoss: "Tree Cover Loss",
            analysisGain: "Total Tree Cover Loss/Gain",
            analysisLC: "Land Cover Loss",
            // analysisTCD: "Tree Cover Density Loss",
            analysisIFL: "Intact Forest Loss",
            analysisCS: "Biomass Loss",
            analysisFire: "Active Fires",
            analysisLCComposition: "Land Cover Composition",

            analysisLossChartTitle: "Tree Cover Loss in hectares",

            totalLossAnalysis: "Total Tree Cover Loss <br> (2001 - 2014):",
            totalGainAnalysis: "Total Tree Cover Gained <br> (2001 - 2012):",

            analysisLCChartTitle: "Annual Tree Cover Loss (in hectares) on Land Cover",
            // analysisTCDChartTitle: "Annual Tree Cover Loss (in hectares) on Tree Cover Density",
            analysisIFLChartTitle: "Annual Tree Cover Loss (in hectares) on Intact Forest Landscapes",
            analysisCSChartTitle: "Annual Tree Cover Loss on Above Ground Biomass (MgC/ha)",

            // Chart Labels
            analysisChartLabels: {
                // Don"t translate the keys, only parts inbetween quotes
                // Also dont change the order, the correctness of the analysis depends on it
                landCover: [ "Dense moist forest", "Submontane forest", "Mountain forest", "Edaphic forest", "Mangrove", "Forest-savanna mosaic", "Rural complex and young secondary forest", "Closed to open deciduous woodland", "Savanna woodland-Tree savanna", "Shrubland", "Grassland", "Aquatic grassland", "Swamp grassland", "Sparse vegetation", "Mosaic cultivated areas/vegeatation( herbaceous or shrub)", "Agriculture", "Irrigated agriculture", "Bare areas", "Artificial surfaces and associated areas", "Water Bodies"],
                treeDensity: ["31 - 50%", "51 - 74%", "75 - 100%"],
                intactForest: ["Intact Forest"],
                carbonStock: ["0", "1 - 10", "11 - 20", "21- 35", "36 - 70", "71 - 100", "101 - 150", "151 - 200", "201 - 300", "Greater than 300"],
                activeFires: {
                    start: "There are",
                    active: "active fires",
                    end: "in the last 7 days."
                }
            },

            // Draw Tool Tooltips
            drawTools: {
                freehand: "Press down to start and let go to finish"
            },

            tcdSelectorBegin: "Displaying results with",
            tcdSelectorEnd: "canopy density",
            treeCoverSliderLabel: "Adjust the minimum canopy density for tree cover and tree cover loss",

            landsatTextLabel: "Landsat imagery:",

            mapThemesLabel: "Map Themes",

            firesOneWeek: "Past Week",
            fires72Hours: "Past 72 hours",
            fires48Hours: "Past 48 hours",
            fires24Hours: "Past 24 hours",

            drawButtonText: "Draw",
            uploadButtonText: "Upload",

            uploadInstructions: [
                "Select a zip file(.zip) containing a shapefile(.shp,.dbf,.prj) or a valid geojson file (.geojson or .json) from your local file system.",
                "The shapefile must be in Geographic Coordinate System (WGS84).",
                "Both the zipped shapefile and geojson file must contain polygon geometry.",
                "The zipped shapefile should not exceed 1 Megabyte, files larger then 1 Megabyte may not upload."
            ],

            lossStartingYear: "Start of year:",
            lossEndingYear: "End of year:",

            accordionForestLossTitle: "Land Cover Dynamics",
            accordionLandUseTitle: "Land Use",
            accordionForestCoverTitle: "Land Cover",

            forestCoverLossLabel: "Tree Cover Loss (Hansen/UMD/Google/USGS/NASA)",
            activeFiresLabel: "Active Fires (last 7 days, NASA)",
            treeCoverDensityLabel: "Tree Cover Density (Hansen/UMD/Google/USGS/NASA)",
            landCoverLabel: "Land Cover",
            treeCoverGainLabel: "Tree Cover Gain (Hansen/UMD/Google/USGS/NASA)",
            carbonLayerLabel: "Above Ground Biomass",
            intactForestLayerLabel: "Intact Forest Landscape",

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

            drawNamingDialogTitle: "Enter a name:",
            drawNamingDialogSubmit: "Submit",
            drawNamingDialogNoNameError: "Please enter a name to continue.",

            clearAllFeatures: "Clear all",
            deleteCustomFeature: "delete feature"

        },
        //SPANISH
        es: {

            printDialog: "Elegir diseño de página",
            tabBasemapTitle: "Mapas básicos",
            tabLayersTitle: "Capas",
            buttonLayersText: "+ Capas",
            tabLegendTitle: "Leyenda",
            basemapImageTitle: "Imágenes",
            closeButtonText: "Cerrar",
            popupDataTab: "Datos",
            popupAnalysisTab: "Análisis",
            popupDocumentTab: "Documentos",
            documentsUnavailable: "No hay documentos disponibles para esta área.",

            documentType: "Type",
            documentAuthor: "Author",
            documentDate: "Year",
            documentLink: "PDF",

            analysisOptions: [
                "Pérdida de la cobertura arbórea",
                "Cobertura vegetal",
                "Densidad de dosel arbóreo",
                "Paisajes Forestales Intactos",
                "Biomasa arriba del suelo",
                "Composición de la cobertura vegetal",
                "Incendios Activos"
            ],

            analysisLoss: "Pérdida de la cobertura arbórea",
            analysisGain: "Total Tree Cover Loss/Gain",
            analysisLC: "Cobertura vegetal",
            // analysisTCD: "Densidad de dosel arbóreo",
            analysisIFL: "Paisajes Forestales Intactos",
            analysisCS: "Biomasa",
            analysisFire: "Incendios activos",
            analysisLCComposition: "Composición de la cobertura vegetal",

            analysisLossChartTitle: "Pérdida de la cobertura arbórea en hectáreas cuadradas",
            totalLossAnalysis: "Pérdida Total de la Cobertura Arbórea <br> (2001 - 2014):",
            totalGainAnalysis: "Ganancia Total de la Cobertura Arbórea <br> (2001 - 2012):",
            analysisLCChartTitle: "Pérdida anual de la cobertura arbórea (hectáreas cuadradas) on Land Cover",
            // analysisTCDChartTitle: "Pérdida anual de la cobertura arbórea (hectáreas cuadradas) on Tree Cover Density",
            analysisIFLChartTitle: "Pérdida anual de la cobertura arbórea (hectáreas cuadradas) en Paisajes Forestales Intactos",
            analysisCSChartTitle: "Pérdida anual de la cobertura arbórea en biomasa arriba del suelo (MgC/ha)",

            // Chart Labels
            analysisChartLabels: {
                // Don"t translate the keys, only parts inbetween quotes
                // Also dont change the order, the correctness of the analysis depends on it
                landCover: [ "Bosque húmedo", "Bosque premontano", "Bosque montano", "Bosque edáfico", "Bosque de mangle", "Mosaico sabana-bosque", "Copmlejo rural y bosque secondário joven", "Closed to open deciduous woodland", "Sabana arbolada", "Matorral", "Pradera", "Pradera aquática", "Pradera inundable", "Vegetación ralo", "Mosaico áreas cultivadas/ vegetación (herbáceo o matorral)", "Agricultura", "Agricultura irregada", "Áreas desnudas", "Superficies artificiales y áreas asociadas", "Cuerpos de agua"],
                treeDensity: ["31 - 50%", "51 - 74%", "75 - 100%"],
                intactForest: ["Bosque Intacto"],
                carbonStock: ["0", "1 - 10", "11 - 20", "21- 35", "36 - 70", "71 - 100", "101 - 150", "151 - 200", "201 - 300", "Mayor de 300"],
                activeFires: {
                    start: "Hay",
                    active: "incendios activos",
                    end: "en los últimos 7 días."
                }
            },

            // Draw Tool Tooltips
            drawTools: {
                freehand: "Apretar para empezar y soltar para terminar"
            },

            tcdSelectorBegin: "Desplegando resultados con",
            tcdSelectorEnd: "densidad del follaje",
            treeCoverSliderLabel: "Ajustar el mínimo densidad del follaje para la cobertura arbórea y la pérdida de la cobertura arbórea",

            landsatTextLabel: "Imágenes de Landsat:",

            mapThemesLabel: "Temas",

            firesOneWeek: "La semana pasada",
            fires72Hours: "Las últimas 72 horas",
            fires48Hours: "Las últimas 48 horas",
            fires24Hours: "Las últimas 24 horas",

            drawButtonText: "Dibujar",
            uploadButtonText: "Subir",

            uploadInstructions: [
                "Seleccionar un archivo zip (.zip) que contiene un shapefile(.shp,.dbf,.prj) o un archivo geojson (.geojson o .json) de su sistema local.",
                "El shapefile debe estar en el sistema de coordenadas geográficas WGS84.",
                "El archivo shapefile comprimido (zip) y el archivo geojson deben contener geometría de polígono",
                "El tamaño del archivo shapefile comprimido (zip) no debe exceder de 1 Megabyte."
            ],

            lossStartingYear: "Año del inicio:",
            lossEndingYear: "Fin del año:",

            accordionForestLossTitle: "Dinámica de la Cobertura de la Tierra",
            accordionLandUseTitle: "Uso del suelo",
            accordionForestCoverTitle: "Cobertura vegetal ",

            forestCoverLossLabel: "Pérdida de la cobertura arbórea (Hansen/UMD/Google/USGS/NASA)",
            activeFiresLabel: "Incendios activos (últimos 7 días, NASA)",
            treeCoverDensityLabel: "Densidad de dosel arbóreo (Hansen/UMD/Google/USGS/NASA)",
            landCoverLabel: "Cobertura vegetal",
            treeCoverGainLabel: "Aumento de la cobertura arbórea (Hansen/UMD/Google/USGS/NASA)",
            carbonLayerLabel: "Biomasa arriba del suelo",
            intactForestLayerLabel: "Paisajes Forestales Intactos",

            treeCoverAnalysis: "Seleccione un análisis below:",
            otherAnalysisTypes: "O, seleccione un análisis basado en la composicíon de la tierra o incendios activos:",

            about: "Acerca de",
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
                "dark_gray_canvas": "Lona gris oscuro",
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

            drawNamingDialogTitle: "Crear un nombre:",
            drawNamingDialogSubmit: "Entregar",
            drawNamingDialogNoNameError: "Por favor crear un nombre para continuar.",

            clearAllFeatures: "Borrar todo",
            deleteCustomFeature: "Borrar feature"


        },
        //FRENCH
        fr: {

            printDialog: "Choisir un format d'impression",
            tabBasemapTitle: "Fond de carte",
            tabLayersTitle: "Couches",
            buttonLayersText: "+ Couches",
            tabLegendTitle: "Légende",
            basemapImageTitle: "Image",
            closeButtonText: "Fermer",

            popupDataTab: "Données",
            popupAnalysisTab: "Analyses",
            popupDocumentTab: "Docs",
            documentsUnavailable: "There are no documents available for this area.",

            documentType: "Type",
            documentAuthor: "Author",
            documentDate: "Year",
            documentLink: "PDF",

            analysisOptions: [
                "Perte totale",
                "Occupation du Sol",
                "Densité de la Couverture Arborée",
                "Paysage Forestier Intact",
                "Biomasse Aérienne",
                "Occupation du Sol",
                "Feux Actifs"
            ],

            analysisLoss: "Perte totale",
            analysisGain: "Total Tree Cover Loss/Gain",
            analysisLC: "Occupation du Sol",
            // analysisTCD: "Densité de la Couverture Arborée",
            analysisIFL: "Forêt Intacte",
            analysisCS: "Biomasse Aérienne",
            analysisFire: "Feux Actifs",
            analysisLCComposition: "Composition d'Occupation du Sol",

            analysisLossChartTitle: "Perte de la Couverture Arborée en Hectare",
            totalLossAnalysis: "Total Tree Cover Loss <br> (2001 - 2014):",
            totalGainAnalysis: "Total Tree Cover Gained <br> (2001 - 2012):",
            analysisLCChartTitle: "Perte de la Couverture Arborée annuelle (en hectares) par Type d\"Occupation du Sol",
            // analysisTCDChartTitle: "Perte de la Couverture Arborée annuelle (en hectares) par Densité de la Couverture Arborée",
            analysisIFLChartTitle: "Perte de la Couverture Arborée annuelle (en hectares) par Paysage Forestier Intact",
            analysisCSChartTitle: "Perte de la Couverture Arborée annuelle (en hectares) par Biomasse Aérienne (MgC/ha)",

            // Chart Labels
            analysisChartLabels: {
                // Don"t translate the keys, only parts inbetween quotes
                // Also dont change the order, the correctness of the analysis depends on it
                landCover: [ "Forêt dense humide", "Forêt de transition", "Forêt de montagne", "Forêt édaphique", "Mangrove", "Mosaïque forêt-savane", "Complexe rural et forêt secondaire jeune", "Forêt sèche claire et/ou forêt sèche dense", "Savane boisée et/ou savane arborée", "Savane arbustive", "Savane herbeuse", "Prairie aquatique", "Prairie marécagueuse", "Faible couvert végétal", "Mosaïque terres cultivées/végétation naturelle (herbacée ou arbustive)", "Agriculture", "Agriculture irriguée", "Sans couvert végétal", "Villes et zones associées", "Eau"],
                treeDensity: ["31 - 50%", "51 - 74%", "75 - 100%"],
                intactForest: ["Forêt Intacte"],
                carbonStock: ["0", "1 - 10", "11 - 20", "21- 35", "36 - 70", "71 - 100", "101 - 150", "151 - 200", "201 - 300", "Greater than 300"],
                activeFires: {
                    start: "Il y a eu",
                    active: "feux actifs",
                    end: "dans les 7 derniers jours."
                }
            },

            // Draw Tool Tooltips
            drawTools: {
                freehand: "Cliquez puis maintenez pour commencer et relachez pour terminer"
            },

            tcdSelectorBegin: "Affichage des résultats avec",
            tcdSelectorEnd: "densité de la canopée",
            treeCoverSliderLabel: "Régler la densité de la canopée minimale pour la couverture arborée et la perte de la couverture arborée",

            landsatTextLabel: "Images Landsat:",

            mapThemesLabel: "Thèmes de la carte",

            firesOneWeek: "Dernière semaine",
            fires72Hours: "Dernières 72 heures",
            fires48Hours: "Dernières 48 heures",
            fires24Hours: "Dernières 24 heures",

            drawButtonText: "Dessiner",
            uploadButtonText: "Charger",

            uploadInstructions: [
                "Sélectionnez un fichier zip(.zip) contenant un shapefile(.shp,.dbf,.prj) ou un fichier geojson valide (.geojson or .json) dans votre répertoire local.",
                "Le shapefile doit être en système de coordonnées géographiques (WGS84).",
                "Les deux fichiers zippés shapefile et geojson doivent contenir la géométrie de polygone.",
                "Le fichier shapefile zippé ne doit pas depasser 1 Megabyte. Les fichiers de plus de 1 Megabyte ne peuvent pas être téléchargés."
            ],

            lossStartingYear: "Année de début:",
            lossEndingYear: "Année de Fin:",

            accordionForestLossTitle: "Dynamique d'Occupation du Sol",
            accordionLandUseTitle: "Affectation des Terres",
            accordionForestCoverTitle: "Occupation du Sol",

            forestCoverLossLabel: "Perte de la Couverture Arborée (Hansen/UMD/Google/USGS/NASA)",
            activeFiresLabel: "Feux Actifs (les 7 derniers jours, NASA)",
            treeCoverDensityLabel: "Densité de la Couverture Arborée (Hansen/UMD/Google/USGS/NASA)",
            landCoverLabel: "Occupation du Sol",
            treeCoverGainLabel: "Gain de la Couverture Arborée (Hansen/UMD/Google/USGS/NASA)",
            carbonLayerLabel: "Biomasse Aérienne",
            intactForestLayerLabel: "Paysage Forestier Intact",

            treeCoverAnalysis: "Sélectionnez une analyse sur la perte de la couverture arborée ci-dessous:",
            otherAnalysisTypes: "Ou sélectionnez des analyses basées sur l'occupation du sol ou des feux actifs:",

            about: "Au sujet de",
            downloadData: "Télécharger des données",
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
                "dark_gray_canvas": "Toile Gris Foncée",
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

            drawNamingDialogTitle: "Entrez un nom:",
            drawNamingDialogSubmit: "Soumettre",
            drawNamingDialogNoNameError: "Veuillez entrer un nom pour continuer.",

            clearAllFeatures: "Tout effacer",
            deleteCustomFeature: "Effacer l\"objet"

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
            popupDataTab: "Data",
            popupAnalysisTab: "Analysis",
            popupDocumentTab: "Docs",
            documentsUnavailable: "There are no documents available for this area.",

            documentType: "Type",
            documentAuthor: "Author",
            documentDate: "Year",
            documentLink: "PDF",

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
            analysisGain: "Total Tree Cover Loss/Gain",
            analysisLC: "Land Cover",
            // analysisTCD: "Tree Cover Density",
            analysisIFL: "Intact Forest",
            analysisCS: "Biomass",
            analysisFire: "Active Fires",
            analysisLCComposition: "Land Cover Composition",

            analysisLossChartTitle: "Tree Cover Loss in square hectares",
            totalLossAnalysis: "Total Tree Cover Loss <br> (2001 - 2014):",
            totalGainAnalysis: "Total Tree Cover Gained <br> (2001 - 2012):",
            analysisLCChartTitle: "Annual Tree Cover Loss (in hectares) on Land Cover",
            // analysisTCDChartTitle: "Annual Tree Cover Loss (in hectares) on Tree Cover Density",
            analysisIFLChartTitle: "Annual Tree Cover Loss (in hectares) on Intact Forest Landscapes",
            analysisCSChartTitle: "Annual Tree Cover Loss on Above Ground Biomass (MgC/ha)",

            // Chart Labels
            analysisChartLabels: {
                // Don"t translate the keys, only parts inbetween quotes
                // Also dont change the order, the correctness of the analysis depends on it
                landCover: [ "Dense moist forest", "Submontane forest", "Mountain forest", "Edaphic forest", "Mangrove", "Forest-savanna mosaic", "Rural complex and young secondary forest", "Closed to open deciduous woodland", "Savanna woodland-Tree savanna", "Shrubland", "Grassland", "Aquatic grassland", "Swamp grassland", "Sparse vegetation", "Mosaic cultivated areas/vegeatation( herbaceous or shrub)", "Agriculture", "Irrigated agriculture", "Bare areas", "Artificial surfaces and associated areas", "Water Bodies"],
                treeDensity: ["31 - 50%", "51 - 74%", "75 - 100%"],
                intactForest: ["Intact Forest"],
                carbonStock: ["0", "1 - 10", "11 - 20", "21- 35", "36 - 70", "71 - 100", "101 - 150", "151 - 200", "201 - 300", "Greater than 300"],
                activeFires: {
                    start: "There are",
                    active: "active fires",
                    end: "in the last 7 days."
                }
            },

            // Draw Tool Tooltips
            drawTools: {
                freehand: "Press down to start and let go to finish"
            },

            tcdSelectorBegin: "Displaying results with",
            tcdSelectorEnd: "canopy density",
            treeCoverSliderLabel: "Adjust the minimum canopy density for tree cover and tree cover loss",

            landsatTextLabel: "Landsat imagery:",

            mapThemesLabel: "Map Themes",

            firesOneWeek: "Past Week",
            fires72Hours: "Past 72 hours",
            fires48Hours: "Past 48 hours",
            fires24Hours: "Past 24 hours",

            drawButtonText: "Draw",
            uploadButtonText: "Upload",

            uploadInstructions: [
                "Select a zip file(.zip) containing a shapefile(.shp,.dbf,.prj) or a valid geojson file (.geojson or .json) from your local file system.",
                "The shapefile must be in Geographic Coordinate System (WGS84).",
                "Both the zipped shapefile and geojson file must contain polygon geometry.",
                "The zipped shapefile should not exceed 1 Megabyte, files larger then 1 Megabyte may not upload."
            ],

            lossStartingYear: "Start of year:",
            lossEndingYear: "End of year:",

            accordionForestCoverTitle: "Land Cover",
            accordionForestLossTitle: "Land Cover Dynamics",
            accordionLandUseTitle: "Land Use",

            forestCoverLossLabel: "Tree Cover Loss (Hansen/UMD/Google/USGS/NASA)",
            activeFiresLabel: "Active Fires (last 7 days, NASA)",
            treeCoverDensityLabel: "Tree Cover Density (Hansen/UMD/Google/USGS/NASA)",
            landCoverLabel: "Land Cover",
            treeCoverGainLabel: "Tree Cover Gain (Hansen/UMD/Google/USGS/NASA)",
            carbonLayerLabel: "Above Ground Biomass",
            intactForestLayerLabel: "Intact Forest Landscape",

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

            drawNamingDialogTitle: "Enter a name:",
            drawNamingDialogSubmit: "Submit",
            drawNamingDialogNoNameError: "Please enter a name to continue.",

            clearAllFeatures: "Clear all",
            deleteCustomFeature: "delete feature"


        }

    };

    return o;
});
