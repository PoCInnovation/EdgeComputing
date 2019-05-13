import { SceneInterface } from '@edge-computing/interfaces';
import gql from 'graphql-tag';

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
