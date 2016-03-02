import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import request from 'utils/request';
import React, {
  Component,
  PropTypes
} from 'react';

let currentPromise;

export default class SearchModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    webmapInfo: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  state = {
    suggestions: []
  };

  onClose = () => {
    mapActions.toggleSearchModal({ visible: false });
  };

  keyUp = ({target}) => {
    const {language, webmapInfo} = this.context;
    //- Find a layer to search, this logic comes from the old Forest Atlas,
    //- We will need to discuss how to implement in the new version to support as many layers/fields as possible
    //- and still be performant
    let searchLayer = webmapInfo.operationalLayers.filter((layer) => {
      return layer.id.search(`_${language}`) > -1;
    })[0];

    if (searchLayer && searchLayer.url && target.value !== '') {
      if (currentPromise && !currentPromise.isResolved()) {
        currentPromise.cancel();
      }

      currentPromise = request.findTaskByLayer(target.value, searchLayer);
      currentPromise.then((results) => {
        this.setState({ suggestions: results});
      });
    } else {
      this.setState({ suggestions: []});
    }
  };

  renderSuggestions = (suggestion) => {
    return (
      <div>{suggestion.value}</div>
    );
  };

  render () {
    return (
      <ControlledModalWrapper onClose={this.onClose}>
        <input onKeyUp={this.keyUp}/>
        <div className='suggestions'>
          {this.state.suggestions.map(this.renderSuggestions)}
        </div>
      </ControlledModalWrapper>
    );
  }
}
