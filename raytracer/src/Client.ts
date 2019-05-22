import { createApolloFetch } from 'apollo-fetch';

const fetch = createApolloFetch({
  uri: 'http://127.0.0.1:3000/graphql',
});

const NEW_BLOCK_QUERY = `
query {
  newBlock {
    id
    x
    y
    size
    scene {
      config
    }
  }
}`;

const UPDATE_BLOCK_MUTATION = `
mutation updateBlock ($data: String!, $id: Int!) {
  updateBlock (data: $data, id: $id) {
    id
  }
}`;

export const getNewBlock = () => (
  fetch({ query: NEW_BLOCK_QUERY })
    .catch(err => console.error(err))
);

export const updateBlock = (variables: { data: string, id: number }) => (
  fetch({ variables, query: UPDATE_BLOCK_MUTATION })
    .catch(err => console.error(err))
);
