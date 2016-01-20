define([], function () {

  var treeCoverValues = [0, 1, 2, 3, 4, 5, 6];
  var treeCoverClasses = ['No Data', 'Forestland', 'Grassland', 'Cropland', 'Wetland and Waterbodies', 'Settlement', 'Bare soil'];

  var landCoverValues = [0, 1000, 2000, 3000, 4000, 5000];
  var landCoverClasses = ['No Data', '<= 20', '20 - 50', '50 - 150', '150 - 500', '> 500'];

  var populationValues = [0, 10, 20 , 30];
  var populationClasses = ['No Data', '<= 30%', '30 - 60%', '> 60%'];

  var slopeValues = [0, 100, 200, 300];
  var slopeClasses = ['No Data', '<= 10%', '10 - 30%', '> 30%'];

  return {

    imageServer: 'http://gis-gfw.wri.org/arcgis/rest/services/local_projections/ETH_Restoration/ImageServer',

    treeCover: {
      id: '$12',
      values: treeCoverValues,
      classes: treeCoverClasses
    },

    landCover: {
      id: '$1',
      values: landCoverValues,
      classes: landCoverClasses
    },

    population: {
      id: '$2',
      values: populationValues,
      classes: populationValues
    },

    slope: {
      id: '$11',
      values: slopeValues,
      classes: slopeClasses
    }

  };

});
