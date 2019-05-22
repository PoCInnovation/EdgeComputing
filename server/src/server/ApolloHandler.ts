import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';

import { ContextInterface } from '../interfaces/Context';
import BlockResolver from '../resolvers/BlockResolver';
import SceneResolver from '../resolvers/SceneResolver';

const schema = buildSchemaSync({
  resolvers: [BlockResolver, SceneResolver],
  container: Container
});

export default (app: Application, context: ContextInterface) => {
  const server = new ApolloServer({
    schema,
    context: {
      ...context
    }
  });

  server.applyMiddleware({ app });
}
