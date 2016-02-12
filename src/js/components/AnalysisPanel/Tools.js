import scaleUtils from 'esri/geometry/scaleUtils';
import keys from 'constants/StringKeys';
import {uploadConfig} from 'js/config';
import Loader from 'components/Loader';
import Draw from 'esri/toolbars/draw';
import request from 'utils/request';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const TYPE = {
  ZIP: 'application/zip',
  JSON: 'application/json',
  SHAPEFILE: 'shapefile',
  GEOJSON: 'geojson'
};

const drawSvg = '<use xlink:href="#icon-analysis-draw" />';

let toolbar;

export default class Tools extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      dndActive: false,
      drawButtonActive: false,
      isUploading: false
    };
  }

  componentWillReceiveProps() {
    const {map} = this.context;
    if (!toolbar && map.loaded) {
      toolbar = new Draw(map);
      toolbar.on('draw-end', (evt) => {
        console.dir(evt.geometry);
        toolbar.deactivate();
        this.setState({ drawButtonActive: false });
      });
    }
  }

  draw = () => {
    toolbar.activate(Draw.FREEHAND_POLYGON);
    this.setState({ drawButtonActive: true });
  };

  //- DnD Functions
  prevent = (evt) => {
    evt.preventDefault();
    return false;
  };

  enter = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: true });
  };

  leave = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: false });
  };

  drop = (evt) => {
    evt.preventDefault();
    const {map} = this.context;
    const file = evt.dataTransfer &&
                 evt.dataTransfer.files &&
                 evt.dataTransfer.files[0];

    if (!file) {
      return;
    }

    //- Update the view
    this.setState({
      dndActive: false,
      isUploading: true
    });

    let extent = scaleUtils.getExtentForScale(map, 40000);
    let type = file.type === TYPE.ZIP ? TYPE.SHAPEFILE : TYPE.GEOJSON;
    let params = uploadConfig.shapefileParams(file.name, map.spatialReference, extent.getWidth(), map.width);
    let content = uploadConfig.shapefileContent(JSON.stringify(params), type);

    // the upload input needs to have the file associated to it
    let input = this.refs.fileInput;
    input.files = evt.dataTransfer.files;

    request.upload(uploadConfig.portal, content, this.refs.upload).then((response) => {
      this.setState({ isUploading: false });
      console.log(response);
    }, (error) => {
      this.setState({ isUploading: false });
      console.dir(error);
    });

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
        <div
          className={`fa-button gold analysis-instructions__draw-button ${this.state.drawButtonActive ? 'active' : ''}`}
          onClick={this.draw}>
          {text[language][keys.ANALYSIS_DRAW_BUTTON]}
        </div>
        <form
          className={`analysis-instructions__upload-container ${this.state.dndActive ? 'active' : ''}`}
          encType='multipart/form-data'
          onDragEnter={this.enter}
          onDragLeave={this.leave}
          onDragOver={this.prevent}
          onDrop={this.drop}
          name='upload'
          ref='upload'
          >
          <Loader active={this.state.isUploading} />
          <span className='analysis-instructions__upload'>
            {text[language][keys.ANALYSIS_SHAPEFILE_UPLOAD]}
          </span>
          <input type='file' name='file' ref='fileInput' />
          <input type='hidden' name='publishParameters' value='{}' />
					<input type='hidden' name='filetype' value='shapefile' />
					<input type='hidden' name='f' value='json' />
        </form>
      </div>
    );
  }

}
