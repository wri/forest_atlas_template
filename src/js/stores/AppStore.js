import appActions from 'actions/AppActions';
import dispatcher from 'js/dispatcher';

class AppStore {

  constructor () {

    this.language = 'en';

    this.bindListeners({
      setLanguage: appActions.setLanguage
    });

  }

  setLanguage (payload) {
    this.language = payload.language;
  }

}

export default dispatcher.createStore(AppStore, 'AppStore');
