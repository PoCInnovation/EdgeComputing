import gql from 'graphql-tag';
import React from 'react';
import { Mutation, MutationFunc, MutationResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';

import { SceneInterface } from '../edge-computing/interfaces';
import ValidateConfig from '../utils/ValidateConfig';
import Button from './Button';

const NEW_SCENE = gql`
  mutation newScene($name: String!, $width: Int!, $height: Int!, $config: String!) {
    newScene(scene: {
      name: $name
      width: $width
      height: $height
      config: $config
    }) {
      id
      name
    }
  }
`;

interface ResultInterface {
  newScene: SceneInterface;
};

class Uploader extends React.Component<any, any> {
  async onFileUploaded(fileList: FileList | null, newScene: MutationFunc) {
    if (fileList !== null && fileList.length !== 0) {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        if (fileReader.result !== null) {
          const config = JSON.parse(fileReader.result.toString());

          if (ValidateConfig(config)) {
            newScene({ variables: {
              name: config.name,
              width: config.width,
              height: config.height,
              config: JSON.stringify(config)
            } });
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
      <Mutation mutation={NEW_SCENE}>
        {(newScene: MutationFunc, { error, loading, data }: MutationResult<ResultInterface>) => (
          <>
            {data !== undefined ? (
              <>
                <h6 style={{color: this.props.theme.colors.green}}>
                  Your scene "{data.newScene.name}" has been successfuly uploaded!
                </h6>
                <Link to={`/render/${data.newScene.id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                  <Button>Render it!</Button>
                </Link>
              </>
            ) : (
              <>
                <Button htmlFor='fileInput'>
                  {loading ? 'Uploading' : 'Upload file'}
                  <input
                    id='fileInput'
                    type='file'
                    accept='.json'
                    onChange={e => this.onFileUploaded(e.target.files, newScene)}
                    style={{ display: 'none' }}
                    disabled={loading}
                  />
                </Button>
                {error !== undefined && (
                  <h6 style={{color: this.props.theme.colors.red}}>{ error.message }</h6>
                )}
              </>
            )}
          </>
        )}
      </Mutation>
    );
  }
};

export default withTheme(Uploader);
