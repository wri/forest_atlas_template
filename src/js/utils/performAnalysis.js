import analysisKeys from 'constants/AnalysisConstants';
import analysisUtils from 'utils/analysisUtils';
import {analysisConfig} from 'js/config';
import Deferred from 'dojo/Deferred';
import request from 'utils/request';
import all from 'dojo/promise/all';

const restorationAnalysis = () => {
  const promise = new Deferred();
  promise.resolve(true);
  return promise;
};

const compositionAnalysis = () => {
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
* @param {string} analysisKey - Value from Analysis Select, also key to options in config
* @param {Graphic} feature - Esri feature
* @param {number} canopyDensity - Tree Cover Canopy density setting
* @return {promise}
*/
export default function performAnalysis (analysisKey, feature, canopyDensity) {
  const config = analysisConfig[analysisKey];
  let promise = new Deferred();

  switch (analysisKey) {
    case analysisKeys.FIRES:
      request.getFireCount(config.url, feature).then((response) => {
        promise.resolve(analysisUtils.formatFireResults(response));
      });
    break;
    case analysisKeys.LCC:
      compositionAnalysis(config, feature, canopyDensity).then((response) => {
        promise.resolve(response);
      });
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
