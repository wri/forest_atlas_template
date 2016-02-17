import analysisKeys from 'constants/AnalysisConstants';
import {analysisConfig} from 'js/config';
import Deferred from 'dojo/Deferred';

/**
* @param {string} analysisKey - Value from Analysis Select, also key to options in config
* @param {Graphic} feature - Esri feature
* @param {number} canopyDensity - Tree Cover Canopy density setting
* @return {promise}
*/
export default function (analysisKey, feature, canopyDensity) {
  if (brApp.debug) { console.log('analysis >>> starting'); }
  const config = analysisConfig[analysisKey];
  let promise = new Deferred();
  console.log(config);

  switch (analysisKey) {
    case analysisKeys.FIRES:
    console.log('Fires');
    break;
    case analysisKeys.LCC:
    console.log('Land cover composition');
    break;
    case analysisKeys.SLOPE:
    console.log('Slope');
    break;
    case analysisKeys.TC_LOSS_GAIN:
    console.log('Loss/Gain');
    break;
    case analysisKeys.TC_LOSS:
    case analysisKeys.LC_LOSS:
    case analysisKeys.BIO_LOSS:
    case analysisKeys.INTACT_LOSS:
    console.log('Loss');
    break;
    //- This should only be the restoration analysis, since its value is a plain rasterId
    default:
    console.log('Restoration');
    console.log('Raster Id: ', analysisKey);
    break;
  }

  return promise;
}
