import tabKeys from 'constants/TabViewConstants';
import mapActions from 'actions/MapActions';
import React, {Component} from 'react';

//- Parse Keys for easier access
const {
  LAYERS,
  ANALYSIS,
  INFO_WINDOW
} = tabKeys;

const zoomInSvg = '<use xlink:href="#icon-plus" />';

export default class TabButtons extends Component {

  changeTab = (evt) => {
    const {currentTarget} = evt;
    const id = currentTarget.getAttribute('data-value');
    mapActions.changeActiveTab(id);
  };

  getClassName = (id) => {
    const base = 'tab-buttons__tab pointer';
    const {activeTab} = this.props;
    return `${base} ${activeTab === id ? '' : 'inactive'}`;
  };

  render () {
    return (
      <nav className='tab-buttons map-component'>
        <ul className='tab-buttons__header'>
          <li className={this.getClassName(LAYERS)} data-value={LAYERS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
          <li className={this.getClassName(INFO_WINDOW)} data-value={INFO_WINDOW} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
          <li className={this.getClassName(ANALYSIS)} data-value={ANALYSIS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
          <li className={this.getClassName(LAYERS)} data-value={LAYERS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: zoomInSvg }}/>
          </li>
        </ul>
      </nav>
    );
  }

}

TabButtons.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
