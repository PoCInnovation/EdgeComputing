import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
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
        )
      }

      return (
        <>
          <div style={{marginBottom: '4rem'}}>
            <h1 style={{margin: 0}}>{ data.scene.name }</h1>
            <h4 style={{margin: '.2rem'}}>({data.scene.width} x {data.scene.height})</h4>
          </div>
          <Config id={Number(match.params.id)} />
          <canvas id='test' width={data.scene.width} height={data.scene.height} style={{marginTop: '2rem', maxWidth: '1280px', maxHeight: '720px', backgroundColor: theme.colors.thirdary}} />
        </>
      )
    }}
  </Query>
);

export default withTheme(Render);
