define([], function () {

  return {
    /**
    * @param {string} rasterA - raster id, ex. '$530'
    * @param {string} rasterB - raster id, ex. '$530'
    * @param {number} operation - Enum representing which arithmetic operation to perform
    * - Operation can be 1 (Add), 2 (Subtract), 3 (Multiply)
    * @return {object} valid rendering rule for computeHistograms call
    */
    getArithmeticRule: function (rasterA, rasterB, operation) {
      return {
        'rasterFunction':'Arithmetic',
        'rasterFunctionArguments': {
          'Raster': rasterA,
          'Raster2':rasterB,
          'Operation': operation
        }
      };
    },

    /**
    * @param {string} rasterId - raster id, ex. '$530'
    * @param {array} inputRange - input range should be 2 sets of values, the values are inclusive exclusive
    * first set is ones to remap to 0 and second set remaps to 1, Ex.  If output values are [0, 1]
    * InputValues of [0, 3, 3, 3] means 0 - 2 remaps to 0 and 3 - 3 remaps to 1
    * @param {array} outputValues - outputValues for the remap
    */
    getRemapRule: function (rasterId, inputRange, outputValues) {
      return {
        'rasterFunction': 'Remap',
        'rasterFunctionArguments': {
          'InputRanges': inputRange,
          'OutputValues': outputValues,
          'Raster': rasterId,
          'AllowUnmatched': false
        }
      };
    }
  };

});
