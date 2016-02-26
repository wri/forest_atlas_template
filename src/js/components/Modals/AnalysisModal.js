import Instructions from 'components/AnalysisPanel/Instructions';
import Tools from 'components/AnalysisPanel/Tools';
import mapActions from 'actions/MapActions';
import React, { Component } from 'react';

let closeSvg = '<use xlink:href="#shape-close" />';

export default class AnalysisModal extends Component {

  close = () => {
    mapActions.toggleAnalysisModal({ visible: false });
  };

  render () {
    return (
      <div className='modal-container'>
        <div className='modal-background' onClick={this.close} />
        <article className='analysis-modal modal shadow'>
          <div title='close' className='close-icon pointer' onClick={this.close} >
            <svg dangerouslySetInnerHTML={{ __html: closeSvg }}/>
          </div>
            <div className='modal-content custom-scroll'>
              <Instructions />
              <Tools />
            </div>
        </article>
      </div>
    );
  }

}
