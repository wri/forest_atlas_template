import dispatcher from 'js/dispatcher';

class AppActions {

  setLanguage (iso) {
    return {
      language: iso
    };
  }

}

export default dispatcher.createActions(AppActions);
