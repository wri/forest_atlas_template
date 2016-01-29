import React, {Component} from 'react';

export default class Header extends Component {

  constructor (props) {
    super(props);

  }

  render () {
    const {
      defaultTitle
    } = this.props.settings;

    return (
      <div className='app-header'>
        <div className='inner'>
          <div className='app-header__title'>{defaultTitle}</div>
        </div>
      </div>
    );
  }
}
