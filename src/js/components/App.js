import Header from 'components/Header';
import AppStore from 'stores/AppStore';
import React, {Component} from 'react';
import Map from 'components/Map';

export default class App extends Component {

  constructor (props) {
    super(props);
    this.state = AppStore.getState();
    AppStore.listen(this.storeDidUpdate);
  }

  storeDidUpdate = () => {
    this.setState(AppStore.getState());
  };

  render () {
    return (
      <div className='root'>
        <Header language={this.state.language} />
        <Map language={this.state.language} />
      </div>
    );
  }

}
