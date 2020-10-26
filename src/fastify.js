const Fastify = require('fastify');
const mercurius = require('mercurius');
const { getMesh } = require('@graphql-mesh/runtime');
const { findAndParseConfig } = require('@graphql-mesh/config');

const { schema } = require('./config/schema');
const resolvers = require('./config/resolvers');

const app = Fastify();

// eslint-disable-next-line no-unused-vars
let contextGen = (request, reply) => {
  return {
    userId: 1234,
  };
};

const context = (request, reply) => {
  return contextGen(request, reply);
};

const updateSchema = async () => {
  console.log('Updating schema....');
  const meshConfig = await findAndParseConfig();
  const { schema, contextBuilder } = await getMesh(meshConfig);
  contextGen = await contextBuilder;
  app.graphql.replaceSchema(schema);
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
setInterval(updateSchema, 5000);
