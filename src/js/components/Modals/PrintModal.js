import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import PrintTemplate from 'esri/tasks/PrintTemplate';
import mapActions from 'actions/MapActions';
import PrintDijit from 'esri/dijit/Print';
import keys from 'constants/StringKeys';
import text from 'js/languages';
import React, { Component, PropTypes } from 'react';

let print;

const createPrintWidget = function createPrintWidget (settings, map, node) {
  //- Get this information from ArcGIS Online Configurations
  const options = { scalebarUnit: 'Kilometers' };
  const layouts = [{
    name: 'MAP_ONLY',
    label: 'Map Image (jpg)',
    format: 'jpg',
    options: options
  }];

  //- Add in any layouts passed in from arcgis online
  if (settings.country) {
    layouts.push({
      name: `${settings.country}_Landscape`,
      label: 'Landscape (pdf)',
      format: 'pdf',
      options: options
    });
  }

  const templates = layouts.map((layout) => {
    let template = new PrintTemplate();
    template.layout = layout.name;
    template.label = layout.label;
    template.format = layout.format;
    template.layoutOptions = layout.options;
    return template;
  });

  print = new PrintDijit({
    url: settings.printURL,
    templates: templates,
    map: map
  }, node);

  print.startup();
};

export default class PrintModal extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  componentWillReceiveProps() {
    const { settings, map } = this.context;
    const node = this.refs.print;
    if (map.loaded && !print) {
      createPrintWidget(settings, map, node);
    }
  }

  close = () => {
    mapActions.togglePrintModal({ visible: false });
  };

  render () {
    const { language } = this.context;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className='print-dijit-label'>
          {text[language][keys.PRINT_BUTTON_LABEL]}
        </div>
        <div ref='print' className='print-dijit' />
      </ControlledModalWrapper>
    );
  }

}
