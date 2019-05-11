import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import SocketIO from 'socket.io-client';
import { ThemeProps, withTheme } from 'styled-components';

import Config from '../Components/Config';
import { ThemeInterface } from '../Configs/Theme';
import Scene from '../Interfaces/Scene';

const GET_SCENE = gql`
  query scene($id: Int!) {
    scene(id: $id) {
      name
      width
      height
      createdAt
      updatedAt
      isFinished
    }
  }
`;

interface QueryInterface {
  scene: Scene;
};

interface RenderProps {
  id: string;
};

interface ConnectedIndicatorProps {
  id: string;
};

interface ConnectedIndicatorState {
  numberOfConnected: number;
};

class ConnectedIndicator extends React.Component<ConnectedIndicatorProps, ConnectedIndicatorState> {
  state = {
    numberOfConnected: 0
  };

  async connectHandler({ count }: { count: number }) {
    this.setState({ numberOfConnected: count });
  }

  async connectedCountHandler({ count }: { count: number }) {
    this.setState({ numberOfConnected: count });
  }

  componentDidMount() {
    const io = SocketIO('/worker', {
      query: {
        id: this.props.id
      }
    });

    io.on('connectedCount', (data: any) => this.connectedCountHandler(data));
  }

  render() {
    return (
      <h6>Connected: {this.state.numberOfConnected}</h6>
    )
  }
};

const RenderScene: React.FC<RenderProps & QueryInterface & ThemeProps<ThemeInterface>> = ({ id, scene, theme }) => (
  <>
    <div style={{marginBottom: '4rem'}}>
      <h1 style={{margin: 0}}>{ scene.name }</h1>
      <h4 style={{margin: '.2rem'}}>({scene.width} x {scene.height})</h4>
    </div>
    <Config id={Number(id)} />
    <ConnectedIndicator id={id} />
    <canvas
      width={scene.width}
      height={scene.height}
      style={{
        marginTop: '2rem',
        maxWidth: '1280px',
        maxHeight: '720px',
        backgroundColor: theme.colors.thirdary
      }}
    />
  </>
);

const Render: React.FC<RouteComponentProps<RenderProps> & ThemeProps<ThemeInterface>> = ({ match, theme }) => (
  <Query query={GET_SCENE} variables={{ id: Number(match.params.id) }}>
    {({ loading, error, data }: QueryResult<QueryInterface>) => {
      if (loading) return "Loading...";
      if (error || data === undefined) return `Error! ${error !== undefined ? error.message : null}`;

      if (data.scene == null) {
        return (
          <div style={{marginBottom: '6rem'}}>
            <h3 style={{margin: 0}}>
              Oups! This render doesn't exist!
            </h3>
          </div>
        );
      }

      return <RenderScene id={match.params.id} scene={data.scene} theme={theme} />
    }}
  </Query>
);

export default withTheme(Render);
