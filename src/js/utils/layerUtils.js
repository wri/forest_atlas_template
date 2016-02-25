import esriRequest from 'esri/request';

// TODO:  move this somewher else.
import esriConfig from 'esri/config';
let domain = 'gis-treecover.wri.org';
let cors = esri.config.defaults.io.corsEnabledServers;
if ( cors.indexOf(domain) === -1 ) {
  cors.push(domain);
}

export default {
  getLayerMetadata: (url) => {
    return esriRequest({
      url: url,
      content: {
        f: 'json'
      }
    });
  }
}
