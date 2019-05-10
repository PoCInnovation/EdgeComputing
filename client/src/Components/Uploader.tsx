import React from 'react';

import ValidateConfig from '../utils/ValidateConfig';
import Button from './Button';

interface UploaderState {
  config: any;
};

class Uploader extends React.Component<{}, UploaderState> {
  state = {
    config: {
      name: '',
      width: 0,
      height: 0
    }
  };

  async onFileUploaded(fileList: FileList | null) {
    if (fileList !== null && fileList.length !== 0) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        if (fileReader.result !== null) {
          const config = JSON.parse(fileReader.result.toString());

          if (ValidateConfig(config)) {
            this.setState({
              config: JSON.parse(fileReader.result.toString())
            });
          } else {
            console.error('Invalid config!');
          }
        }
      }

      fileReader.readAsText(fileList[0]);
    }
  }

  render() {
    return (
      <>
        <Button htmlFor='fileInput'>
          Upload file
          <input
            id='fileInput'
            type='file'
            accept='.json'
            onChange={e => this.onFileUploaded(e.target.files)}
            style={{ display: 'none' }}
          />
        </Button>
        <h6>Name: {this.state.config.name}</h6>
        <h6>Width: {this.state.config.width}</h6>
        <h6>Height: {this.state.config.height}</h6>
      </>
    );
  }
};

export default Uploader;
