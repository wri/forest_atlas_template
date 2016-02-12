import Polygon from 'esri/geometry/Polygon';
import symbols from 'utils/symbols';
import Graphic from 'esri/graphic';

//- Really crappy UUID generator but it works
let cfid = 0;
const customFeatureUUIDGenerator = () => ++cfid;

export default {

  generateDrawnPolygon: (geometry) => {
    return new Graphic(
      new Polygon(geometry),
      symbols.getCustomSymbol(),
      { OBJECTID: customFeatureUUIDGenerator() }
    );
  }

};
