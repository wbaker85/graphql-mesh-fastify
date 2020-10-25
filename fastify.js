const Fastify = require('fastify');
const mercurius = require('mercurius');
const { getMesh } = require('@graphql-mesh/runtime');
const { findAndParseConfig } = require('@graphql-mesh/config');

const app = Fastify();

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
  },
};

let context = () => {};

const updateSchema = async () => {
  console.log('******');
  console.log('Updating schema....');
  const meshConfig = await findAndParseConfig();
  const { schema, contextBuilder } = await getMesh(meshConfig);
  context = contextBuilder;
  app.graphql.replaceSchema(schema);
  console.log('Schema updated!');
  console.log('******');
};

app.register(mercurius, {
  schema,
  resolvers,
  context,
  graphiql: 'playground',
});

app.listen(4000).then(() => {
  console.log(`server listening on ${app.server.address().port}`);
});

// updateSchema();
setInterval(updateSchema, 15000);
