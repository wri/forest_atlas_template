import Navigation from 'components/Navigation/Navigation';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Header extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired
  };

  render () {
    const {
      language,
      settings
    } = this.context;

    let {labels} = settings,
        title, subtitle;

    if (labels) {
      let text = labels[language];
      title = text.title;
      subtitle = text.subtitle;
    } else {
      title = '';
      subtitle = '';
    }

    return (
      <div className='app-header'>
        <div className='inner flex'>
          <div className='app-header__title-container'>
            <div className='app-header__title'>{title}</div>
            <div className='app-header__subtitle'>{subtitle}</div>
          </div>
          <Navigation />
        </div>
      </div>
    );
  }
}
