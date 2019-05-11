import gql from 'graphql-tag';

import Scene from '../../Interfaces/Scene';

export const GRAPHQL_QUERY = gql`
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

export interface QueryInterface {
  scene: Scene;
};
