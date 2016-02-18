import React, {PropTypes} from 'react';

const FiresBadge = (props) => {
  return (
    <div className='results__fires-badge'>
      <div className='results__fires-pre'></div>
      <div className='results__fires-count'>{props.count}</div>
      <div className='results__fires-post'></div>
    </div>
  );
};

FiresBadge.PropTypes = {
  count: PropTypes.number.isRequired
};

export { FiresBadge as default };
