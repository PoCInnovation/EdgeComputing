import React from 'react';

interface UploaderState {
  fileContent: string;
};

class Uploader extends React.Component<{}, UploaderState> {
  state = {
    fileContent: 'Press the upload button to upload a config'
  };

  async onFileUploaded(fileList: FileList | null) {
    if (fileList !== null && fileList.length !== 0) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        if (fileReader.result !== null) {
          this.setState({fileContent: JSON.stringify(JSON.parse(fileReader.result.toString()), null, 2)});
        }
      }

      fileReader.readAsText(fileList[0]);
    }
  }

  render() {
    return (
      <>
        <input type='file' accept='.json' onChange={e => this.onFileUploaded(e.target.files)} />
        <pre style={{textAlign: 'start'}}>
          {this.state.fileContent}
        </pre>
      </>
    );
  }
};

export default Uploader;
