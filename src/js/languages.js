import analysisKeys from 'constants/AnalysisConstants';
import keys from 'constants/StringKeys';

const strings = { en: {}, fr: {}, es: {}, pt: {} };
//- NOTE: English
//- Layers
strings.en[keys.LAND_COVER_LABEL] = 'Land cover';
strings.en[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.en[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.en[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.en[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.en[keys.GAIN_LABEL] = 'Tree cover gain';
strings.en[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.en[keys.LOSS_LABEL] = 'Tree cover loss';
strings.en[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.en[keys.IFL_LABEL] = 'Intact forest loss';
strings.en[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.en[keys.NAV_ABOUT] = 'About';
strings.en[keys.NAV_DOWNLOAD] = 'Download Data';
strings.en[keys.NAV_MAP_THEMES] = 'Map Themes';
//- Analysis
strings.en[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.en[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.en[keys.ANALYSIS_OR] = 'Or';
strings.en[keys.ANALYSIS_DRAW_INSTRUCTIONS] = 'Draw in the map the area you want to analyze';
strings.en[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.en[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.en[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.en[keys.ANALYSIS_LCC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.en[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.en[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.en[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
//- Group and value should not be modified, Group labels are configured below
strings.en[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Potential according to slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.en[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.en[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to slope';
strings.en[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';



//- NOTE: French
strings.fr[keys.LAND_COVER_LABEL] = 'Land cover';
strings.fr[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.fr[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.fr[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.fr[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.fr[keys.GAIN_LABEL] = 'Tree cover gain';
strings.fr[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.fr[keys.LOSS_LABEL] = 'Tree cover loss';
strings.fr[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.fr[keys.IFL_LABEL] = 'Intact forest loss';
strings.fr[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.fr[keys.NAV_ABOUT] = 'About';
strings.fr[keys.NAV_DOWNLOAD] = 'Download Data';
strings.fr[keys.NAV_MAP_THEMES] = 'Map Themes';
//- Analysis
strings.fr[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.fr[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.fr[keys.ANALYSIS_OR] = 'Or';
strings.fr[keys.ANALYSIS_DRAW_INSTRUCTIONS] = 'Draw in the map the area you want to analyze';
strings.fr[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.fr[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.fr[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.fr[keys.ANALYSIS_LCC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.fr[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.fr[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.fr[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
//- Group and value should not be modified, Group labels are configured below
strings.fr[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Potential according to slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.fr[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.fr[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to slope';
strings.fr[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';


//- NOTE: Spanish
strings.es[keys.LAND_COVER_LABEL] = 'Land cover';
strings.es[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.es[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.es[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.es[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.es[keys.GAIN_LABEL] = 'Tree cover gain';
strings.es[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.es[keys.LOSS_LABEL] = 'Tree cover loss';
strings.es[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.es[keys.IFL_LABEL] = 'Intact forest loss';
strings.es[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.es[keys.NAV_ABOUT] = 'About';
strings.es[keys.NAV_DOWNLOAD] = 'Download Data';
strings.es[keys.NAV_MAP_THEMES] = 'Map Themes';
//- Analysis
strings.es[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.es[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.es[keys.ANALYSIS_OR] = 'Or';
strings.es[keys.ANALYSIS_DRAW_INSTRUCTIONS] = 'Draw in the map the area you want to analyze';
strings.es[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.es[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.es[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.es[keys.ANALYSIS_LCC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.es[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.es[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.es[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
//- Group and value should not be modified, Group labels are configured below
strings.es[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Potential according to slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.es[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.es[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to slope';
strings.es[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';


//- NOTE: Portugese
strings.pt[keys.LAND_COVER_LABEL] = 'Land cover';
strings.pt[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings.pt[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings.pt[keys.TREE_COVER_LABEL] = 'Tree cover';
strings.pt[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings.pt[keys.GAIN_LABEL] = 'Tree cover gain';
strings.pt[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.pt[keys.LOSS_LABEL] = 'Tree cover loss';
strings.pt[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings.pt[keys.IFL_LABEL] = 'Intact forest loss';
strings.pt[keys.CARBON_LABEL] = 'Above ground biomass';
//- Header
strings.pt[keys.NAV_ABOUT] = 'About';
strings.pt[keys.NAV_DOWNLOAD] = 'Download Data';
strings.pt[keys.NAV_MAP_THEMES] = 'Map Themes';
//- Analysis
strings.pt[keys.ANALYSIS_INSTRUCTION_HEADER] = 'Analyze a shape on the map';
strings.pt[keys.ANALYSIS_INSTRUCTION_LIST] = [
  'Use the layers tab to turn on a data layer',
  'Select a shape on the map',
  'Click on the analyze tab'
];
strings.pt[keys.ANALYSIS_OR] = 'Or';
strings.pt[keys.ANALYSIS_DRAW_INSTRUCTIONS] = 'Draw in the map the area you want to analyze';
strings.pt[keys.ANALYSIS_DRAW_BUTTON] = 'Start drawing';
strings.pt[keys.ANALYSIS_SHAPEFILE_UPLOAD] = 'or drop a custom shapefile here';
strings.pt[keys.ANALYSIS_SELECT_TYPE_LABEL] = 'Select Analysis:';
//- Chart Labels in the Analysis
strings.pt[keys.ANALYSIS_LCC_LABELS] = ['Dense moist forest', 'Submontane forest', 'Mountain forest', 'Edaphic forest', 'Mangrove', 'Forest-savanna mosaic', 'Rural complex and young secondary forest', 'Closed to open deciduous woodland', 'Savanna woodland-Tree savanna', 'Shrubland', 'Grassland', 'Aquatic grassland', 'Swamp grassland', 'Sparse vegetation', 'Mosaic cultivated areas/vegeatation( herbaceous or shrub)', 'Agriculture', 'Irrigated agriculture', 'Bare areas', 'Artificial surfaces and associated areas', 'Water Bodies'];
strings.pt[keys.ANALYSIS_FIRES_PRE] = 'There are';
strings.pt[keys.ANALYSIS_FIRES_ACTIVE] = 'active fires';
strings.pt[keys.ANALYSIS_FIRES_POST] = 'in the last 7 days';
//- Group and value should not be modified, Group labels are configured below
strings.pt[keys.ANALYSIS_SELECT_TYPE_OPTIONS] = [
  { label: 'Potential according to slope',
    value: analysisKeys.SLOPE,
    group: keys.ANALYSIS_GROUP_SLOPE
  },
  { label: 'Tree cover loss',
    value: analysisKeys.TC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Total tree cover loss/gain',
    value: analysisKeys.TC_LOSS_GAIN,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover loss',
    value: analysisKeys.LC_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Biomass loss',
    value: analysisKeys.BIO_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Intact forest loss',
    value: analysisKeys.INTACT_LOSS,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Active fires',
    value: analysisKeys.FIRES,
    group: keys.ANALYSIS_GROUP_OTHER
  },
  { label: 'Land cover composition',
    value: analysisKeys.LCC,
    group: keys.ANALYSIS_GROUP_OTHER
  }
];
strings.pt[keys.ANALYSIS_GROUP_RESTORATION] = 'Restoration potential for';
strings.pt[keys.ANALYSIS_GROUP_SLOPE] = 'Potential according to slope';
strings.pt[keys.ANALYSIS_GROUP_OTHER] = 'Other analysis';


export { strings as default };
