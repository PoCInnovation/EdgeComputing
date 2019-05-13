import { SceneInterface } from '@edge-computing/interfaces';
import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import ReactModal from 'react-modal';
import { ThemeProps, withTheme } from 'styled-components';

import { ThemeInterface } from '../Configs/Theme';
import Button from './Button';
import Container from './Container';

const GET_CONFIG = gql`
  query scene($id: Int!) {
    scene(id: $id) {
      config
    }
  }
`;

interface QueryInterface {
  scene: SceneInterface;
};

interface ConfigProps {
  id: number;
};

interface ConfigState {
  showModal: boolean;
};

const RenderConfig: React.FC<ConfigProps> = ({ id }) => {
  const parseConfig = (config: string) => {
    try {
      return JSON.stringify(JSON.parse(config), null, 2);
    } catch(err) {
      return null;
    }
  };

  return (
    <Query query={GET_CONFIG} variables={{ id }}>
      {({ loading, error, data }: QueryResult<QueryInterface>) => {
        if (loading) return "Loading...";
        if (error || data === undefined) return `Error! ${error !== undefined ? error.message : null}`;

        const config = parseConfig(data.scene.config);

        if (config == null) {
          return <h3>Config is invalid</h3>;
        }

        return (
          <pre style={{textAlign: 'start'}}>
            <code>
              {parseConfig(data.scene.config)}
            </code>
          </pre>
        );
      }}
    </Query>
  );
};

class Config extends React.Component<ConfigProps & ThemeProps<ThemeInterface>, ConfigState> {
  state = {
    showModal: false
  };

  async openModal() {
    this.setState({ showModal: true });
  }

  async closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <Button onClick={() => this.openModal()}>View config</Button>
        <ReactModal
          isOpen={this.state.showModal}
          style={{
            overlay: {
              backgroundColor: this.props.theme.colors.main + 'fd',
              zIndex: 5
            }, content: {
              backgroundColor: 'white',
              boxShadow: this.props.theme.shadows.large,
              zIndex: 5
            }
          }}
        >
          <div style={{width: '100%', margin: '1rem'}}>
            <Button white onClick={() => this.closeModal()}>Close</Button>
          </div>
          <Container>
            <RenderConfig id={this.props.id} />
          </Container>
        </ReactModal>
      </>
    );
  }
};

export default withTheme(Config);
