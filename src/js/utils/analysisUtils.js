import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';
import Deferred from 'dojo/Deferred';

const INVALID_IMAGE_SIZE = 'The requested image exceeds the size limit.';

/**
* check if the error is for an invalid image size so we can retry the request with a
* larger pixel size
*/
const errorIsInvalidImageSize = function errorIsInvalidImageSize (error) {
  return (
    error.code === 400 &&
    error.details &&
    error.details.length > 0 &&
    error.details[0] === INVALID_IMAGE_SIZE
  );
};

const formatters = {
  fires: (response) => {
    return {
      fireCount: response.features ? response.features.length : 0
    };
  }
};

export default {

  getFireCount: (url, feature) => {
    const queryTask = new QueryTask(url);
    const promise = new Deferred();
    let query = new Query();
    query.geometry = feature.geometry;
    query.returnGeometry = false;
    query.outFields = [''];
    query.where = '1 = 1';
    queryTask.execute(query).then(function (response) {
      promise.resolve(formatters.fires(response));
    }, (error) => {
      promise.resolve(formatters.fires(error));
    });
    return promise;
  }

};
