import { SceneInterface } from '@edge-computing/interfaces';
import gql from 'graphql-tag';

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
  scene: SceneInterface;
};
