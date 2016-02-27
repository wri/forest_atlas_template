import React, { PropTypes } from 'react';
/**
* Requies an svg symbol on the page with id shape-close, jade syntax
* svg.hidden
*   symbol#shape-close(viewbox='0 0 25 25')
*     title Close
*     path(d='M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z')
*/
const closeSvg = '<use xlink:href="#shape-close" />';

/**
* Should be wrapped in a component with relative or absolute position
*/
export default function ControlledModalWrapper (props) {
  return (
    <div className='modal-container'>
      <div className='modal-background' onClick={props.onClose} />
      <article className='modal shadow'>
        <div title='close' className='close-icon pointer' onClick={props.onClose} >
          <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
        </div>
          <div className='modal-content custom-scroll'>
            {props.children}
          </div>
      </article>
    </div>
  );
}

ControlledModalWrapper.propTypes = {
  onClose: PropTypes.func.isRequired
};
