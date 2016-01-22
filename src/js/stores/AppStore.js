import appActions from 'actions/AppActions';
import dispatcher from 'js/dispatcher';

class AppStore {

  constructor () {

    this.language = 'en';
    this.settings = {};

    this.bindListeners({
      setLanguage: appActions.setLanguage,
      applySettings: appActions.applySettings
    });

  }

  setLanguage (language) {
    this.language = language;
  }

  applySettings (settings) {
    this.settings = settings;
  }

}

export default dispatcher.createStore(AppStore, 'AppStore');
