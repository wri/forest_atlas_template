import esriRequest from 'esri/request';

// TODO:  move this somewher else.
import esriConfig from 'esri/config';

export default {
  getLayerMetadata: (url) => {

    let domain = 'gis-treecover.wri.org';
    let cors = esriConfig.defaults.io.corsEnabledServers;
    if ( cors.indexOf(domain) === -1 ) {
      cors.push(domain);
    }

    return esriRequest({
      url: url,
      content: {
        f: 'json'
      }
    });
  }
}
