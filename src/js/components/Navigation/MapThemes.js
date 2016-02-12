import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';


export default class MapThemes extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  renderThemeList = (theme, index) => {
    return (
      <li key={index} className='app-header__theme'>
        <a target='_blank' href={theme.url}>{theme.label}</a>
      </li>
    );
  };

  render () {
    const {language} = this.context;
    const {themes} = this.props;
    //- className should be the same as in Navigation component under app-header__nav-list
    return (
      <li className='app-header__nav-link app-header__nav-link--map-themes pointer'>
        {text[language][keys.NAV_MAP_THEMES]}
        <ul className='app-header__theme-list shadow'>
          {themes.map(this.renderThemeList)}
        </ul>
      </li>
    );
  }

}

MapThemes.propTypes = {
  themes: PropTypes.array.isRequired
};
