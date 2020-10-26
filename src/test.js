const Fastify = require('fastify');
const mercurius = require('mercurius');
const { getMesh } = require('@graphql-mesh/runtime');
const { findAndParseConfig } = require('@graphql-mesh/config');

const app = Fastify();

const startUp = async () => {
  const meshConfig = await findAndParseConfig();
  const { schema, contextBuilder } = await getMesh(meshConfig);
  app.register(mercurius, {
    schema,
    context: contextBuilder,
    graphiql: 'playground',
  });

  app.listen(4000).then(() => {
    console.log(`server listening on ${app.server.address().port}`);
  });
};

startUp();
