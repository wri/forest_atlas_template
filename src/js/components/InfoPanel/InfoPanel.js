import React from 'react';

const InfoPanel = (props) => {
  return (
    <div className={`info-panel map-component shadow ${props.visible ? '' : 'hidden'}`}>
      {props.children}
    </div>
  );
};

InfoPanel.propTypes = {
  visible: React.PropTypes.bool.isRequired
};

export { InfoPanel as default };
