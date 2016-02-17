import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class Instructions extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index}>{instruction}</li>
    );
  };

  render () {
    const {language} = this.context;

    return (
      <div className='analysis-instructions'>
        <h3 className='analysis-instructions__header'>
          {text[language][keys.ANALYSIS_INSTRUCTION_HEADER]}
        </h3>
        <ol className='analysis-instructions__olist'>
          {text[language][keys.ANALYSIS_INSTRUCTION_LIST].map(this.renderInstructionList)}
        </ol>
        <div className='analysis-instructions__separator'>
          {text[language][keys.ANALYSIS_OR]}
        </div>
      </div>
    );
  }

}
