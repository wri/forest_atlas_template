import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const drawSvg = '<use xlink:href="#icon-analysis-draw" />';

export default class Tools extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      dndActive: false,
      drawButtonActive: false
    };
  }

  draw = () => {

  };

  //- DnD Functions
  prevent = (evt) => {
    evt.preventDefault();
    return false;
  };

  enter = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: true });
  };

  leave = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: false });
  };

  drop = (evt) => {
    evt.preventDefault();
    console.log('Hey Ohh');
    return false;
  };

  render () {
    const {language} = this.context;

    return (
      <div className='analysis-instructions__draw'>
        <h3 className='analysis-instructions__header'>
          {text[language][keys.ANALYSIS_DRAW_INSTRUCTIONS]}
        </h3>
        <div className='analysis-instructions__draw-icon-container'>
          <svg className='analysis-instructions__draw-icon' dangerouslySetInnerHTML={{ __html: drawSvg }} />
        </div>
        <div className='fa-button gold analysis-instructions__draw-button' onClick={this.draw}>
          {text[language][keys.ANALYSIS_DRAW_BUTTON]}
        </div>
        <div
          className={`analysis-instructions__upload-area ${this.state.dndActive ? 'active' : ''}`}
          onDragEnter={this.enter}
          onDragLeave={this.leave}
          onDragOver={this.prevent}
          onDrop={this.drop}
          >
          {text[language][keys.ANALYSIS_SHAPEFILE_UPLOAD]}
        </div>
      </div>
    );
  }

}
