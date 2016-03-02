import tabKeys from 'constants/TabViewConstants';
import mapActions from 'actions/MapActions';
import React, {Component, PropTypes} from 'react';

//- Parse Keys for easier access
const {
  DOCUMENTS,
  LAYERS,
  ANALYSIS,
  INFO_WINDOW
} = tabKeys;

const documentsSvg = '<use xlink:href="#icon-documents" />';
const dataSvg = '<use xlink:href="#icon-data" />';
const layersSvg = '<use xlink:href="#icon-basemap" />';
const analysisSvg = '<use xlink:href="#icon-analysis" />';

export default class TabButtons extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired
  };

  changeTab = (evt) => {
    const {currentTarget} = evt;
    const {activeTab} = this.props;
    let id = currentTarget.getAttribute('data-value');
    //- If they clicked the already active tab, set activeTab to '' which will hide the contents
    if (id === activeTab) { id = ''; }
    mapActions.changeActiveTab(id);
  };

  getClassName = (id) => {
    const base = 'tab-buttons__tab pointer';
    const {activeTab} = this.props;
    return `${base} ${activeTab === id ? '' : 'inactive'}`;
  };

  render () {
    const {settings} = this.context;

    return (
      <nav className='tab-buttons map-component'>
        <ul className='tab-buttons__header'>
          <li className={this.getClassName(LAYERS)} data-value={LAYERS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: layersSvg }}/>
          </li>
          <li className={this.getClassName(INFO_WINDOW)} data-value={INFO_WINDOW} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: dataSvg }}/>
          </li>
          <li className={this.getClassName(ANALYSIS)} data-value={ANALYSIS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
          </li>
          {!settings.includeDocumentsTab ? null :
            <li className={this.getClassName(DOCUMENTS)} data-value={DOCUMENTS} onClick={this.changeTab}>
              <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: documentsSvg }}/>
            </li>
          }
        </ul>
      </nav>
    );
  }

}

TabButtons.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
