import gql from 'graphql-tag';

import Scene from '../../Interfaces/Scene';

export const GRAPHQL_QUERY = gql`
  {
    scenes {
      id
      name
      createdAt
      isFinished
    }
  }
`;

export interface QueryInterface {
  scenes: Scene[];
};
