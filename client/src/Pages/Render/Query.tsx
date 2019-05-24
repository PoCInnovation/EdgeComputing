import gql from 'graphql-tag';

import { SceneInterface } from '../../edge-computing/interfaces';

export const GRAPHQL_QUERY = gql`
  query scene($id: Int!) {
    scene(id: $id) {
      name
      width
      height
      createdAt
      updatedAt
      isFinished
      image
    }
  }
`;

export interface QueryInterface {
  scene: SceneInterface;
};
