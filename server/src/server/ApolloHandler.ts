import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';

import BlockResolver from '../resolvers/BlockResolver';
import SceneResolver from '../resolvers/SceneResolver';

const schema = buildSchemaSync({
  resolvers: [BlockResolver, SceneResolver],
  container: Container,
});

const server = new ApolloServer({ schema });

export default (app: Application) =>
  server.applyMiddleware({ app });
