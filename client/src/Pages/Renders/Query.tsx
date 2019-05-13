import gql from 'graphql-tag';

import { SceneInterface } from '../../edge-computing/interfaces';

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
  scenes: SceneInterface[];
};
