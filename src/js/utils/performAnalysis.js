import analysisKeys from 'constants/AnalysisConstants';
import analysisUtils from 'utils/analysisUtils';
import {analysisConfig} from 'js/config';
import Deferred from 'dojo/Deferred';
import all from 'dojo/promise/all';

const restorationAnalysis = () => {
  const promise = new Deferred();
  promise.resolve(true);
  return promise;
};

const slopeAnalysis = () => {
  const promise = new Deferred();
  promise.resolve(true);
  return promise;
};

const gainAnalysis = () => {
  const promise = new Deferred();
  promise.resolve(true);
  return promise;
};

const lossAnalysis = () => {
  const promise = new Deferred();
  setTimeout(() => {
    promise.resolve('Hello');
  }, 500);
  return promise;
};


/**
* @param {string} analysisType - Value from Analysis Select, also key to options in config
* @param {Graphic} feature - Esri feature
* @param {number} canopyDensity - Tree Cover Canopy density setting
* @return {promise}
*/
export default function performAnalysis (analysisType, feature, canopyDensity) {
  const config = analysisConfig[analysisType];
  let promise = new Deferred();

  switch (analysisType) {
    case analysisKeys.FIRES:
      analysisUtils.getFireCount(config.url, feature).then(promise.resolve);
    break;
    case analysisKeys.LCC:
      analysisUtils.getMosaic(config.lockRaster, feature).then(promise.resolve);
    break;
    case analysisKeys.SLOPE:
      slopeAnalysis(config, feature, canopyDensity).then((response) => {
        promise.resolve(response);
      });
    break;
    case analysisKeys.TC_LOSS_GAIN:
      all([
        lossAnalysis(config, feature, canopyDensity),
        gainAnalysis(config, feature, canopyDensity)
      ]).then((response) => {
        promise.resolve(response);
      });
    break;
    case analysisKeys.TC_LOSS:
    case analysisKeys.LC_LOSS:
    case analysisKeys.BIO_LOSS:
    case analysisKeys.INTACT_LOSS:
      lossAnalysis(config, feature, canopyDensity).then((response) => {
        promise.resolve(response);
      });
    break;
    //- This should only be the restoration analysis, since its value is a plain rasterId
    default:
      restorationAnalysis(config, feature, canopyDensity).then((response) => {
        promise.resolve(response);
      });
    break;
  }

  return promise;
}
