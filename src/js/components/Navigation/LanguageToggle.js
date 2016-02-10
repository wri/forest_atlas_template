import appActions from 'actions/AppActions';
import React, {
  Component,
  PropTypes
} from 'react';

const getLanguageLabel = (isocode) => {
  switch (isocode) {
    case 'en':
      return 'English';
    case 'fr':
      return 'Français';
    case 'es':
      return 'Spanish';
    case 'pr':
      return 'Portugese';
  }
};

export default class LanguageToggle extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  createListButton = (currentLanguage, isocode) => {
    return (
      <li
        className={`app-header__nav-option pointer ${currentLanguage === isocode ? 'active' : ''}`}
        onClick={this.toggleLanguage}
        data-lang={isocode}>
        {getLanguageLabel(isocode)}
      </li>
    );
  };

  toggleLanguage = (evt) => {
    const {target} = evt;
    const lang = target.getAttribute('data-lang');
    if (lang) {
      appActions.setLanguage(lang);
    }
  };

  render () {
    const {
      language,
      settings
    } = this.context;

    let languageButtons = [];
    for (let iso in settings.labels) {
      languageButtons.push(this.createListButton(language, iso));
    }

    return (
      <div className='app-header__nav-options'>
        <div className='app-header__nav-separator' />
        <ul className='app-header__nav-list'>
          {languageButtons}
        </ul>
      </div>
    );
  }

}
