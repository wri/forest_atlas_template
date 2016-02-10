import LanguageToggle from 'components/Navigation/LanguageToggle';
import MapThemes from 'components/Navigation/MapThemes';
import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';


export default class Navigation extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  renderMapThemes = (isocode, settings) => {
    let shouldRender = settings.labels &&
                       settings.labels[isocode] &&
                       settings.labels[isocode].themes !== undefined;

    return shouldRender ? <MapThemes themes={settings.labels[isocode].themes} /> : undefined;
  };

  render () {
    const {
      language,
      settings
    } = this.context;

    const LanguageComponent = settings.useAdditionalLanguage ? <LanguageToggle /> : undefined;
    const ThemeComponent = this.renderMapThemes(language, settings);

    return (
      <nav className='app-header__nav'>
        <ul className='app-header__nav-list'>
          <li className='app-header__nav-link pointer'>
            <a href={settings.aboutLinkUrl}>{text[language][keys.NAV_ABOUT]}</a>
          </li>
          <li className='app-header__nav-link pointer'>
            <a href={settings.downloadDataUrl}>{text[language][keys.NAV_DOWNLOAD]}</a>
          </li>
          {ThemeComponent}
        </ul>
        {LanguageComponent}
      </nav>
    );
  }
}
