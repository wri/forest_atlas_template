import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, {PropTypes} from 'react';

const LossGainBadge = (props, context) => {
  const {lossCounts, gainCounts} = props;
  const {language} = context;

  const lossTotal = lossCounts.reduce((a, b) => { return a + b; }, 0);
  const gainTotal = gainCounts.reduce((a, b) => { return a + b; }, 0);

  return (
    <div className='results__loss-gain'>
      {lossTotal}
      {gainTotal}
    </div>
  );
};

LossGainBadge.propTypes = {
  lossCounts: PropTypes.array.isRequired,
  gainCounts: PropTypes.array.isRequired
};

LossGainBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { LossGainBadge as default };
