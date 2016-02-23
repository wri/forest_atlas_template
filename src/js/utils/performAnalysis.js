import analysisKeys from 'constants/AnalysisConstants';
import analysisUtils from 'utils/analysisUtils';
import {analysisConfig} from 'js/config';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';

/**
* @param {string} analysisType - Value from Analysis Select, also key to options in config
* @param {Graphic} feature - Esri feature
* @param {number} canopyDensity - Tree Cover Canopy density setting
* @param {object} settings - Application settings from resources.js
* @return {promise}
*/
export default function performAnalysis (analysisType, feature, canopyDensity, settings) {
  const config = analysisConfig[analysisType];
  let promise = new Deferred();

  switch (analysisType) {
    case analysisKeys.FIRES:
      analysisUtils.getFireCount(config.url, feature).then(promise.resolve);
    break;
    case analysisKeys.LCC:
      analysisUtils.getMosaic(config.lockRaster, feature).then(promise.resolve);
    break;
    case analysisKeys.TC_LOSS:
      analysisUtils.getCountsWithDensity(config.raster, feature, canopyDensity).then(promise.resolve);
    break;
    case analysisKeys.SLOPE:
      const url = settings.restorationImageServer;
      const {id, restoration} = config;
      analysisUtils.getSlope(url, 1, id, restoration, feature).then(promise.resolve);
    break;
    case analysisKeys.TC_LOSS_GAIN:
      all([
        analysisUtils.getCountsWithDensity(config.lossRaster, feature, canopyDensity),
        analysisUtils.getCountsWithDensity(config.gainRaster, feature, canopyDensity)
      ]).then((response) => {
        promise.resolve({
          lossCounts: response[0].counts,
          gainCounts: response[1].counts
        });
      });
    break;
    case analysisKeys.LC_LOSS:
    case analysisKeys.BIO_LOSS:
    case analysisKeys.INTACT_LOSS:
      promise.resolve(true);
    break;
    //- This should only be the restoration analysis, since its value is a plain rasterId
    default:
      console.log(analysisType);
      promise.resolve(true);
    break;
  }

  return promise;
}
