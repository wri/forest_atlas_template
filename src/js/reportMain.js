/* eslint no-unused-vars: 0 */
import IdentityManager from 'esri/IdentityManager';
import {corsServers, assetUrls} from 'js/config';
import {loadJS} from 'utils/loaders';
import esriConfig from 'esri/config';
import 'babel-polyfill';

if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

let configureApp = () => {
  corsServers.forEach((server) => { esriConfig.defaults.io.corsEnabledServers.push(server); });
};

let lazyloadAssets = () => {
  loadJS(assetUrls.highcharts);
  loadJS(assetUrls.highchartsMore);
};

configureApp();
lazyloadAssets();

console.log('Lets Goooo');
