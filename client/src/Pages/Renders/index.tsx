import React from 'react';
import { Query, QueryResult } from 'react-apollo';

import { GRAPHQL_QUERY, QueryInterface } from './Query';
import { RenderQuery } from './RenderQuery';

const Renders: React.FC = () => (
  <Query query={GRAPHQL_QUERY}>
    {({ loading, error, data }: QueryResult<QueryInterface>) => {
      if (loading) return "Loading...";
      if (error || data === undefined) return `Error! ${error !== undefined ? error.message : null}`

      return <RenderQuery scenes={data.scenes} />;
    }}
  </Query>
);

export default Renders;
