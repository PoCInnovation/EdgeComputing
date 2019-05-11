import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeProps, withTheme } from 'styled-components';

import { ThemeInterface } from '../../Configs/Theme';
import { GRAPHQL_QUERY, QueryInterface } from './Query';
import { RenderProps, RenderQuery } from './RenderQuery';

const Render: React.FC<RouteComponentProps<RenderProps> & ThemeProps<ThemeInterface>> = ({ match, theme }) => (
  <Query query={GRAPHQL_QUERY} variables={{ id: Number(match.params.id) }}>
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

      return <RenderQuery id={match.params.id} scene={data.scene} theme={theme} />
    }}
  </Query>
);

export default withTheme(Render);
