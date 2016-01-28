import appActions from 'actions/AppActions';
import Header from 'components/Header';
import AppStore from 'stores/AppStore';
import React, {Component} from 'react';
import template from 'utils/template';
import Map from 'components/Map';

export default class App extends Component {

  constructor (props) {
    super(props);
    this.state = AppStore.getState();
  }

  componentDidMount() {
    AppStore.listen(this.storeDidUpdate);
    template.getAppInfo().then(settings => {
      appActions.applySettings(settings);
    });
  }

  storeDidUpdate = () => {
    this.setState(AppStore.getState());
  };

  render () {
    return (
      <div className='root'>
        <Header {...this.state} />
        <Map {...this.state} />
      </div>
    );
  }

}
