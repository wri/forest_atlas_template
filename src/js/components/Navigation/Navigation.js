import LanguageToggle from 'components/Navigation/LanguageToggle';
import MapThemes from 'components/Navigation/MapThemes';
import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const aboutSvg = '<use xlink:href="#icon-h-about" />';
const myGFWSvg = '<use xlink:href="#icon-h-mygfw" />';
const downloadSvg = '<use xlink:href="#icon-download" />';

export default class Navigation extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  renderMapThemes = (language, settings) => {
    let shouldRender = settings.labels &&
                       settings.labels[language] &&
                       settings.labels[language].themes !== undefined;

    return shouldRender ? <MapThemes themes={settings.labels[language].themes} /> : undefined;
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
            <a target='_blank' href={settings.aboutLinkUrl}>
              <svg className='svg-icon__nav' dangerouslySetInnerHTML={{ __html: aboutSvg }}/>
              {text[language][keys.NAV_ABOUT]}
            </a>
          </li>
          <li className='app-header__nav-link pointer'>
            <a target='_blank' href={settings.downloadDataUrl}>
              <svg className='svg-icon__nav' dangerouslySetInnerHTML={{ __html: downloadSvg }}/>
              {text[language][keys.NAV_DOWNLOAD]}
            </a>
          </li>
          {ThemeComponent}
          <li className='app-header__nav-link pointer'>
            <a target='_blank'>
              <svg className='svg-icon__nav' dangerouslySetInnerHTML={{ __html: myGFWSvg }}/>
              {text[language][keys.NAV_MY_GFW]}
            </a>
          </li>
        </ul>
        {LanguageComponent}
      </nav>
    );
  }
}
