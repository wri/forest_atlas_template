import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const drawSvg = '<use xlink:href="#icon-analysis-draw" />';

export default class Tools extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
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
        <div className='fa-button gold analysis-instructions__draw-button'>
          {text[language][keys.ANALYSIS_DRAW_BUTTON]}
        </div>
        <div className='analysis-instructions__upload-area'>
          {text[language][keys.ANALYSIS_SHAPEFILE_UPLOAD]}
        </div>
      </div>
    );
  }

}
