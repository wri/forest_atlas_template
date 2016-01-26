define(['root/analysis/constants'], function (KEYS) {

  var landCoverValues = [0, 1, 2, 3, 4, 5, 6];
  var landCoverClasses = ['No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'];
  var landCoverColors = ['rgb(0, 0, 0)', 'rgb(0, 174, 0)', 'rgb(255, 255, 0)', 'rgb(255, 155, 190)', 'rgb(0, 238, 238)', 'rgb(255, 0, 0)', 'rgb(255, 255, 188)'];

  var populationValues = [0, 1, 2, 3, 4, 5];
  var populationClasses = ['No Data', '<= 20', '20 - 50', '50 - 150', '150 - 500', '> 500'];
  var populationColors = ['rgb(0, 0, 0)', 'rgb(255, 255, 128)', 'rgb(250, 209, 85)', 'rgb(242, 167, 46)', 'rgb(173, 83, 19)', 'rgb(107, 0, 0)'];

  var slopeValues = [0, 1, 2 , 3];
  var slopeClasses = ['No Data', '<= 30%', '30 - 60%', '> 60%'];
  var slopeColors = ['rgb(0, 0, 0)', 'rgb(255, 235, 175)', 'rgb(115, 76, 0)', 'rgb(168, 0, 0)'];

  var treeCoverValues = [0, 1, 2, 3];
  var treeCoverClasses = ['No Data', '<= 10%', '10 - 30%', '> 30%'];
  var treeCoverColors = ['rgb(0, 0, 0)', 'rgb(180, 215, 158)', 'rgb(245, 245, 122)', 'rgb(205, 170, 102)'];

  var config = {
    imageServer: 'http://gis-gfw.wri.org/arcgis/rest/services/local_projections/ETH_Restoration/ImageServer',
  };

  config[KEYS.TREE_COVER] = {
    id: '$12',
    name: '% Tree Cover',
    values: treeCoverValues,
    classes: treeCoverClasses,
    colors: treeCoverColors
  };

  config[KEYS.LAND_COVER] = {
    id: '$1',
    name: 'Land Cover',
    values: landCoverValues,
    classes: landCoverClasses,
    colors: landCoverColors
  };

  config[KEYS.POPULATION] = {
    id: '$2',
    name: 'Population Density',
    values: populationValues,
    classes: populationClasses,
    colors: populationColors
  };

  config[KEYS.SLOPE] = {
    id: '$11',
    name: 'Slope',
    values: slopeValues,
    classes: slopeClasses,
    colors: slopeColors
  };

  return config;

});
