import keys from './keys';

let strings = {};

//- Layer Labels and Sublabels
strings[keys.LAND_COVER_LABEL] = 'Land cover';
strings[keys.ACTIVE_FIRES_LABEL] = 'Active fires';
strings[keys.ACTIVE_FIRES_SUB_LABEL] = '(daily, 1km, global, NASA)';
strings[keys.TREE_COVER_LABEL] = 'Tree cover';
strings[keys.TREE_COVER_SUB_LABEL] = '(year 2000, 30m global, Hansen/UMD/Google/USGS/NASA)';
strings[keys.GAIN_LABEL] = 'Tree cover gain';
strings[keys.GAIN_SUB_LABEL] = '(12 years, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings[keys.LOSS_LABEL] = 'Tree cover loss';
strings[keys.LOSS_SUB_LABEL] = '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)';
strings[keys.IFL_LABEL] = 'Intact forest loss';
strings[keys.CARBON_LABEL] = 'Above ground biomass';

export { strings as default };
