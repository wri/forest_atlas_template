define(['root/analysis/constants'], function (KEYS) {

  var landCoverValues = [0, 1, 2, 3, 4, 5, 6];
  var landCoverClasses = ['No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'];

  var populationValues = [0, 1000, 2000, 3000, 4000, 5000];
  var populationClasses = ['No Data', '<= 20', '20 - 50', '50 - 150', '150 - 500', '> 500'];

  var slopeValues = [0, 10, 20 , 30];
  var slopeClasses = ['No Data', '<= 30%', '30 - 60%', '> 60%'];

  var treeCoverValues = [0, 10, 20, 30];
  var treeCoverClasses = ['No Data', '<= 10%', '10 - 30%', '> 30%'];

  var config = {
    imageServer: 'http://gis-gfw.wri.org/arcgis/rest/services/local_projections/ETH_Restoration/ImageServer',
  };

  config[KEYS.TREE_COVER] = {
    id: '$12',
    values: treeCoverValues,
    classes: treeCoverClasses
  };

  config[KEYS.LAND_COVER] = {
    id: '$1',
    values: landCoverValues,
    classes: landCoverClasses
  };

  config[KEYS.POPULATION] = {
    id: '$2',
    values: populationValues,
    classes: populationValues
  };

  config[KEYS.SLOPE] = {
    id: '$11',
    values: slopeValues,
    classes: slopeClasses
  };

  return config;

});
