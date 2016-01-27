import React, {Component} from 'react';
import resources from 'js/resources';

export default class Header extends Component {

  constructor (props) {
    super(props);

  }

  render () {
    return (
      <div className='app-header'>
        <div className='inner'>
          <div className='app-header__title'>{resources.defaultTitle}</div>
        </div>
      </div>
    );
  }
}
