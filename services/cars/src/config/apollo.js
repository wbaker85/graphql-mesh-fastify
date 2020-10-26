import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

export default server;
