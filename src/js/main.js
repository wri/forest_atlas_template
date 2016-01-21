import App from 'components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import 'babel-polyfill';

if (!_babelPolyfill) { console.log('Missing Babel Polyfill.  May experience some weirdness in IE < 9.'); }

//- Boolean to toggle debug mode, can only be set on page load
let debugMode = location.search.slice(1).search('debug') > -1;

window.brApp = {
  debug: function (message) {
    if (debugMode) {
      var print = typeof message === 'string' ? console.log : console.dir;
      print.apply(console, [message]);
    }
  }
};

// Shim for rAF with timeout for callback
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

let configureApp = () => {
  brApp.debug('Main >>> configureApp');

};

let initializeApp = () => {
  brApp.debug('Main >>> initializeApp');
  ReactDOM.render(<App />, document.getElementById('root'));
};

//- May need to be a deferred, since it will need to fetch the AGOL configuration
configureApp();

initializeApp();
